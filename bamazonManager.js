require("dotenv").config();
var password = process.env.password;
var prompt = require("prompt");
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
    database: "Bamazon"
  }
);

var managerInquiry = [{
  type: "list",
  name: "menu",
  message: "What would you like to do?",
  choices: [{name: "View products for sale", value: "view"}, {name: "View low inventory", value: "low"}, {name: "Add to inventory", value: "addI"}, {name: "Add new product", value: "addNP"}, {name: "Exit", value: "exit"},]
}];

function startMenuInquire()
{
  inquirer.prompt(managerInquiry).then(function(answers) {
    switch(answers.menu)
    {
      case "view":
        viewInventory();
        break;
      case "low":
        viewLowInventory();
        break;
      case "addI":
        addInventory();
        break;
      case "addNP":
        addNewProduct();
        break;
      case "exit":
        process.exit();
        break;
    }
  });
}

function viewInventory()
{
  connection.query("SELECT * FROM products", [], function(err, res) {
    if(err) throw err;
    for(var i = 0; i < res.length; i++)
    {
      console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: $" + res[i].price + " | Available Stock: " + res[i].stock_quantity);
    }
    startMenuInquire();
  });
}

function viewLowInventory()
{
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", [], function(err, res) {
    if(err) throw err;
    for(var i = 0; i < res.length; i++)
    {
      console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: $" + res[i].price + " | Available Stock: " + res[i].stock_quantity);
    }
    startMenuInquire();
  });
}

function addInventory()
{
  console.log("Please enter the item's ID and the quantity you wish to add to inventory.");
  prompt.get(["item_ID", "added_quantity"], function(err, data) {
    if(err) throw err;
    console.log(data);
    dbAddInventory(data.item_ID, data.added_quantity);
  });
}

function dbAddInventory(id, quantity)
{
  connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [id], function(err, res) {
    if(err) throw err;
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [(res[0].stock_quantity + parseInt(quantity)), id], function(err, res) {
      if(err) throw err;
      startMenuInquire();
    });
  });
}

function addNewProduct()
{
  console.log("Please enter the product name, product's department, price, and stock quantity for the new item.");
  prompt.get(["Name", "Department", "Price", "Quantity"], function(err, data) {
    if(err) throw err;
    dbAddNewProduct(data);
  });
}

function dbAddNewProduct(data)
{
  connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUE(?, ?, ?, ?)", [data.Name, data.Department, data.Price, data.Quantity], function(err, res) {
    if(err) throw err;
    startMenuInquire();
  });
}

startMenuInquire();
