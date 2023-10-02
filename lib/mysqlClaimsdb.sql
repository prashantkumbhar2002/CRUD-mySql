
CREATE DATABASE classicmodels;

USE `classicmodels`;

DROP TABLE IF EXISTS `claims`;

CREATE TABLE claims (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bill_number VARCHAR(255) NOT NULL,
    customer_id INT NOT NULL,
    bill_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    payment_due_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL
);

show tables;

-- Inserting a sample claim record
INSERT INTO claims (bill_number, customer_id, bill_date, amount, status, payment_due_date, payment_method)
VALUES ('CLM12345', 101, '2023-09-13', 500.00, 'Pending', '2023-10-13', 'Credit Card');

INSERT INTO Claims (bill_number, customer_id, bill_date, amount, status, payment_due_date, payment_method)
VALUES ('CLM67890', 102, '2023-09-14', 750.50, 'Approved', '2023-10-14', 'Bank Transfer');

INSERT INTO Claims (bill_number, customer_id, bill_date, amount, status, payment_due_date, payment_method)
VALUES ('CLM54321', 103, '2023-09-15', 325.75, 'Rejected', '2023-10-15', 'Check');

INSERT INTO Claims (bill_number, customer_id, bill_date, amount, status, payment_due_date, payment_method)
VALUES ('CLM99999', 104, '2023-09-16', 1200.00, 'Pending', '2023-10-16', 'Credit Card');

INSERT INTO Claims (bill_number, customer_id, bill_date, amount, status, payment_due_date, payment_method)
VALUES ('CLM77777', 105, '2023-09-17', 800.25, 'Approved', '2023-10-17', 'Bank Transfer');


select * from Claims;