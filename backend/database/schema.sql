CREATE DATABASE IF NOT EXISTS food_ordering;
USE food_ordering;

CREATE TABLE IF NOT EXISTS foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    food_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    order_status VARCHAR(30) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (food_id) REFERENCES foods(id)
);

INSERT INTO foods (name, description, price, category, image_url)
SELECT 'Chicken Biryani', 'Spicy chicken biryani', 180.00, 'Biryani', ''
WHERE NOT EXISTS (SELECT 1 FROM foods WHERE name = 'Chicken Biryani');

INSERT INTO foods (name, description, price, category, image_url)
SELECT 'Veg Pizza', 'Classic vegetable pizza', 150.00, 'Pizza', ''
WHERE NOT EXISTS (SELECT 1 FROM foods WHERE name = 'Veg Pizza');

INSERT INTO foods (name, description, price, category, image_url)
SELECT 'Chicken Burger', 'Grilled chicken burger', 120.00, 'Burger', ''
WHERE NOT EXISTS (SELECT 1 FROM foods WHERE name = 'Chicken Burger');

INSERT INTO foods (name, description, price, category, image_url)
SELECT 'French Fries', 'Crispy potato fries', 80.00, 'Snacks', ''
WHERE NOT EXISTS (SELECT 1 FROM foods WHERE name = 'French Fries');

INSERT INTO foods (name, description, price, category, image_url)
SELECT 'Paneer Biryani', 'Flavourful paneer biryani', 160.00, 'Biryani', ''
WHERE NOT EXISTS (SELECT 1 FROM foods WHERE name = 'Paneer Biryani');
