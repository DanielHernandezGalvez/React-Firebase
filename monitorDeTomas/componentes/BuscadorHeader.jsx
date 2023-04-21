import React, { useState, useEffect } from "react";
import FiltroImpresoras from "./FiltroImpresoras";

/* Toma dos props, handleFilter y handleSucursal, que son funciones que se 
ejecutarán cuando se cambie el texto del input y cuando se seleccione una 
sucursal en el select, respectivamente. */
const BuscadorHeader = ({ handleFilter, handleSucursal, hadleFetch }) => {
  const [sucursales, setSucursales] = useState([]);
  const [filtroData, setFiltroData] = useState(null)

  /* Utiliza el hook useEffect para realizar una petición GET a una API utilizando 
  la función fetch. La respuesta se convierte a un objeto JSON utilizando .json() y 
  luego se establece el valor del estado sucursales con los datos de la respuesta */
  useEffect(() => {
    fetch(`${process.env.RUTA_API}/sian2/ms/monitor/GetAllSucursales`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSucursales(data.data);
      })
      .catch((error) => console.log(error));

    if (
      !localStorage.getItem("desactivarimp") ||
      localStorage.getItem("desactivarimp") === "false"
    ) {
      localStorage.setItem("desactivarimp", false);
      document.getElementById("checkbx").checked = true;
    }
  }, []);

  /* Renderiza una sección de búsqueda que contiene un título, un input de 
  búsqueda y un select de sucursales. También incluye un botón que activa un 
  modal cuando se hace clic. El select de sucursales se rellena con opciones
  utilizando el estado sucursales */
  return (
    <>
      <div className='poster-imagen-buscador'>
        <div className='cajita'>
          <div
            id='princilal'
            className='container-fluid d-flex w-100 align-middle justify-content-between px-3 '
          >
            <div className='d-flex w-50' id='impresionesAuto'>
              {/* BUSCADOR */}
              <div class='form-check'>
                <input
                  id='checkbx'
                  class='form-check-input'
                  type='checkbox'
                  value=''
                  onChange={(e) => {
                    localStorage.setItem("desactivarimp", !e.target.checked);
                  }}
                />
                <label class='form-check-label' for='checkbx'>
                  Detener impresiones automáticas
                </label>
                <button
                  id='btn-filter-header'
                  className='btn btn-primary position-absolute btn-buscar-top p-1'
                  onClick={hadleFetch}
                >
                  Buscar
                </button>
              </div>
            </div>
            {/* SUCURSALES */}
            <div className='my-4 d-flex align-middle w-25'>
              <select
                className='form-select h-100 w-100'
                aria-label='Default select example'
                onChange={handleSucursal}
              >
                <option className='text-sm' value='null'>
                  Selecciona una sucursal
                </option>

                {sucursales.map((sucursal) => (
                  <option key={sucursal.SucuId} value={sucursal.SucuId}>
                    {sucursal.SucuNombre}
                  </option>
                ))}
              </select>
              <div className='ms-3 opacity-50'>
                <button
                  type='button'
                  className='btn btn-outline-secondary'
                  data-bs-toggle='modal'
                  data-bs-target='#setingsmodal'
                >
                  <i className='bi bi-gear-fill'></i>
                </button>
              </div>
              {/* MODAL */}

              {/* modal */}
              <FiltroImpresoras />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuscadorHeader;
