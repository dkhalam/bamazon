var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  welcome();
});

var welcome = function (){
	inquirer.prompt(
	{
		name: "welcome",
		type: "list",
		message: "Welcome to Bamazon! Would you like to begin shopping?",
		choices: ["YES", "NO"]
	}).then(function(answer) {
		if (answer.welcome.toUpperCase() == "YES"){
			products();
		}
		else {
			console.log("Have a good day! See you next time at Bamazon!");
			return;
		}
	})
};

var products = function (){
connection.query('SELECT * FROM products', function(err, res) {
    for (var i = 0; i < res.length; i++) {
    	//diplay products offered
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    // asks the next question ater 8 seconds
    setTimeout(function() {idAsk();}, 8000);
})
};

var idAsk = function (){
	inquirer.prompt([
	{
		name: "itemid",
		type: "list",
		message: "Choose the ID of the product you want to add to your cart:",
		choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
	},	
	{
		name: "stock_quantity",
		type: "input",
		message: "How many units of this product would you like to puchase?",
		validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
	}]).then(function(answer) {
		console.log("-----------CHECK OUT------------------");
			checkQuantity(answer);
	})
};

var checkQuantity = function(answer) {
	console.log("Checking my stock");
	var query = 'SELECT stock_quantity, price FROM products WHERE item_id =?';
	var params = answer.itemid;

		connection.query(query, params, function(err, res) {
			if ( res[0].stock_quantity < answer.stock_quantity) {
				console.log("Insufficient quantity!");
				nextAsk(1);
			}
			else {
				// calculate the total by pulling the price and multiple by product wanted	
				var total = answer.stock_quantity * res[0].price;
				var newQuantity = res[0].stock_quantity-answer.stock_quantity;
				
				console.log("Total Cost: $" + total);

				connection.query("UPDATE `products` SET stock_quantity = (stock_quantity - ?) WHERE id = ?;", [answer.stock_quantity, answer.itemid], function(err, res){
					
						console.log("Your order today is: " + total);
					});
				
				}
		});

	
			setTimeout(function(){
				console.log("Thanks for shopping with us, we hope to see you again in the future!");
			},3000);
	
	
};
