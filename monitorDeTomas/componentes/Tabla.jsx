import React, { useState, useEffect } from "react";
import BuscadorHeader from "./BuscadorHeader";
import TablaDatos from "./TablaDatos";
import { TABLE_COLUMNS } from "./funciones/columns";
import { filterData, filterSucursal } from "./funciones/filtrar";

export default function Tabla() {
  // EL estado filtrado inicia como array vacío que se actualiza por la función setFiltrado
  const [filtrado, setFiltrado] = useState([]);
  const [sucuId, setSucuId] = useState(null);
  const [cronExpression, setCronExpression] = useState("* * * * * *");
  const [selected, setSelected] = useState(null);

  const fetchData = async (suc) => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let url = "http://localhost:8081/sian2/ms/monitor/GetAllTomas?Id=" + suc;
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data.data);
    setFiltrado(data.data);
  };

  /* Filtra los datos por nombre desde el componente BuscadorHeader
  llama a la función filterData desde la carpeta funciones */
  const handleFilter = (event) => {
    const newData = filterData(event, filtrado);
    setFiltrado(newData);
  };


  const handleSucursal = async (event) => {
    const selected = event.target.value;
    if (selected !== "null") {
      await fetchData(selected);
      setTimeout(() => {
        handleSucursal(event);
      }, 90000); // REGRESAR A 15 SEGUNDOS
    } else setFiltrado([]);
  };

  return (
    <>
      <div className='container-fluid container-fluid-margin'>
        <BuscadorHeader // el componente trae por props las funciones de filtrar.js
          handleFilter={handleFilter}
          handleSucursal={handleSucursal}
        />
        {/* trae por props el contenido de las columnas y convierte data en el estado filtrado */}
        <TablaDatos columns={TABLE_COLUMNS} data={filtrado} />
      </div>
    </>
  );
}
