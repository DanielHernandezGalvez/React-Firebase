import React, { useState, useEffect, useRef } from "react";
import BuscadorHeader from "./BuscadorHeader";
import TablaDatos from "./TablaDatos";
import { TABLE_COLUMNS } from "./funciones/columns";
import ModalImprimir from "./ModalImprimir";
import { filterData, filterSucursal } from "./funciones/filtrar";

export default function Tabla() {
  // EL estado filtrado inicia como array vacío que se actualiza por la función setFiltrado
  const [filtrado, setFiltrado] = useState([]);
  // const [timer, setTimer] = useState("");
  const [is_open, setIsOpen] = useState(true);
  // const [time, setTime] = useState(3000);
  // const [selected, setSelected] = useState(null);

  // title hover \\
  /** */ const [observaciones, setObservaciones] = useState("");
  const [inputValue, setInputValue] = useState("");
  /** */ const observacionesRef = useRef(null);

  const fetchData = async (suc) => {
    let time = 1;
    if (is_open) time = 1500;

    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let url = `${process.env.RUTA_API}/sian2/ms/monitor/GetAllTomas?Id=` + suc;
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    setFiltrado(data.data);
  };

  /* Filtra los datos por nombre desde el componente BuscadorHeader
  llama a la función filterData desde la carpeta funciones */
  const handleFilter = (event) => {
    const newData = filterData(event, filtrado);
    setFiltrado(newData);
  };

  const handleSucursal = async (event) => {
    console.log(":( ");
    const selected = event.target.value;

    let filter = document.getElementsByClassName("filter-text")[0];
    if (filter.value.length > 0) {
      console.log("El input tiene algo escrito.");
    } else {
      console.log("El input está vacío.");
    }

    if (selected !== "null") {
      setIsOpen(!is_open);
      await fetchData(selected);

      if (filter.value.length < 1) {
        setTimeout(() => {
          handleSucursal(event);
        }, 10000); // subir a producción
      }
      if (filter.value.length > 1) {
        setTimeout(() => {
          handleSucursal(event);
        }, 90000);
      } // REGRESAR A 30 SEGUNDOS
    } else {
      setFiltrado([]);
    }
  };

  const hadleFetch = () => {
    let filter = document.getElementsByClassName("filter-text")[0];
    if (filter.value.length === 10) {
      fetch(
        `${process.env.RUTA_API}/sian2/ms/monitor/GetTomaByExpediente?F=${filter.value}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data[0]) {
            console.log(data);
            localStorage.setItem("desactivarimp", false);
            document.getElementById("checkbx").checked = true;
            setFiltrado(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Inserta un Folio correcto");
        });
    } else {
      alert("Inserta un Folio correcto");
    }
  };

  let sendObser = (observaciones) => {
    // aqui va el fetch para mandar el status pendiente y las observaciones
    fetch("/ruta-del-backend", {
      method: "POST",
      body: JSON.stringify({ observaciones: inputValue }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {})
      .catch((error) => {});
  };

  // title hover \\
  // const guardarCambios = () => {
  //   const inputText = observacionesRef.current.value;
  //   setObservaciones(inputText);

  //   const boton = document.querySelector('#boton-pendiente');
  //   boton.setAttribute('title', inputText);
  // };

  return (
    <>
      <div className='container-fluid container-fluid-margin'>
        <BuscadorHeader // el componente trae por props las funciones de filtrar.js
          handleFilter={handleFilter}
          handleSucursal={handleSucursal}
          hadleFetch={hadleFetch}
        />
        {filtrado.map((d, i) => {
          if (
            localStorage.getItem("ipdelEquipo") &&
            localStorage.getItem("nombredeimp")
          ) {
              if (d.Impreso.Int64 === 0) {
                d.Impreso.Int64 = 1;
                fetch(
                  `${
                    process.env.RUTA_API
                  }/sian2/ms/monitor/MandarPdfAImprimir?f=${
                    d.OrdenDeTrabajo
                  }&Ip=${localStorage.getItem(
                    "ipdelEquipo"
                  )}&P=${localStorage.getItem("nombredeimp")}`
                ).then((response) => response.text());
              }
          } else {
            if (i === 0 && localStorage.getItem("desactivarimp") === "true") {
              alert("Primero Selecciona una impresora");
              return null;
            }
          }
        })}

        {/* trae por props el contenido de las columnas y convierte data en el estado filtrado */}
        <TablaDatos columns={TABLE_COLUMNS} data={filtrado} />
        <ModalImprimir />

        {/* MODAL */}
        <div className='modal fade' id='modal' tabIndex='-1'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Cambio de Estatus</h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <h5 id='observacionesArea'></h5>
                <p id='observacionesEstudio'></p>
                <div className='mb-3'>
                  <label htmlFor='observaciones' className='form-label'>
                    Observaciones
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='observacionesTomas'
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Cancelar
                </button>
                <button
                  id='btn-setstatus'
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                  onClick={() => {
                    let formdata = new FormData();
                    formdata.append(
                      "IdOrdenDetalle",
                      document.getElementById("observacionesArea").ariaLabel
                    );
                    formdata.append(
                      "ObservacionesTomas",
                      document.getElementById("observacionesTomas").value
                    );

                    let requestOptions = {
                      method: "POST",
                      body: formdata,
                    };

                    fetch(
                      document.getElementById("observacionesTomas").ariaLabel,
                      requestOptions
                    )
                      .then((response) => response.text())
                      .then((result) => console.log(result))
                      .catch((error) => console.log("error", error));
                  }}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
