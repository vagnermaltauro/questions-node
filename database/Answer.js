const sequelize = require("sequelize");
const connection = require("./database");

// CREATE A TABLE "answer" IN DATABASE 
const answer = connection.define("answer", {
    bodyRes: {
        type: sequelize.TEXT,
        allowNull: false,
    },
    answerId: {
        type: sequelize.INTEGER,
        allowNull: false,
    }
});

// SYNCING WITH THE DATABASE
answer.sync({ force: false }).then(() => {
    console.log("Aswer Created!");
});

module.exports = answer;