import { showClients } from "../services/clientes.js";

let listeningEvent = false;

export async function configDashboard() {
    try {
      await showClients()  
    } catch (error) {
        console.error(error);
    };
};