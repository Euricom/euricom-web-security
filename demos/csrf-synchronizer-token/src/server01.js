const path = require("node:path");
const https = require("node:https");
const fs = require("node:fs");
const express = require("express");
const session = require("express-session");
const csrf = require("csurf"); // Add CSRF token support

let reviews = [];

const app = express();
app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");
app.use(express.static("public"));
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
app.use(csrf()); // Add CSRF token support

app.get("/", function (req, res) {
  res.render("index01", {
    isValidSession: req.session.isValid,
    username: req.session.username,
    reviews,
    csrfToken: req.csrfToken(), // Add CSRF token support
  });
});

app.post("/reviews", function (req, res) {
  if (!req.session.isValid) {
    res.status(403).send("Forbidden");
    return;
  }

  if (req.body.newReview) reviews.push(req.body.newReview);

  res.redirect("/");
});

app.get("/user01", function (req, res) {
  res.render("user01", {
    username: req.session.username,
    email: req.session.email,
    csrfToken: req.csrfToken(),
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
