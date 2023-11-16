/*CREATE TABLE carts (
  id INT PRIMARY KEY,
  total DECIMAL(10, 2),
  discountedTotal DECIMAL(10, 2),
  userId INT,
  totalProducts INT,
  totalQuantity INT
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  cartId INT,
  title VARCHAR(255),
  price DECIMAL(10, 2),
  quantity INT,
  total DECIMAL(10, 2),
  discountPercentage DECIMAL(5, 2),
  discountedPrice DECIMAL(10, 2),
  thumbnail VARCHAR(255)
);

*/
-- users table structured
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  email VARCHAR(255) UNIQUE
);