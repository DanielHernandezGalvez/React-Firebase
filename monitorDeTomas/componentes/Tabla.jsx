import React, { useState, useEffect } from "react";
// import data from "../../api/api.json";
import BuscadorHeader from "./BuscadorHeader";
import TablaDatos from "./TablaDatos";
import { TABLE_COLUMNS } from "./funciones/columns";
import { filterData, filterSucursal } from "./funciones/filtrar";

export default function Tabla() {
  const [filtrado, setFiltrado] = useState([]);

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

  const handleFilter = (event) => {
    const newData = filterData(event, filtrado);
    setFiltrado(newData);
    // console.log(newData)
  };

  const handleSucursal = (event) => {
    const selected = event.target.value;
    const newData = filterSucursal(selected, filtrado);
    setFiltrado(newData);
  };

  return (
    <>
      <div className='container-fluid'>
        <BuscadorHeader
          handleFilter={handleFilter}
          handleSucursal={handleSucursal}
        />
        <TablaDatos columns={TABLE_COLUMNS} data={filtrado} />
      </div>
    </>
  );
}
