import { pool } from "../config/db.js";
import { loadBills, loadClients, loadTransactions } from "./loaderData.js";


(async () => {
    try {
        console.log('Opened connection')
        console.log('Loading seeds...');
        await loadClients();
        await loadTransactions();
        await loadBills();
        console.log('Seeds loaded successfully');
        return
    } catch (error) {
        console.error('Unable to load seeds, an error has occurred: ', error.message);
    } finally {
        await pool.end();
        console.log('connection closed correctly');
    }
})();