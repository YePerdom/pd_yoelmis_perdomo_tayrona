import axios from "axios";
import { renderTable } from "../components/renders";
const API_URL = 'http://localhost:3000/api/v1'

export async function showClients() {
    try {
        const res = await axios.get(`${API_URL}/clients`);
        const clients = res.data;
        renderTable(clients);
    } catch (error) {
        console.error(error);
    };
};

export async function createClient(form) {
    const formData = new FormData(form);
    const clientData = Object.fromEntries(formData.entries());
    try {
        const res = await axios.post(`${API_URL}/clients`, clientData);
        res.data;
        form.reset();
    } catch (error) {
        console.error(error);
    };
};

export async function editClient(){
    try {
        const res = await axios.put(`${API_URL}/clients/${id}`, clientData);
        res.data;
    } catch (error) {
        
    }
};