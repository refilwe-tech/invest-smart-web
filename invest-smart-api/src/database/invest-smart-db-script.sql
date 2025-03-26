--Create postgres invest_smart_db database and connect to it, check if it exists first
DO $$
BEGIN
  IF NOT EXISTS(
    SELECT
      1
    FROM
      pg_database
    WHERE
      datname = 'invest_smart_db') THEN
  CREATE DATABASE invest_smart_db;
END IF;
END
$$;

------------------------------ CREATE TABLES --------------------------
DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users(
  user_id serial PRIMARY KEY,
  is_active boolean DEFAULT TRUE,
  user_role varchar(50) DEFAULT 'user',
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  phone_number DECIMAL(13) UNIQUE NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  username varchar(100) CHECK (LENGTH(username) >= 5 AND LENGTH(username) <= 100) UNIQUE NOT NULL,
  password varchar(16) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  gross_salary DECIMAL(10, 2) DEFAULT 0.00,
  net_salary DECIMAL(10, 2) DEFAULT 0.00
);

DROP TABLE IF EXISTS Investment CASCADE;

CREATE TABLE Investment(
  investment_id serial PRIMARY KEY,
  updated_by int,
  investment_name varchar(100) NOT NULL,
  status varchar(30) DEFAULT 'active',
  minimum_interest DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
  maximum_interest DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (updated_by) REFERENCES Users(user_id)
);

DROP TABLE IF EXISTS Counts CASCADE;

CREATE TABLE Counts(
  count_id serial PRIMARY KEY,
  total_users int NOT NULL,
  total_investments int NOT NULL
);

------------------------------ END OF CREATE TABLES ------------------------------
------------------------------ INSERT INTO TABLES ------------------------------
-- Insert into Users Table

ALTER TABLE Users
  ALTER COLUMN PASSWORD SET DEFAULT 'p@ssw0rd';

INSERT INTO Users(first_name, last_name, phone_number, email, username, user_role)
  VALUES ('Jane', 'Doe', '27790123456', 'jane@mail.com', 'jane@mail.com', 'user'),
('Alice', 'March', '27790123455', 'alice@mail.com', 'alice@mail.com', 'admin'),
('Mary', 'Owens', '27790123459', 'mary@mail.com', 'mary@mail.com', 'user'),
('Bob', 'Smith', '27790123457', 'bob@mail.com', 'bob@mail.com', 'admin'),
('John', 'Doe', '27790123458', 'john@mail.com', 'john@mail.com', 'user');

INSERT INTO Investment(investment_name, minimum_interest, maximum_interest)
  VALUES ('Bantu Savings', 1.50, 2.25),
('Growth Mutual Fund', 4.00, 8.50),
('Government Bonds', 2.75, 3.50),
('Real Estate Trust', 3.25, 6.75),
('Tech Stock Portfolio', 5.00, 15.00);

