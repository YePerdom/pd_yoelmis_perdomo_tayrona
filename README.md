# Data normalization and CRUD + query system development

Financial information management that organizes and structures information in a **SQL** database, facilitating its loading, storage, and subsequent management using a **CRUD** system.
The backend is built with **Node.js** and **Express**, the database is managed with **MySQL**.

---

## Technologies used

- Node.js
- Express.js
- csv-parser (To load data from files CSV)
- dotenv
- MySQL

---

## Project structure

```bash
pd_yoelmis_perdomo_tayrona/
│
├── backend/ 
│  ├── config/
│  │  └── db.js 
│  ├── data/
│  │  ├── bills.csv
│  │  ├── clients.csv
│  │  └── transaction.csv
│  ├── seeds/
│  │  ├── loaderData.js
│  │  └── runSeeds.js
│  ├── services/
│  │  └── app.js
│  ├── .env
│  ├── main.js
│  └── package.json
├── docs/
│  ├── pd_yoelmis_perdomo_entity-relationship.jpg
│  ├── postman_colecction.json
│  └── script.sql
├── .gitignore
└── README.md
```

## Instalation

1. Clone the repository:

```bash
git clone https://github.com/YePerdom/pd_yoelmis_perdomo_tayrona
cd pd_yoelmis_perdomo_tayrona
```

2. Install dependencies:

```bash
cd backend
npm install
```

3. Create and configure the file .env:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=db_name
PORT=3000

```

4. Load seeds:

```bash
npm run seeds
```

5. Initialize the backend:

```bash
npm run start
```

## Database documentation

### Database name

`pd_yoelmis_perdomo_tayrona`

---

### Entity-relationship diagram

![Entity-relationship diagram](docs/pd_yoelmis_perdomo_entity-relationship.jpg "Entity-relationship diagram")

---

### Tables

#### **clients**

| Field                 | Data type        | constraints                         | Description                       |
| -----------------     | ---------------- | ----------------------------------- | --------------------------------- |
| id                    | INT              | NOT NULL AUTO_INCREMENT PRIMARY KEY | Unique identifier for the id      |
| client_name           | VARCHAR(255)     | NOT NULL                            | Contains the client name          |
| client_identification | VARCHAR(20)      | UNIQUE NOT NULL                     | Contains the client identification|
| address               | VARCHAR(250)     | NOT NULL                            | Contains the client  address      |
| phone_number          | VARCHAR(30)      | UNIQUE NOT NULL                     | Contains the client phone number  |
| email_address         | VARCHAR(255)     | UNIQUE NOT NULL                     | Contains the client email address |

---

#### **transactions**

| Field                 | Data type        | constraints                         | Description                                |
| -----------------     | ---------------- | ----------------------------------- | ------------------------------------------ |
| id                    | INT              | NOT NULL AUTO_INCREMENT PRIMARY KEY | Unique identifier for the id               |
| id_client             | INT              | FOREING KEY                         | References clientes.id                     |
| transaction_date_hour | TIMESTAMP        | NOT NULL                            | Contains the the transaction date and hour |
| transaction_amount    | INT              | NOT NULL                            | Contains the the transaction amount        |
| transaction_estatus   | VARCHAR(10)      | NOT NULL                            | Contains the the transaction status        |
| transacion_type       | VARCHAR(20)      | NOT NULL                            | Contains the the transaction status type   |

---

#### **bills**

| Field          | Data type   | constraints                        | Description                             |
| -------------  | ----------- | ---------------------------------- | --------------------------------------- |
| id             | INT         |NOT NULL AUTO_INCREMENT PRIMARY KEY | Unique identifier for the id            |
| id_client      | INT         |FOREING KEY                         | References clientes.id                  |
| billing_period | CHAR(7)     |NOT NULL                            | Contains the the billing period         |
| billing_amount | INT         |NOT NULL                            | Contains the the billing amount         |
| amount_paid    | INT         |NOT NULL                            | Contains the the billing amount paid    |
| payment_method | VARCHAR(10) |NOT NULL                            | Contains the the billing payment method |

---

#### Relationships

- **1 client  → N transaction**
- **1 client  → N bills**

---

## API  Endpoins Documentation

All API requests use the base URL: [`http://localhost:3000/api/v1`](http://localhost:3000/api/v1)

---

### **CRUD**  

#### **Get All Clients Data**

**URL:** GET [`/clients`](/clients)  
**Description:**  
returns a list of all clients and its personal information

**response 200 example:**

```json
{
    "id": 1,
    "client_name": "Angel Daniel",
    "client_identification": "149186547",
    "address": "USNS Davis\nFPO AP 78518",
    "phone_number": "(873)222-2692x09480",
    "email_address": "rmiller@boyer.com"
}
```

---

#### **Create a New Client**  

**URL:** POST [`/clients`](/clients)  
**Description:**  
Creates a new client  

**request body example:**

```json
{
    "client_name": "Angel Daniel",
    "client_identification": "149186547",
    "address": "USNS Davis\nFPO AP 78518",
    "phone_number": "(873)222-2692x09480",
    "email_address": "rmiller@boyer.com"
}
```

**response 200 example:**

```json
{
    "mensaje": "client created successfully",
    "id": 101
}
```

---

#### **Update some client data**  

**URL:** PUT [`/clients/:id`](/clients/:id)  
**Description:**  
update some client data  

**Path Paramenters:**

| Name | Type | Required | Description  |
| ---- | ---- | -------- | ------------ |
| id   | int  | yes      | id to update |

**request body example:**

```json
{
    "client_name": "Angel Daniel",
    "client_identification": "149154547",
    "address": "Calle 17 #55 - 46",
    "phone_number": "(87)222-2692x09480",
    "email_address": "rmiler@boyer.com"
}
```

**response 200 example:**

```json
{
    "mensaje": "client updated"
}
```

---

#### **Delete a client**  

**URL:** [`/clients/:id`](/clients/:id)  

**Path Paramenters:**

| Name | Type | Required | Description  |
| ---- | ---- | -------- | ------------ |
| id   | int  | yes      | id to delete |  

**response 200 example:**

```json
{
    "mensaje": "client deleted"
}
```

---

### **Specials endpoints**

#### **Get how much each client paid**

**URL:** GET [`/clients/paid`](/clients/paid)  
**Description:**  
returns a list of all clients and its how much has paid each client

**response 200 example:**

```json
{
    "client_name": "Angel Daniel",
    "client_identification": "149186547",
    "amount_paid": "0"
}
```

---

#### **Get transactions and bills information client**

**URL:** GET [`/api/v1/clients/transaction-information/:id`](/api/v1/clients/transaction-information/:id)  
**Description:**  
returns a client and its transactions and bills information

**Path Paramenters:**

| Name | Type | Required | Description  |
| ---- | ---- | -------- | ------------ |
| id   | int  | yes      | id to search |  

**response 200 example:**

```json
{
    "client_name": "Lindsay Garcia",
    "client_identification": "959234562",
    "billing_amount": 157001,
    "amount_paid": 156501,
    "transacion_type": "Pago de Factura",
    "transaction_estatus": "Completada"
}
```

---

#### **Get bills does not fully paid**

**URL:** GET [`/api/v1/bills/not-fully-paid`](/api/v1/bills/not-fully-paid)  
**Description:**  
returns all bills that has not yet been fully paid

**response 200 example:**

```json
{
    "client_name": "Angel Daniel",
    "client_identification": "149186547",
    "billing_amount": 39940,
    "amount_paid": 0,
    "pending_amount": "39940",
    "transacion_type": "Pago de Factura"
}
```

---

#### **Get transactions made from a specific platform (nequi, daviplata)**

**URL:** GET [`/api/v1/transactions/:plataform`](/api/v1/transactions/:plataform)  
**Description:**  
returns All transactions made from a specific platform

**response 200 example:**

```json
{
    "client_name": "Michael Holt",
    "client_identification": "969677194",
    "transaction_date_hour": "2024-06-28T11:00:00.000Z",
    "transaction_amount": 40302,
    "transaction_estatus": "Fallida",
    "transacion_type": "Pago de Factura"
}
```

---

### Endpoints available

| method | route                                       | Description                                                       |
| ------ | ------------------------------------------- | ----------------------------------------------------------------- |
| GET    | /api/v1/clients                             | Get All Clients Data                                              |
| POST   | /api/v1/clients                             | Create a New Client                                               |
| PUT    | /p/api/v1/clients/:id                       | Update some client data                                           |
| DELETE | /api/v1/clients/:id                         | Delete a client                                                   |
| GET    | /api/v1/clients/paid                        | Get how much each client has paid                                 |
| GET    | /api/v1/clients/transaction-information/:id | Get transactions and bills information client                     |
| GET    | /api/v1/bills/not-fully-paid                | Get bills does not fully paid                                     |
| GET    | /api/v1/transactions/:plataform             | Get transactions made from a specific platform (nequi, daviplata) |
