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

var shopInq = [{
  type: "list",
  message: "What would you like to do?",
  name: "isShopping",
  choices: [{name: "view the catalog to shop.", value: true}, {name: "Exit the program.", value: false}]
}];

function shopQuestion()
{
  inquirer.prompt(shopInq).then(function(answers) {
    if(answers.isShopping)
    {
      listProducts();
    }
    else
    {
      process.exit();
    }
  });
}

function listProducts()
{
  connection.query("SELECT * FROM products", [], function(err, res) {
    if(err) throw err;
    for(var i = 0; i < res.length; i++)
    {
      console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: $" + res[i].price + " | Available Stock: " + res[i].stock_quantity);
    }
    purchase();
  });
}

function purchase()
{
  var sale = {};
  console.log("What is the ID of the item you would like to purchase?");
  prompt.get(["ID"], function(err, res) {
    if(err) throw err;
    sale.id = res.ID;
    console.log("How many would you like to purchase?");
    prompt.get(["Quantity"], function(err, res) {
      sale.quantity = res.Quantity;
      quantityCheck(sale);
    });
  });
}

function quantityCheck(sale)
{
  connection.query("SELECT * FROM products WHERE item_id = ?", [sale.id], function(err, res) {
    if(err) throw err;
    if(res[0].stock_quantity >= sale.quantity)
    {
      sell(sale, res[0]);
    }
    else
    {
      console.log("Insufficient quantity!");
      listProducts();
    }
  });
}

function sell(sale, item)
{
  connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [(item.stock_quantity - sale.quantity), sale.id], function(err, res) {
    if(err) throw err;
    console.log("The total price of your order is $" + (sale.quantity * item.price) + ".");
    shopQuestion();
  });
}

shopQuestion();
