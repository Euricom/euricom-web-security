const express = require("express");
const uuidv4 = require("uuid/v4");
const cookieParser = require("cookie-parser");
const nocache = require("nocache");

const app = express();

const SESSION_COOKIE = "session-id";
const CSRF_TOKEN_COOKIE = "csrf-token";

// Applying middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(nocache());

// Views
app.use(express.static("views"));

// Login Page Load
app.get("/", (req, res) => {
  const sessionID = req.cookies[SESSION_COOKIE];
  const cookieToken = req.cookies[CSRF_TOKEN_COOKIE];

  if (sessionID && cookieToken) {
    res.sendFile("views/form.html", { root: __dirname });
    return;
  }
  res.sendFile("views/login.html", { root: __dirname });
});

// Validate Credentials
app.post("/home", (req, res) => {
  const username = req.body.inputUsername;
  const password = req.body.inputPassword;

  const sessionID = req.cookies[SESSION_COOKIE];
  const cookieToken = req.cookies[CSRF_TOKEN_COOKIE];

  if (username === "root") {
    console.log("Home: Logged with valid credentials");

    // Generating Session ID and Token
    const sessionId = `sessionId:${uuidv4()}`;
    const csrfToken = `csrf:${uuidv4()}`;
    // const csrfToken = uuidv4();

    if (!sessionID && !cookieToken) {
      console.log(`Generated Session ID: ${sessionId}, CSRF Token: ${csrfToken}`);
      // Setting Cookie on Header
      // prettier-ignore
      res.setHeader("Set-Cookie", [
        `${SESSION_COOKIE}=${sessionId}`,
        `${CSRF_TOKEN_COOKIE}=${csrfToken}`
      ]);
    } else {
      console.log("POST /home Some Session ID and CSRF Token Found");
    }

    res.sendFile("views/form.html", { root: __dirname });
    return;
  }

  // const error = { status: 401, message: "Invalid Credentials" };
  res.sendFile("views/form-failed-login.html", { root: __dirname });
});

// Submit Form Data
app.post("/add-user", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const inputToken = req.body.csrfToken;
  const cookieToken = req.cookies["csrf-token"];

  // Checking if Cookie Token matches CSRF Token Submitted
  if (cookieToken && cookieToken === inputToken) {
    console.log("Post Content: Valid CSRF Tokens Received !");
    res.sendFile("views/form-success.html", { root: __dirname });
    return;
  }

  // CSRF Token Mismatch
  console.error("Post Content: No Valid CSRF Tokens Received ! !");
  res.sendFile("views/form-error.html", { root: __dirname });
});

// Signs out and clear the session ID with CSRF token
app.post("/logout", (req, res) => {
  const sessionID = req.cookies[SESSION_COOKIE];

  console.log(sessionID + ": Removed");

  res.clearCookie(SESSION_COOKIE);
  res.clearCookie(CSRF_TOKEN_COOKIE);

  res.sendFile("views/login.html", { root: __dirname });
});

// When user explicit load home page URL
app.get("/home", (req, res) => {
  const sessionID = req.cookies[SESSION_COOKIE];
  const cookieToken = req.cookies[CSRF_TOKEN_COOKIE];

  if (sessionID && cookieToken) {
    res.sendFile("views/form.html", { root: __dirname });
    return;
  }
  res.sendFile("views/login.html", { root: __dirname });
});

// When user explicit load logout page URL
app.get("/logout", (req, res) => {
  res.redirect("/");
});

// respond with "hello world" when a GET request is test route
app.get("/health", function (req, res) {
  res.send("Welcome to Double Submit Cookies Pattern Demo !");
});

// Server Startup
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${3010}`);
});
