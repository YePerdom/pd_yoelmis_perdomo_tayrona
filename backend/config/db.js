import "dotenv/config";
import mysql from "mysql2/promise";


// this is the conection to the database, if you need chage the credentias, modify the file "backend/.env"
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});