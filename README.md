# Store-Inventory-with-CLI

## bamazonCustomer.js
Starts with a menu asking the customer if they would like to shop or exit.
Shopping will bring up the list of products, with all of their information displayed.
The customer is prompted to enter the item ID, and then the quantity they would like to purchase. the database is checked again to see that there are still enough in stock, and if there are, the purchase is made, otherwise it will list the products again. Once a purchase is made, the customer is returned to the starting prompt.
Exit exits the program using the process.exit function.

## bamazonManager.js
initial menu prompts:
* view the inventory
* view the low stock inventory
* add stock to an inventory item
* add a new product
* exit
Viewing the inventory will list all of the inventory items, with all of their information.
Viewing all low stick inventory does the same as above, but the query is filtered to only those items with less than 5 items in stock.
Adding stock prompts for an ID and quantity, and then performs two SQL queries, one to get the current quantity, and the second to update the quantity to the current count plus the incremented amount.
Adding a new item prompts for a name, department, price, and quantity, and then creates a new row in the database with those attributes. 

## Video
A link to a video run through of the functions can be found here: https://youtu.be/N7bTjti-1qA
