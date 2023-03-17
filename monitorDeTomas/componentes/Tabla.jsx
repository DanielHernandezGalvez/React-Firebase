import React, { useState, useEffect } from "react";
import BuscadorHeader from "./BuscadorHeader";
import TablaDatos from "./TablaDatos";
import { TABLE_COLUMNS } from "./funciones/columns";
import { filterData, filterSucursal } from "./funciones/filtrar";

export default function Tabla() {
  // EL estado filtrado inicia como array vacío que se actualiza por la funcion setFiltrado
  const [filtrado, setFiltrado] = useState([]);

  /* el useEffect realiza una petición GET a la api mediante fetch y actualiza el estado
  filtrado  con los datos de la url */
  useEffect(() => {
    const fetchData = async () => {
      let requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      let url = "http://localhost:8081/sian2/ms/monitor/GetAllTomas?Id=12";
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setFiltrado(data.data);
    };
    fetchData();
  }, []);

  /* Filtra los datos por nombre desde el componente BuscadorHeader.
  llama a la función filterData desde la carpeta funciones */
  const handleFilter = (event) => {
    const newData = filterData(event, filtrado);
    setFiltrado(newData);
  };

  /* Filtra los datos por sucursales desde el componente BuscadorHeader 
  toma un onChange de un collapse de bootstrap y usa la función filterSucursal
  desde la carpeta funciones */
  const handleSucursal = (event) => {
    const selected = event.target.value;
    const newData = filterSucursal(selected, filtrado);
    setFiltrado(newData);
  };

  return (
    <>
      <div className='container-fluid'>
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
