const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");

const port = 3000;
const app = express();

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// app.use(
//   helmet({
//     // add CSP frame-ancestors to prevent clickjacking
//     // contentSecurityPolicy: {
//     //   directives: {
//     //     "img-src": ["'self'", "https://media.s-bol.com"],
//     //     "script-src": ["'self'"],
//     //     "frame-ancestors": ["'none'"],
//     //   },
//     // },
//     // superseded by CSP-frame-ancestors, but still supported by some browsers
//     // xFrameOptions: { action: "deny" },
//   }),
// );

app.use(express.static(path.join(__dirname, "./public")));
app.use(
  session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));

// add X-Frame-Options header to prevent clickjacking
// app.use(function (req, res, next) {
//   res.setHeader("X-Frame-Options", "sameorigin");
//   next();
// });

app.get("/", function (req, res) {
  res.render("index", {
    isValidSession: req.session.isValid,
    username: req.session.username,
  });
});

app.get("/session/new", function (req, res) {
  req.session.isValid = true;
  req.session.username = "Alice";
  req.session.email = "alice@acme.com";
  res.redirect("/");
});

app.post("/purchase", function (req, res) {
  if (req.session.isValid && req.body.dvdCode) {
    res.render("index", {
      isValidSession: req.session.isValid,
      username: req.session.username,
      purchaseMessage: "Your purchase has been charged to your credit card.",
    });

    console.log(`Purchase: ${req.body.dvdCode}`);
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => console.log(`The server is listening at http://localhost:${port}`));
