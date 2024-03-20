const express = require("express");
const session = require("express-session");
const csrf = require("csurf"); // Add CSRF token support

const port = 3000;
const app = express();

let reviews = [];

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use(express.static("public"));
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

app.listen(port, () => console.log(`The server is listening at http://goodwebsite.com:${port}`));
