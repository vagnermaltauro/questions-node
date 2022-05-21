const sequelize = require("sequelize");
const connection = require("./database.js");

// CREATE A TABLE "question" IN DATABASE 
const question = connection.define("question", {
    title: {
        type: sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false,
    },
});

// SYNCING WITH THE DATABASE
question.sync({ force: false }).then(() => {
    console.log("table created!");
});

module.exports = question;
