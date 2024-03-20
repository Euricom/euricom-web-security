import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import express from "express";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read SSL certificate and key files
const sllOptions = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

const PORT = 3099;
const app = express();
app.use(express.static("public"));
app.use(express.json({ type: "*/*" }));

// Check out the index.html file to change parameters to the client requests
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Create HTTPS server
const server = https.createServer(sllOptions, app);

server.listen(PORT, () => {
  console.log(`Server listening on https://evilhacker.com:${PORT}`);
});
