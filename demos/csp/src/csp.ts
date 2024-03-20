// add here your Content Security Policy
const csp = `
`;

export default removeComments(csp);

function escape(s: string) {
  let lookup: any = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;",
  };
  return s.replace(/[&"'<>]/g, (c) => lookup[c]);
}

function removeComments(str: string) {
  // Split the string into lines
  var lines = str.split("\n");

  // Filter out lines that start with '//'
  var filteredLines = lines.filter(function (line) {
    return !line.trim().startsWith("//");
  });

  // Join the remaining lines back into a string
  return filteredLines.join(" ");
}

/* 
  Content Security Policy
  https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

  default-src 
    'none';
  img-src 
    'self' 
    random-image-pepebigotes.vercel.app;
  script-src 
    'self' 
    ajax.googleapis.com;
  style-src 
    'self';
  report-uri /api/csp-report-uri;
  report-to csp-endpoint;
*/
