const express = require("express");
const session = require("express-session");

const port = 3000;
const app = express();

let reviews = [];

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
      // sameSite: "none",
      // sameSite: "lax",
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

app.listen(port, () => console.log(`The server is listening at http://goodwebsite.com:${port}`));
