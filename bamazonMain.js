require("dotenv").config();
var password = process.env.password;
var prompt = require("prompt");
var mysql = require("mysql");

var connection = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
    database: "musicdb"
  }
);
