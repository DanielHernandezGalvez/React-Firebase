import React from "react";

export default function Tabla() {

    const response = require("../api/api.json")
    const data = response

  return (
    <>
      <div className="container-fluid">
        <table class='table border'>
          <thead>
            <tr >
              <th className="border" scope='col'>Orden de trabajo</th>
              <th className="border" scope='col'>Nombre del Paciente</th>
              <th className="border" scope='col'>Fecha</th>
              <th className="border" scope='col'>Fecha Esperada</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border" scope='row'>1</th>
              <td className="border">Mark</td>
              <td className="border">Otto</td>
              <td className="border">@mdo</td>
            </tr>
            <tr>
              <th className="border" scope='row'>2</th>
              <td className="border">Jacob</td>
              <td className="border">Thornton</td>
              <td className="border">@fat</td>
            </tr>
            <tr>
              <th className="border" scope='row'>3</th>
              <td className="border" >Larry the Bird</td>
              <td className="border">@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
