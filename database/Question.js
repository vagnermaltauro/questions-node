const sequelize = require("sequelize");
const connection = require("./database.js");

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

question.sync({ force: false }).then(() => {
    console.log("table created!");
});

module.exports = question;
