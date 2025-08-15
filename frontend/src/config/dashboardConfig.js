import { createClient, showClients } from "../services/clientes.js";

let listeningEvent = false;

const form = document.getElementById("client-form");
const table = document.getElementById("clients-table");
const search = document.getElementById("search-form");

export async function configDashboard() {
    try {
      await showClients();

      form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        console.log(await createClient(form));
      });
    } catch (error) {
        console.error(error);
    };
};

document.addEventListener("DOMContentLoaded", ()=>{
    configDashboard();
});
