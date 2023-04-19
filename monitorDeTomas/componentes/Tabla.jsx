import React, { useState, useEffect } from "react";
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

  const fetchData = async (suc) => {
    let time = 1;
    if (is_open) time = 1500;

    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let url = "http://localhost:8081/sian2/ms/monitor/GetAllTomas?Id=" + suc;
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

    const filter = document.getElementsByClassName("filter-text")[0];
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
        }, 30000);
      } if (filter.value.length > 1) {
        setTimeout(() => {
          handleSucursal(event);
        }, 90000);
      }// REGRESAR A 30 SEGUNDOS

    } else {
      setFiltrado([]);
    }
  };

  // const awaitT = () => {};

  return (
    <>
      <div className='container-fluid container-fluid-margin'>
        <BuscadorHeader // el componente trae por props las funciones de filtrar.js
          handleFilter={handleFilter}
          handleSucursal={handleSucursal}
        />
        {/* trae por props el contenido de las columnas y convierte data en el estado filtrado */}
        <TablaDatos columns={TABLE_COLUMNS} data={filtrado} />
        <ModalImprimir />
      </div>
    </>
  );
}
