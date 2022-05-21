const sequelize = require("sequelize");

// CREATE DATABASE TYPE MYSQLs
const connection = new sequelize("database", "admin", "password", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = connection;