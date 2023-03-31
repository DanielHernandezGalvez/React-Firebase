import React, { useState, useEffect } from "react";

/* Toma dos props, handleFilter y handleSucursal, que son funciones que se 
ejecutarán cuando se cambie el texto del input y cuando se seleccione una 
sucursal en el select, respectivamente. */
const BuscadorHeader = ({ handleFilter, handleSucursal }) => {
  const [sucursales, setSucursales] = useState([]);

  /* Utiliza el hook useEffect para realizar una petición GET a una API utilizando 
  la función fetch. La respuesta se convierte a un objeto JSON utilizando .json() y 
  luego se establece el valor del estado sucursales con los datos de la respuesta */
  useEffect(() => {
    fetch("http://localhost:8081/sian2/ms/monitor/GetAllSucursales")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSucursales(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // const myInput = document.getElementsByClassName("filter-text")
  // myInput.placeholder = "Filtrar";

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
              <h6 className='me-2 mt-1'>Detener impresiones automáticas</h6>
              <div>
                <input
                  id='buscadorTabla'
                  type='checkbox'
                  // onChange={handleFilter}
                />
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
                  data-bs-target='#exampleModal'
                >
                  <i className='bi bi-gear-fill'></i>
                </button>
              </div>
              {/* MODAL */}
              <div
                className='modal fade'
                id='exampleModal'
                tabIndex='-1'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='exampleModalLabel'>
                        Título del modal
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body'>
                      Aquí va el contenido del modal, sepa la bola que vaya a
                      ser pero quedará mamalón
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Cerrar
                      </button>
                      <button type='button' className='btn btn-primary'>
                        Guardar cambios
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* modal */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuscadorHeader;




