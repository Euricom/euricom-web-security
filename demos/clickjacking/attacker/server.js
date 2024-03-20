const express = require("express");
const path = require("path");
var cors = require("cors");
const port = 4000;

const app = express();

app.use(cors());

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(port, () => console.log(`Attacker server listening at http://localhost:${port}`));
