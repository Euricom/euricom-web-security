const path = require("node:path");
const https = require("node:https");
const fs = require("node:fs");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");

let reviews = [];
const CSRF_TOKEN_COOKIE = "csrf-token";

const app = express();
app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    },
  }),
);
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("index01", {
    isValidSession: req.session.isValid,
    username: req.session.username,
    reviews,
  });
});

app.post("/reviews", function (req, res) {
  // validate session
  if (!req.session.isValid) {
    res.status(403).send("Forbidden");
    return;
  }

  // verify CSRF token
  const csrfToken = req.cookies[CSRF_TOKEN_COOKIE];
  if (csrfToken !== req.body.csrfToken) {
    res.status(403).send("Forbidden CSRF token invalid");
    return;
  }

  // add review
  if (req.body.newReview) {
    reviews.push(req.body.newReview);
  }
  res.redirect("/");
});

app.get("/user01", function (req, res) {
  const csrfToken = `${uuidv4()}`;
  res.setHeader("Set-Cookie", `${CSRF_TOKEN_COOKIE}=${csrfToken};secure`);
  res.render("user01", {
    username: req.session.username,
    email: req.session.email,
  });
});

app.post("/user", function (req, res) {
  req.session.isValid = true;
  req.session.username = req.body.username;
  req.session.email = req.body.email;
  res.redirect("/");
});

app.get("/logout", function (req, res) {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/");
});

// Read SSL certificate and key files
const key = fs.readFileSync(path.join(__dirname, "localhost-key.pem"));
const cert = fs.readFileSync(path.join(__dirname, "localhost.pem"));
https.createServer({ key, cert }, app).listen(8443, () => {
  console.log(`Server listening on https://goodwebsite.com:${8443}`);
});
