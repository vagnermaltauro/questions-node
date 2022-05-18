const sequelize = require("sequelize");

const connection = new sequelize("database", "admin", "password", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = connection;