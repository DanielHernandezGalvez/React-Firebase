import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import DataTable from "react-data-table-component";
// import BitacoraHeader from "./BitacoraHeader";
import BitacoraDetail from "./BitacoraDetail";

export default function TableFloatBitacora({ clickID, oderId, handleClickId }) {
  const [checkTabla, setCheckTabla] = useState("");
  const [data, setData] = useState([]);

  const handleBotonClick = (e) => {
    setCheckTabla(e.target.value);
  };

  useEffect(() => {
    // document.addEventListener("DOMContentLoaded", function () {
    //   const bsOffcanvas = new bootstrap.Offcanvas("#offcanvasBottom");
    // });
    const url = `${process.env.RUTA_API}/sirsi/web/BuscarBitacoraDatos?id=${oderId}&pacid=${clickID}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) =>
        console.log(
          error,
          "⣿⣿⣿⠟⢹⣶⣶⣝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⡟⢰⡌⠿⢿⣿⡾⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⢸⣿⣤⣒⣶⣾⣳⡻⣿⣿⣿⣿⡿⢛⣯⣭⣭⣭⣽⣻⣿⣿⣿ ⣿⣿⣿⢸⣿⣿⣿⣿⢿⡇⣶⡽⣿⠟⣡⣶⣾⣯⣭⣽⣟⡻⣿⣷⡽⣿ ⣿⣿⣿⠸⣿⣿⣿⣿⢇⠃⣟⣷⠃⢸⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽ ⣿⣿⣿⣇⢻⣿⣿⣯⣕⠧⢿⢿⣇⢯⣝⣒⣛⣯⣭⣛⣛⣣⣿⣿⣿⡇ ⣿⣿⣿⣿⣌⢿⣿⣿⣿⣿⡘⣞⣿⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇ ⣿⣿⣿⣿⣿⣦⠻⠿⣿⣿⣷⠈⢞⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇ ⣿⣿⣿⣿⣿⣿⣗⠄⢿⣿⣿⡆⡈⣽⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢻ ⣿⣿⣿⣿⡿⣻⣽⣿⣆⠹⣿⡇⠁⣿⡼⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣾ ⣿⠿⣛⣽⣾⣿⣿⠿⠋⠄⢻⣷⣾⣿⣧⠟⣡⣾⣿⣿⣿⣿⣿⣿⡇⣿ ⢼⡟⢿⣿⡿⠋⠁⣀⡀⠄⠘⠊⣨⣽⠁⠰⣿⣿⣿⣿⣿⣿⣿⡍⠗⣿ ⡼⣿⠄⠄⠄⠄⣼⣿⡗⢠⣶⣿⣿⡇⠄⠄⣿⣿⣿⣿⣿⣿⣿⣇⢠⣿"
        )
      );
  }, []);

  return (
    <>
      <div className='offcanvas-header'>
        <h5 className='offcanvas-title' id='offcanvasBottomLabel'>
          {oderId}
        </h5>
        <button
          type='button'
          className='btn-close'
          data-bs-dismiss='offcanvas'
          aria-label='Close'
        ></button>
      </div>
      <div className=''>
        <div className='ms-1 row'>
          <div></div>
          <div className=' mb-3 col-12 col-xxl-5 col-xl-12 col-sm-12 table-responsive'>
            {/* /////////// */}

            <div
              className='btn-group col-5 pe-3'
              role='group'
              aria-label='Basic radio toggle button group'
            >
              <input
                type='radio'
                className='btn-check bitacora-checked'
                name='btnradio'
                id='btnradio1'
                autocomplete='off'
                value={"1"}
                onClick={handleBotonClick}
              />
              <label className='btn btn-outline-secondary' htmlFor='btnradio1'>
                Encabezado
              </label>

              <input
                type='radio'
                className='btn-check bitacora-checked'
                name='btnradio'
                id='btnradio2'
                autocomplete='off'
                value={"2"}
              />
              <label className='btn btn-outline-secondary' htmlFor='btnradio2'>
                Detalle
              </label>

              <input
                type='radio'
                className='btn-check bitacora-checked'
                name='btnradio'
                id='btnradio3'
                autocomplete='off'
                value={"3"}
              />
              <label className='btn btn-outline-secondary' htmlFor='btnradio3'>
                Pagos
              </label>

              <input
                type='radio'
                className='btn-check bitacora-checked'
                name='btnradio'
                id='btnradio4'
                autocomplete='off'
                value={"4"}
              />
              <label className='btn btn-outline-secondary' htmlFor='btnradio4'>
                Tickets
              </label>

              <input
                type='radio'
                className='btn-check bitacora-checked'
                name='btnradio'
                id='btnradio5'
                autocomplete='off'
                value={"5"}
              />
              <label className='btn btn-outline-secondary' htmlFor='btnradio5'>
                Paciente
              </label>

              <input
                type='radio'
                className='btn-check bitacora-checked'
                name='btnradio'
                id='btnradio6'
                autocomplete='off'
                value={"6"}
              />
              <label className='btn btn-outline-secondary' htmlFor='btnradio6'>
                Trazabilidad
              </label>
            </div>

            {/* /////////// */}

            {/* /// DAta como estado asi que también columnas como un estado para cada input */}

            <table className='mx-auto table border '>
              <thead>
                <tr className='border-bottom'>
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
                {checkTabla === "1" && (
                  <>
                    {data.Encabezado.map((dato) => (
                      <tr key={dato.id}>
                        <td>{dato.BitacoraId.Int64}</td>
                        <td>{dato.Tabla.String}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <BitacoraDetail />
        </div>
      </div>
    </>
  );
}
