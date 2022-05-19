const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const connection = require("./database/database.js");
const importModel = require("./database/Question.js");

connection
    .authenticate()
    .then(() => {
        console.log("database connected");
    })
    .catch(() => {
        console.log("error connect database");
    })

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
    importModel.create({
        title: title,
        description: describe,
    }).then(() => {
        res.redirect("/")
    });
});

app.listen(port, () => {
    console.log("server run-time");
});

