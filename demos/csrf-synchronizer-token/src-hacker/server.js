const express = require("express");
var cors = require("cors");
const port = 3099;

const app = express();

app.use(cors());

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(port, () => console.log(`The attacker server is listening at http://evilhacker.com:${port}`));
