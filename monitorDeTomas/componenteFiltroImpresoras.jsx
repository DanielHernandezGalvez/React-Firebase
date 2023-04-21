import React, { useState, useEffect } from "react";

export default function FiltroImpresoras() {
  const [equipo, setEquipo] = useState([]);
  const [impresoras, setImpresoras] = useState([]);
  const [selectedEquipo, setSelectedEquipo] = useState(null);

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
  }, []);

  // useEffect(() => {
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };

  //   fetch(`${process.env.RUTA_API}/INVENTARIO/ms/GetImpresoraByIp?pcid=${PcId}&n=Etiquetas&m=${Modelo}`, requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }, [])

  const handleGuardarClick = () => {
    if (selectedEquipo) {
      localStorage.setItem("equipoSeleccionado", selectedEquipo);
      alert(`Equipo ${selectedEquipo} guardado en el localStorage`);
    }
  };

  // función para manejar el evento onChange del select
  const handleEquipoSelect = (event) => {
    setSelectedEquipo(event.target.value);
  };

  return (
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
            {/* equipo */}
            <div className='container d-flex justify-content-evenly'>
              <select
                className='form-select h-100 w-100'
                aria-label='Default select example'
                onChange={handleEquipoSelect}
                value={selectedEquipo}
              >
                <option className='text-sm' value='null'>
                  Equipo
                </option>

                {equipo.map((equi) => (
                  <option key={equi.Ip} value={equi.Ip}>
                    {equi.Nombre}
                  </option>
                ))}
              </select>

              <select
                className='form-select h-100 w-100'
                aria-label='Default select example'
              >
                <option className='text-sm' value='null'>
                  Impresora
                </option>

                {impresoras.map((imp) => (
                  <option key={imp.SucuId} value={imp.SucuId}>
                    {imp.PcNombre}
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
