import "bootstrap/dist/css/bootstrap.min.css";
import { dashboard } from "./dashboard.js";
import { configDashboard } from "./app/dashboardConfig.js";

const routes = {
    "/": {
        renderView: dashboard,
        configView: configDashboard
    }
};

export function renderDasboard() {
    const path = "/";
    const route = routes[path];
    const main = document.getElementById("app");
    
    if (route) {
        main.innerHTML = route.renderView();
        if (route.configView) {
            route.configView();
        };
    };
};

document.addEventListener("DOMContentLoaded", ()=>{
    renderDasboard();
});

window.addEventListener("DOMContentLoaded", renderDasboard);