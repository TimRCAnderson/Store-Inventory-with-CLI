CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
    stock_quantity INTEGER(6) NOT NULL DEFAULT 0,
    PRIMARY KEY(item_id)
);

INSERT INTO Bamazon.products(product_name, department_name, price, stock_quantity)
VALUE
	("ballpoint pen", "Office Supplies", 15.99, 30),
    ("paper (1000 sheets)", "Office Supplies", 7.99, 20),
    ("slinky red dress", "Women's Clothing", 65.00, 6),
    ("three-piece suit, charcoal", "Men's Clothing", 435.00, 4),
    ("AA batteries (pack of 20)", "Electronics", 8.99, 15),
    ("resistors (5000 assorted, 1 ohm - 100k ohm)", "Electronics", 17.99, 12),
    ("prototyping breadboard", "Electronics", 8.00, 14),
    ("stainless steel knife set (14 knives)", "Kitchen Wares", 184.99, 8),
    ("5 speed blender", "Kitchen Wares", 119.99, 5),
    ("72\" 4k television", "Electronics", 11999.99, 3)