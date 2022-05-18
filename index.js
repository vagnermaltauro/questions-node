const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/questions", (req, res) => {
    res.render("questions.ejs");
});

app.post("/savequestions", (req, res) => {
    let title = req.body.title;
    let describe = req.body.describe;
    res.send("received answer " + "title " + title + " description " + describe);
});

app.listen(port, () => {
    console.log("server run-time");
});

