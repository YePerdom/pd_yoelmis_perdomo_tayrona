export function dashboard(){
    return `
    <div>
      <div class="text-center">
        <h1 class="display-1">GESTOR DE CLIENTES</h1>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <form id="clientes-form" class="row gy-2 gx-3 align-items-center mb-4">
          <div class="col-auto">
            <input class="form-control" type="text" name="client_name" id="client_name" placeholder="CLIENTE">
          </div>
          <div class="col-auto">
            <input class="form-control" type="text" name="client_identification" id="client_identification"
              placeholder="NÚMERO DE IDENTIFICACIÓN" onfocus="(this.type='number')" onblur="(this.type='text')">
          </div>
          <div class="col-auto">
            <input class="form-control" name="address" id="address" type="text"
              placeholder="DIRECCIÓN">
          </div>
          <div class="col-auto">
            <input class="form-control" name="phone_number" id="phone_number" type="text"
              placeholder="NÚMERO DE TELELFONO" onfocus="(this.type='number')" onblur="(this.type='text')">
          </div>
          <div class="col-auto">
            <input class="form-control" name="email_address" id="email_address" type="text"
              placeholder="CORREO ELECTRONICO">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary">CREAR CLIENTE</button>
          </div>
        </form>
      </div>

      <div class="d-flex justify-content-center align-items-center">
        <form id="searching-form" class="row gy-2 gx-3 align-items-center mb-4">
          <div class="col-auto">
            <input class="form-control" type="text" name="search" id="search" placeholder="BUSCAR">
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-success" type="submit">BUSCAR</button>
          </div>
        </form>
      </div>
    </div>

    <div>
      <table id="clients-table" class="table table-striped-columns table-hover">
        <thead class="table-dark">
          <tr>
            <th>CLIENTE</th>
            <th>IDENTIFICACIÓN</th>
            <th>DIRECCIÓN</th>
            <th>NÚMERO DE TELEFONO</th>
            <th>CORREO ELECTRONICO</th>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    `;
};