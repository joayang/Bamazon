DROP DATABASE IF EXISTS bamazon_BD;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('iPhone X', 'Electronics', 2000, 3),
('MacBook', 'Electronics', 1200, 1),
('Chemitrybook', 'Office Supplies', 30, 80),
('Toshiba Color Printer Ink', 'Office Supplies', 70, 20),
('Steak Knives', 'Household', 20, 5),
('Flatware sets', 'Household', 150, 15), 
('Raincoat', 'Clothing', 50, 20),
("Shorts", "Clothing" , 25.00 , 200),
('Jacket', 'Clothing', 40, 45), 
('Dog Bed', 'Pets', 20, 50),
("Trampoline", "Outdoors" , 100.00 , 30),
('Collar and leash', 'Pets', 50, 45);