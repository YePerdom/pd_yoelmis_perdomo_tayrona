export function renderTable(clients) {
    const tbody = document.getElementById("#clients-table tbody");
    tbody.innerHTML = "";

    clients.forEach(client => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${client.client_name}</td>
        <td>${client.client_identification}</td>
        <td>${client.address}</td>
        <td>${client.phone_number}</td>
        <td>${client.email_address}</td>
        <td>
        <div class="btn-group-vertical w-100" role="group" aria-label="Acciones">
        <button class="btn btn-warning btn-sm mb-2 edit" data-id=${client.id}>Editar</button>
        <button class="btn btn-sm btn-danger mb-2 delete" data-id=${client.id}>Eliminar</button>
        </div>
        </td>
        `;
        tbody.appendChild(row);
    });
};

export function renderTableEditable(client) {
    const tbody = document.getElementById("#clients-table tbody");
    tbody.innerHTML = "";

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${client.client_name}</td>
    <td>${client.client_identification}</td>
    <td contenteditable="true">${client.address}</td>
    <td contenteditable="true">${client.phone_number}</td>
    <td contenteditable="true">${client.email_address}</td>
    <td>
    <div class="btn-group-vertical w-100" role="group" aria-label="Acciones">
    <button class="btn btn-sm btn-success mb-2 save">Guardar</button>
    <button class="btn btn-sm btn-secondary mb-2 cancel">Cancelr</button>
    </div>
    </td>
    `;
    tbody.appendChild(row);
};