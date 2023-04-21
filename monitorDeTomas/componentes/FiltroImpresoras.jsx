import React, { useState, useEffect } from "react";

export default function FiltroImpresoras() {
  const [equipo, setEquipo] = useState([]);
  const [impresoras, setImpresoras] = useState([]);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [selectedImpresora, setSelectedImpresora] = useState(null);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.RUTA_API}/INVENTARIO/ms/GetAllEquipos`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEquipo(data.data);
      })
      .catch((error) => console.log("error", error));

    if (localStorage.getItem("ipdelEquipo")) {
      fetch(
        `${process.env.RUTA_API}/INVENTARIO/ms/GetImpresoraByIp?ip=${
          selectedEquipo || localStorage.getItem("ipdelEquipo")
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setImpresoras(data.data);
        })
        .catch((error) => console.log("error", error));
    }
  }, [selectedEquipo]);

  // useEffect(() => {

  // }, [])

  const handleGuardarClick = () => {
    if (selectedEquipo && selectedImpresora) {
      localStorage.setItem("ipdelEquipo", selectedEquipo);
      localStorage.setItem("nombredeimp", selectedImpresora);
      console.log(selectedEquipo,selectedImpresora)
    }
  };

  // función para manejar el evento onChange del select
  const handleEquipoSelect = (event) => {
    setSelectedEquipo(event.target.value);

    fetch(
      `${process.env.RUTA_API}/INVENTARIO/ms/GetImpresoraByIp?ip=${
        event.target.value || localStorage.getItem("ipdelEquipo")
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImpresoras(data.data);
      })
      .catch((error) => console.log("error", error));
  };

  // función para manejar el evento onChange del select
  const handleImpSelect = (event) => {
    setSelectedImpresora(event.target.value);
  };

  return (
    <div
      className='modal fade'
      id='setingsmodal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-xl'>
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
            {/* equipo */}
            <div className='container d-flex justify-content-evenly'>
              <select
                className='form-select h-100 w-100 m-3 p-3'
                aria-label='Default select example'
                onChange={handleEquipoSelect}
              >
                <option className='text-sm' value='null'>
                  {/* <span>{setStorage}</span> */}
                </option>

                {equipo.map((equi, i) => (
                  <option
                    key={equi.Ip}
                    value={equi.Ip}
                    selected={
                      localStorage.getItem("ipdelEquipo") === equi.Ip
                        ? "selected"
                        : ""
                    }
                  >
                    {equi.Nombre}
                  </option>
                ))}
              </select>

              <select
                className='form-select h-100 w-100 m-3 p-3'
                aria-label='Default select example'
                onChange={handleImpSelect}
              >
                <option className='text-sm' value='null'>
                  Impresora
                </option>
                {impresoras.map((imp) => (
                  <option
                    key={imp.SucuId}
                    value={imp.Nombre}
                    selected={
                      localStorage.getItem("nombredeimp") === imp.Nombre
                        ? "selected"
                        : ""
                    }
                  >
                    {imp.Nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Cerrar
            </button>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#setingsmodal'
              onClick={handleGuardarClick}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
