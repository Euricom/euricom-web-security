const path = require('node:path');
const crypto = require('node:crypto');
const express = require('express');
const helmet = require('helmet');
const { readFile } = require('node:fs/promises');
const argv = require('minimist')(process.argv.slice(2));

const { CspEvaluator } = require('csp_evaluator');
const { CspParser } = require('csp_evaluator/dist/parser');
const { expressCspHeader } = require('express-csp-header');
const csp = require('./csp.cjs');

/**
 * Usage
 *
 * Standard startup with security headers.
 * node scripts/server-csp-dev.cjs ./dist
 *
 * Options
 *   --log: log the csp header
 *   --pretty: format the csp header for better readability
 *   --reportOnly: set the csp header to report-only mode
 *   --evaluate: evaluate the csp header and log warnings
 */

const rootPath = path.join(process.cwd(), argv._[0]);

const app = express();

// serve all static files (except index.html)
app.use(express.static(rootPath, { index: false }));

//
// Report-To header, experimental, not working yet
//
app.use((req, res, next) => {
  // const groups = [
  //   {
  //     group: "csp-endpoint",
  //     max_age: 10_886_400,
  //     endpoints: [
  //       {
  //         url: "http://localhost:3000/report-csp2",
  //       },
  //     ],
  //   },
  // ];
  // const headerValue = groups.map((group) => JSON.stringify(group)).join(",");
  // res.setHeader("Report-To", headerValue);

  // // Reporting-Endpoints, experimental, not working yet
  // res.setHeader(
  //   "Reporting-Endpoints",
  //   `report-uri-csp="https://6a736322df9c3e34320d915b4e263ad3.report-uri.com/r/d/csp/enforce"`,
  // );
  next();
});

app.use(
  expressCspHeader({
    ...csp,
    reportOnly: argv.reportOnly,
    reportUri: '/report-csp',
  }),
);

//
// handle other security headers
//
app.use(
  // prettier-ignore
  helmet({
    referrerPolicy: {
      policy: "no-referrer",
    },
    strictTransportSecurity: {
      maxAge: 15552000,
      includeSubDomains: true,
    },
    xFrameOptions: {
      action: "sameorigin"    // required for oidc silent refresh
    },
    contentSecurityPolicy: false
  }),
);

// log the csp header
app.use((req, res, next) => {
  if (req.method !== 'GET' || !req.headers.accept.includes('text/html')) {
    return next();
  }

  const headers = res.getHeaders();
  const cspHeader = argv.reportOnly
    ? headers['content-security-policy-report-only']
    : headers['content-security-policy'];

  if (!cspHeader || !argv.log) {
    return next();
  }

  function formatCsp(csp, pretty) {
    const cspList = Object.keys(csp).map((key) => {
      return { key, value: csp[key] };
    });
    return (
      cspList
        // skip report-uri, because it's not supported by meta tags and
        // when used in production it should be a separate endpoint
        .filter((d) => d.key !== 'report-uri')
        .map((d) => {
          const sources = d.value.map((v) => `${v} `);
          return `${d.key} ${sources.join('')}`;
        })
        .join(pretty ? '\n' : '; ')
    );
  }

  const parsedCSP = new CspParser(cspHeader).csp;

  if (argv.evaluate) {
    const findings = new CspEvaluator(parsedCSP).evaluate();
    console.log(`=== CSP Warnings =========`);
    console.log(findings.filter((f) => f.severity < 100));
    console.log(`=====================`);
  }
  console.log(`--- Content Security Policy ----------`);
  console.log(formatCsp(parsedCSP.directives, argv.pretty));
  console.log('--------------------------------------');
  next();
});

//
// dump the csp report (for easy debugging)
//
app.post('/report-csp', express.json({ type: 'application/csp-report' }), (req, res) => {
  const report = req.body['csp-report'];
  // console.log(report);
  console.error(
    `CSP WARNING ${argv.reportOnly ? '(Report Only)' : ''}: '%s' blocked by '%s' in '%s' %s`,
    report['blocked-uri'],
    report['violated-directive'],
    report['document-uri'],
    !report['document-uri'].includes('http') ? `(${report['source-file']})` : '',
  );
  res.send('ok');
});

//
// add nonce to scripts to mark it as trusted source
//
app.get('*', async (req, res, next) => {
  if (!req.accepts('html')) {
    return next();
  }

  // add nonce to script & link tags
  const indexContent = await readFile(path.join(rootPath, 'index.html'), { encoding: 'utf8' });
  const indexWithNonce = indexContent
    .replace(/<script/g, (match) => {
      return match + ' nonce="' + req.nonce + '"';
    })
    .replace(/<link rel="stylesheet"/g, (match) => {
      return match + ' nonce="' + req.nonce + '"';
    });
  res.send(indexWithNonce);
  return;
});

//
// start the server
//
const port = argv.port ? +argv.port : 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
