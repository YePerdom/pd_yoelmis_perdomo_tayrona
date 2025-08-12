import fs from "fs"; //this module enables to read diferent format files.
import path, { resolve } from "path"; //this module enables to work with file routes.
import csv from "csv-parser";//this module enables analysis format files csv.
import { pool } from "../config/db.js";// this is the database connection

//with this function the format file csv from "data/clients.csv" will load to the database "pd_yoelmis_perdomo_tayrona" in the table "clients".
export async function loadClients() {
    const filePath = path.resolve("data/clients.csv");
    const clients = [];

    return new Promise((res, rej) => {
        fs.createReadStream(filePath).pipe(csv()).on("data", (client) => {
            clients.push([
                client.id,
                client.client_name,
                client.client_identification,
                client.address,
                client.phone_number,
                client.email_address,
            ]);
        }).on("end", async () => {
            try {
                const [results] = await pool.query("INSERT INTO clients (id, client_name, client_identification, address, phone_number, email_address) VALUE ?;", [clients]);
                console.log(`success: inserted ${results.affectedRows} new clients`);
                res();
            } catch (err) {
                console.error("error inserting clients", err.message);
                rej(err)
            };
        }).on("error", (err) => {
            console.error('error trying to read the file', err);
            rej(err);
        });
    });
};

//with this function the format file csv from "data/transactions.csv" will load to the database "pd_yoelmis_perdomo_tayrona" in the table "transactions".
export async function loadTransactions() {
    const filePath = path.resolve("data/transactions.csv");
    const transactions = [];

    return new Promise((res, rej) => {
        fs.createReadStream(filePath).pipe(csv()).on("data", (transaction) => {
            transactions.push([
                transaction.id,
                transaction.id_client,
                transaction.transaction_date_hour,
                transaction.transaction_amount,
                transaction.transaction_estatus,
                transaction.transacion_type,
            ]);
        }).on("end", async () => {
            try {
                const [results] = await pool.query("INSERT INTO transactions (id, id_client, transaction_date_hour,transaction_amount, transaction_estatus, transacion_type) VALUE ?;", [transactions]);
                console.log(`success: inserted ${results.affectedRows} new transactions`);
                res();
            } catch (err) {
                console.error("error inserting transactions", err.message);
                rej(err)
            };
        }).on("error", (err) => {
            console.error('error trying to read the file', err);
            rej(err);
        });
    });
};

//with this function the format file csv from "data/bills.csv" will load to the database "pd_yoelmis_perdomo_tayrona" in the table "bills".
export async function loadBills() {
    const filePath = path.resolve("data/bills.csv");
    const bills = [];

    return new Promise((res, rej) => {
        fs.createReadStream(filePath).pipe(csv()).on("data", (bill) => {
            bills.push([
                bill.id,
                bill.id_client,
                bill.billing_period,
                bill.billing_amount,
                bill.amount_paid,
                bill.payment_method
            ]);
        }).on("end", async () => {
            try {
                const [results] = await pool.query("INSERT INTO bills (id, id_client, billing_period,billing_amount, amount_paid, payment_method) VALUE ?;", [bills]);
                console.log(`success: inserted ${results.affectedRows} new bills`);
                res();
            } catch (err) {
                console.error("error inserting bills", err.message);
                rej(err)
            };
        }).on("error", (err) => {
            console.error('error trying to read the file', err);
            rej(err);
        });
    });
};