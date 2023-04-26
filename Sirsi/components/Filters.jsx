import React, { useState, useEffect } from "react";

export default function Filters() {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.46:8081/sirsi/administracion/BuscarSucursales")
      .then((response) => response.json())
      .then((data) => setSucursales(data.data))
      .catch(error => console.log("error", error))
  }, []);

  return (
    <div className='col-7 d-flex justify-content-around'>
      <input className='form-control me-5 w-75' type='date' />
      <select
        className='form-select rounded-start me-5'
        id='sucursal'
        placeholder='Sucursal'
        name='sucursalSelect'
      >
        <option value='sinFiltro'>No Filtrar</option>
        {sucursales.map(sucursal => (
            <option key={sucursal.SucuId} value={sucursal.SucuId}>{sucursal.SucuNombre}</option>
        ))}
      </select>{" "}
      <div className='input-group'>
        <span className='input-group-text btn btn-primary'>
          {" "}
          <i className='bi bi-search text-white'></i>
        </span>
        <input className='form-control w-50 me-5' type='text' />
      </div>
    </div>
  );
}
