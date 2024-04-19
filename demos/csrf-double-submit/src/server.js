const path = require("node:path");
const https = require("node:https");
const fs = require("node:fs");
const express = require("express");
const session = require("express-session");

let reviews = [];

const app = express();
app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      // sameSite: "lax",
      secure: true,
    },
  }),
);
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("index", {
    isValidSession: req.session.isValid,
    username: req.session.username,
    reviews,
  });
});

app.post("/reviews", function (req, res) {
  if (!req.session.isValid) {
    res.status(403).send("Forbidden");
    return;
  }

  if (req.body.newReview) {
    reviews.push(req.body.newReview);
  }

  res.redirect("/");
});

app.get("/user", function (req, res) {
  // if (req.session.isValid) {
  res.render("user", {
    username: req.session.username,
    email: req.session.email,
  });
});

app.post("/user", function (req, res) {
  // if (req.session.isValid) {
  req.session.isValid = true;
  req.session.username = req.body.username;
  req.session.email = req.body.email;
  res.redirect("/");
});

app.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

app.use((req, res) => {
  res.redirect("/");
});

// Read SSL certificate and key files
const key = fs.readFileSync(path.join(__dirname, "localhost-key.pem"));
const cert = fs.readFileSync(path.join(__dirname, "localhost.pem"));
https.createServer({ key, cert }, app).listen(8443, () => {
  console.log(`Server listening on https://goodwebsite.com:${8443}`);
});
