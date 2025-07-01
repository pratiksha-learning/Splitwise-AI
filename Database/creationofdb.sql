CREATE DATABASE IF NOT EXISTS splitwithai;
USE splitwithai;

CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    amount DECIMAL(10, 2),
    paid_by VARCHAR(255),
    split_with TEXT
);

CREATE USER IF NOT EXISTS 'splituser'@'localhost' IDENTIFIED BY 'test123';
GRANT ALL PRIVILEGES ON splitwithai.* TO 'splituser'@'localhost';
FLUSH PRIVILEGES;


USE splitwithai;

INSERT INTO expenses (title, amount, paid_by, split_with, source) VALUES
('Lunch at Café', 500.00, 'Pratiksha', 'Harsh,Prachi', 'manual'),
('Groceries Shopping', 1200.50, 'Prachi', 'Pratiksha,Harsh', 'ai'),
('Uber Ride', 320.00, 'Harsh', 'Pratiksha,Prachi', 'manual'),
('Movie Tickets', 900.00, 'Pratiksha', 'Harsh', 'ai'),
('Dinner Party', 1800.00, 'Prachi', 'Harsh,Pratiksha', 'manual');

ALTER TABLE expenses
MODIFY COLUMN source VARCHAR(50) DEFAULT '';

select * from expenses;

TRUNCATE TABLE expenses;