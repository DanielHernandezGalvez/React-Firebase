import React from "react";
import DataTable from "react-data-table-component";
import BitacoraHeader from "./BitacoraHeader";
import BitacoraDetail from "./BitacoraDetail";

export default function TableFloat() {
  return (
    <>
      <div className='ms-1 row'>
        <div className=" ">
        <BitacoraHeader />
        </div>
        <div className=" mb-3 col-5 col-md-5 col-sm-12">
        <table className='mx-auto table border'>
          <thead>
            <tr className="border-bottom">
              <th scope='col'>Detalle</th>
              <th scope='col'>Bita_ID</th>
              <th scope='col'>Tabla</th>
              <th scope='col'>Tabla_ID</th>
              <th scope='col'>Accion</th>
              <th scope='col'>Fecha</th>
              <th scope='col'>Usuario</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-bottom">
              <th scope='row'>1</th>
              <td>52345234</td>
              <td>adp_OrdenEncargada</td>
              <td>8505050</td>
              <td>Actualizado</td>
              <td>03/05/2023</td>
              <td>Mercedes Elizabeth</td>
            </tr>
            <tr className="border-bottom">
              <th scope='row'>2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr className="border-bottom">
              <th scope='row'>3</th>
              <td>Larry the Bird</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        </div>
        <BitacoraDetail />
      </div>
    </>
  );
}
