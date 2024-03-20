import express from "express";
import cors from "cors";
import csp from "./csp";
import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const app = express();

// add Content Security Policy header
app.use((req, res, next) => {
  if (req.accepts("html")) {
    // res.setHeader("content-security-policy", csp);
    res.setHeader("content-security-policy-report-only", csp);
    res.setHeader("reporting-endpoints", 'csp-endpoint="https://goodwebsite.com:3000/api/csp-report-v2"');
  }
  next();
});

// Read SSL certificate and key files
const sllOptions = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

app.use(express.static(`${__dirname}/public`));
app.use(cors({ origin: "https://goodwebsite.com" }));

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.post("/api/csp-report-v2", express.json({ type: "application/reports+json" }), (req, res) => {
  console.log("CSP-Report-v2: ", req.body);
  res.status(200).send("ok");
});

app.post("/api/csp-report-uri", express.json({ type: "application/csp-report" }), (req, res) => {
  console.log("CSP-Report: ", req.body);
  res.status(200).send("ok");
});

app.use((req, res) => {
  console.log("Not found: ", req.url, req.method, req.headers);
  res.status(404).send("Not found");
});

/**
 * Create https server
 */
const PORT = 3000;
const server = https.createServer(sllOptions, app);
server.listen(PORT, () => {
  console.log(`Server listening on https://goodwebsite.com:${PORT}`);
});
