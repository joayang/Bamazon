var mysql = require("mysql"),
    inquirer = require("inquirer");
// create the connection to the sql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});
// connects to the sql server
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    start();
});

// starts the app and asks the user if they would like to browse the store
function start() {
	console.log("\nWELCOME TO THE BAMAZON STORE!\n");
	inquirer.prompt(
		{
			name: "browse",
			type: "confirm",
			message: "Would you like to browse the available products?"
		}
	).then(function(answer) {
		if (answer.browse) {
			displayProducts();
		} else {
            console.log("Come back soon, have a nice day!")
			connection.end();
		}
    });
    
}

// display the product ID
function displayProducts() {
    // display product ID, name and price
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + "\nName: " + res[i].product_name +
                "\nPrice:  $" + res[i].price + "\n");
        }
        enterToShop();
    });
}

// enter to shop 
function enterToShop() {
    inquirer.prompt([{
            type: "input",
            name: "item_id",
            message: "Please enter the product ID you wish to purchase",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "Please enter the quantity to purchase",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function(answers) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: answers.item_id }, function(err, res) {
            if (err) throw err;
            var item_id = res[0].item_id;
            var newQuant = res[0].stock_quantity - answers.quantity,
                totalPrice = res[0].price * answers.quantity;
                // check if purchase quantity is greater than stock quantity
            if (res[0].stock_quantity < answers.quantity) {
                console.log("Sorry, Out of Stock! Please shop next time");
                connection.end();
            } else {
                // update product
                connection.query('UPDATE products SET ? WHERE id = ?', [{ stock_quantity: newQuant }, item_id],
                    function(err, res) {
                        // display the grand total of purchase
                        console.log("Your purchase completely process! Total cost: $" + totalPrice);
                        inquirer.prompt([{
                            name: "confirm",
                            type: "confirm",
                            message: "Would you like to make another purchase?"
                        }]).then(function(answers) {
                            if (answers.confirm === true) {
                                displayProducts();
                            } else {
                                // customer done shopping 
                                console.log("Thank you for shopping, have a nice day!")
                                connection.end();
                            }
                        })

                    });
            }
        });
    })
}
