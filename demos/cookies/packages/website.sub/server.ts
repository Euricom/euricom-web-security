import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import express from "express";
import cookieParser from "cookie-parser";

import { fileURLToPath } from "url";

declare module "express-session" {
  interface SessionData {
    user: string;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read SSL certificate and key files
const key = fs.readFileSync(path.join(__dirname, "localhost-key.pem"));
const cert = fs.readFileSync(path.join(__dirname, "localhost.pem"));

const app = express();
app.use(cookieParser());
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  console.log("Cookies from browser:", req.cookies);
  res.render("index");
});

// rest of static files
app.use(express.static(path.join(__dirname, "public")));

// Listen on https (8444)
https.createServer({ key, cert }, app).listen(8444, () => {
  console.log(`Server listening on https://app.goodwebsite.com:${8444}`);
});
