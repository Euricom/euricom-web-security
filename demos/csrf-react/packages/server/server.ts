import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import express from "express";
import cors from "cors";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    loggedIn: boolean;
    userName: string;
    password: string;
  }
}

export type Review = {
  id: number;
  text: string;
  userName: string;
};

// Read SSL certificate and key files
const sllOptions = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

const csrfHeaderEnforce = (req: any, res: any, next: any) => {
  if (!req.headers["x-csrf"]) {
    return res.status(403).json({ error: "cors validation error" });
  }
  next();
};

const app = express();

// app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.static(`${__dirname}/../client/dist`));
app.use("/app", express.static(`${__dirname}/../hacker`));
app.use(express.urlencoded());
app.use(express.json({ type: "*/*" }));
// app.use(express.json());
// app.use(cors({ credentials: true }));
// app.use(csrfHeaderEnforce);

app.use(
  session({
    secret: "Super Secret",
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 3600 * 24, // 1day
      sameSite: "none", // none | lax | strict
    },
  }),
);

/**
 * Reviews
 */

let reviews: Review[] = [];

app.get("/api/reviews", (req, res) => {
  console.log("[reviews] - GET", reviews);
  return res.json(reviews);
});

app.post("/api/reviews", (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { text } = req.body;
  console.log("[reviews] - POST", req.body);
  const newId = reviews.reduce((acc, review) => (review.id > acc ? review.id : acc), 0) + 1;
  reviews.push({ id: newId, text, userName: req.session.userName || "" });
  res.json(reviews);
});

app.post("/api/reviews/clear", (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { text } = req.body;
  console.log("[reviews] - DELETE");
  reviews = [];
  res.json(reviews);
});

/**
 * Authentication & Session
 */
app.post("/api/auth/login", (req, res) => {
  const { userName, password } = req.body;
  console.log("[auth] - Logging in...", { userName });
  req.session.loggedIn = true;
  req.session.userName = userName;
  req.session.password = password;
  res.json({ authenticated: true, userName });
});

app.post("/api/auth/logout", (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  console.log("[auth] - Logout");
  req.session.destroy((err) => {});
  res.json({ authenticated: false });
});

app.get("/api/auth/session", (req, res) => {
  if (req.session.loggedIn) {
    res.json({ authenticated: true, userName: req.session.userName });
    return;
  }
  res.json({ authenticated: false });
});

/**
 * Create https server
 */
const PORT = 3005;
const server = https.createServer(sllOptions, app);
server.listen(PORT, () => {
  console.log(`Server listening on https://goodwebsite.com:${PORT}`);
});
