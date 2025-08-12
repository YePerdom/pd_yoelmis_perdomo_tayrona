/*Creation of database 'pd_yoelmis_perdomo_tayrona'*/
DROP DATABASE If EXISTS pd_yoelmis_perdomo_tayrona;
CREATE DATABASE pd_yoelmis_perdomo_tayrona;
USE pd_yoelmis_perdomo_tayrona;

/*Creation of tables on database 'pd_yoelmis_perdomo_tayrona'*/
/*Creation of table 'clients'*/
DROP TABLE IF EXISTS clients;
CREATE TABLE clients(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
client_name VARCHAR(255) NOT NULL,
client_identification VARCHAR(20) UNIQUE NOT NULL,
address VARCHAR(250) NOT NULL,
phone_number VARCHAR(30) UNIQUE NOT NULL,
email_address VARCHAR(255) UNIQUE NOT NULL
);

/*Creation of table 'transactions'*/
DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(
id CHAR(6) PRIMARY KEY UNIQUE NOT NULL,
id_client INT,
transaction_date_hour TIMESTAMP NOT NULL,
transaction_amount INT NOT NULL,
transaction_estatus VARCHAR(10) NOT NULL,
transacion_type VARCHAR(20) NOT NULL,

FOREIGN KEY (id_client) REFERENCES clients(id) ON DELETE SET NULL ON UPDATE CASCADE
);

/*Creation of table 'bills'*/
DROP TABLE IF EXISTS bills;
CREATE TABLE bills(
id CHAR(7) PRIMARY KEY UNIQUE NOT NULL,
id_client INT,
billing_period CHAR(7) NOT NULL,
billing_amount INT NOT NULL,
amount_paid INT NOT NULL,
payment_method VARCHAR(10) NOT NULL,

FOREIGN KEY (id_client) REFERENCES clients(id) ON DELETE SET NULL ON UPDATE CASCADE
);