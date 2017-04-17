CREATE DATABASE `bamazon_db`;

USE `bamazon_db`;

CREATE TABLE `products` (
	`item_id` INT NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(100) NOT NULL,
    `department_name` VARCHAR(100) NOT NULL,
    `price` DECIMAL(12,2) NULL,
    `stock_quantity` INT(10),
    PRIMARY KEY (`item_id`)
);

SELECT * FROM `products`;

INSERT INTO `products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES (1, "Air Force Ones", "Shoes", 250.99, 20),
(2, "Pizza", "Food", 5.99, 100),
(3, "Basketball", "Sports", 25.00, 30),
(4, "Wallet", "Accessories", 49.99, 70),
(5, "Coffee", "Drinks", 3.87, 150),
(6, "Sunglasses", "Accessories", 15.90, 200),
(7, "Popcorn", "Food", 1.99, 400),
(8, "Pen", "School Supplies", 1.50, 250),
(9, "Cargo Shorts", "Clothing", 19.99, 90),
(10, "Laptop", "Electronics", 400.00, 3)
