import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

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
app.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, domain: "goodwebsite.com" },
  }),
);

app.get("/login", function (req, res) {
  req.session.user = "peter";
  res.redirect("/");
});

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.clearCookie("connect.sid");
  res.redirect("/");
});

app.use("/", function (req, res) {
  console.log("Cookies from browser:", req.cookies);
  res.cookie("serverCookie", "12345");
  // res.cookie("serverCookie", "12345", { secure: true });
  // res.cookie("serverCookie", "12345", { domain: "goodwebsite.com" });
  // res.cookie("serverCookie", "1", { maxAge: 3600, httpOnly: false, secure: true });
  res.render("index", {
    userName: req.session.user,
  });
});

// rest of static files
app.use(express.static(path.join(__dirname, "public")));

// Listen on http (8080) & https (8443)
app.listen(8080, () => {
  console.log(`Server listening on http://goodwebsite.com:${8080}`);
});
https.createServer({ key, cert }, app).listen(8443, () => {
  console.log(`Server listening on https://goodwebsite.com:${8443}`);
});
