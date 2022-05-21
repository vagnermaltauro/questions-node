const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const connection = require("./database/database.js");
const importModel = require("./database/Question.js");
const answerDB = require("./database/Answer.js");

// CHECKING CONNECTION WITH DATABASE
connection
    .authenticate()
    .then(() => {
        console.log("database connected");
    })
    .catch(() => {
        console.log("error connect database");
    })

// APP
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// PAGES
app.get("/", (req, res) => {
    importModel.findAll({ raw: true, order: [["id", "desc"]] }).then(answer => {
        res.render("index.ejs", {
            receiveAnswer: answer,
        });
    });
});

app.get("/questions", (req, res) => {
    res.render("questions.ejs");
});


// SAVE QUESTIONS IN DATABASE
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

// VIEWING A QUESTION
app.get("/questions/:id", (req, res) => {
    let id = req.params.id;
    importModel.findOne({
        where: { id: id }
    }).then(retorned => {
        if (retorned != undefined) {
            answerDB.findAll({
                where: { answerId: retorned.id },
                order: [["id", "desc"]],
            }).then(returnAnswer => {
                res.render("page-question.ejs", {
                    sendInfo: retorned,
                    returnAnswer: returnAnswer,
                });
            });
        } else {
            res.redirect("/");
        }
    });
});

// GETTING ANSWERS TO QUESTIONS
app.post("/answ", (req, res) => {
    let bodyAnswer = req.body.bodyAnswer;
    let answerId = req.body.idAnswer;
    answerDB.create({
        bodyRes: bodyAnswer,
        answerId: answerId,
    }).then(() => {
        res.redirect("/questions/" + answerId);
    });
});

// PORT
app.listen(port, () => {
    console.log("server run-time");
});

