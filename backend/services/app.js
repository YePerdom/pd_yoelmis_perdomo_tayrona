import express from "express";
import cors from "cors";
import { pool } from "../config/db.js";


const app = express();

// These are CORS intermediate programs that allow you to receive data from an external URL and Express programs that transform the data into JSON format.
app.use(cors());
app.use(express.json());

// These are the endpoints available to use
//*************CRUD****************** */

//1. get al clients data 
app.get("/api/v1/clients", async (req, res) => {
    try {
        const [clients] = await pool.query("SELECT * FROM clients;");
        if (clients.length === 0) {
            return res.status(200).json({
                mensaje: "there are not clients to show"
            });
        }
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    };
});

//2. get a client, its transactions and bills information.
app.get("/api/v1/clients/transaction-information/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [client] = await pool.query("SELECT c.client_name, c.client_identification, b.billing_amount, b.amount_paid, t.transacion_type, t.transaction_estatus FROM clients c LEFT JOIN bills b ON c.id = b.id_client LEFT JOIN transactions t ON c.id = t.id_client WHERE c.id = ?;", [id]);
        if (client.length === 0) {
            return res.status(200).json({
                mensaje: "client not found"
            });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    };
});

//3. create a new client;
app.post("/api/v1/clients", async (req, res) => {
    const { client_name, client_identification, address, phone_number, email_address } = req.body;
    try {
        if (!client_name || !client_identification || !address || !phone_number || !email_address) {
            return res.status(400).json({
                status: "error",
                mensaje: "All fields are required",
                endpoint: req.originalUrl,
                method: req.method
            })
        };
        const [client] = await pool.query("INSERT INTO clients (client_name, client_identification, address, phone_number, email_address) VALUES (?,?,?,?,?);", [client_name, client_identification, address, phone_number, email_address]);
        res.status(201).json({
            mensaje: "client created successfully",
            id: client.insertId
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    };
});

//4. Update some user data
app.put("/api/v1/clients/:id", async (req, res) => {
    const { id } = req.params;
    const { client_name, client_identification, address, phone_number, email_address } = req.body;
    try {
        if (!client_name || !client_identification || !address || !phone_number || !email_address) {
            return res.status(400).json({
                status: "error",
                mensaje: "All fields are required",
                endpoint: req.originalUrl,
                method: req.method
            });
        };
        const [client] = await pool.query('UPDATE clients SET client_name = ?, client_identification = ?, address = ?, phone_number = ?, email_address = ? WHERE id = ?;', [client_name, client_identification, address, phone_number, email_address, id]);
        if (client.affectedRows === 0) {
            res.status(202).json({ mensaje: 'client not found' });
        }
        res.status(202).json({ mensaje: 'client updated' });
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    }
});

//5. Delete a client
app.delete("/api/v1/clients/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [client] = await pool.query('DELETE FROM clients WHERE id = ?;', [id]);
        if (client.affectedRows === 0) {
            res.status(200).json({
                mensaje: "client not found"
            });
        }
        res.status(200).json({ mensaje: 'client deleted' });
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    }
});

/********* specials endpoints*/
//1. how much each client has paid in total
app.get("/api/v1/clients/paid", async (req, res) => {
    try {
        const [clients] = await pool.query("SELECT c.client_name, c.client_identification, SUM(b.amount_paid) amount_paid FROM clients c LEFT JOIN bills b ON c.id = b.id_client GROUP BY c.client_name, c.client_identification;");
        if (clients.length === 0) {
            return res.status(200).json({
                mensaje: "there are not clients to show"
            });
        }
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    };
});

// 2. bills that have not yet been fully paid
app.get("/api/v1/bills/not-fully-paid", async (req, res) => {
    try {
        const [clients] = await pool.query("SELECT c.client_name, c.client_identification, b.billing_amount, b.amount_paid, SUM(b.billing_amount - b.amount_paid) pending_amount, t.transacion_type FROM clients c JOIN bills b ON c.id = b.id_client JOIN transactions t ON c.id = t.id_client GROUP BY c.client_name, c.client_identification, b.billing_amount, b.amount_paid, t.transacion_type HAVING pending_amount > 0;");
        if (clients.length === 0) {
            return res.status(200).json({
                mensaje: "there are not clients to show"
            });
        }
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    };
});

//3. All transactions made from a specific platform
app.get("/api/v1/transactions/:plataform", async (req, res) => {
    const { plataform } = req.params
    try {
        const [clients] = await pool.query("SELECT c.client_name, c.client_identification, t.transaction_date_hour, t.transaction_amount, transaction_estatus, t.transacion_type FROM clients c JOIN transactions t ON c.id = t.id_client JOIN bills b ON c.id = b.id_client WHERE b.payment_method = ?;", [plataform]);
        if (clients.length === 0) {
            return res.status(200).json({
                mensaje: "there are not clients to show"
            });
        }
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            error: error.message
        });
    };
});

export default app;