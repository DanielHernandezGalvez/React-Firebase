import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { COLUNS_DETAILS_TABLE } from "./funciones/columns";

const DetalleFila = ({ data }) => {
  const [detalle, setDetalle] = useState([]);
  const [filaExpandible, setFilaExpandible] = useState(null);
  const [ultimaFilaExpandida, setUltimaFilaExpandida] = useState(null)

  useEffect(() => {
    const fetchOrdenesTrabajo = async () => {
      let requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      try {
        const response = await fetch(
          `http://localhost:8081/sian2/ms/monitor/GetAllOrdenesTrabajo?Id=${data.OrdenTrabajoId}`,
          requestOptions
        );
        const data_d = await response.json();
        console.log(data_d.data);
        setDetalle(
          data_d.data.filter((d) => {
            return d.ProductoId === data.ProductoId;
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrdenesTrabajo();
  }, []);

 
  const expandableRowsComponent = ({ data }) => {
    const preparacionData = detalle.filter(
      (d) => d.ProductoId === data.ProductoId
    );
    return (
      <div className="p-2 bg-body">
        {data.Preparación.String}
      </div>
    );
  };

  const handleRowExpand = (rowIndex) => {
    // const newFilaExpandible = filaExpandible === rowIndex ? null : rowIndex;
    // setFilaExpandible(newFilaExpandible);
    if(filaExpandible !== rowIndex) {
      setFilaExpandible(rowIndex)
      if (ultimaFilaExpandida !== null && ultimaFilaExpandida !== rowIndex){
        setFilaExpandible(null)
      }
      setUltimaFilaExpandida(rowIndex)  
    } else {
      setFilaExpandible(null)
      setUltimaFilaExpandida(null)
    }
  };

  const dataTable = {
    columns: COLUNS_DETAILS_TABLE,
    data: detalle,
    expandableRows: true,
    expandableRowsComponent: expandableRowsComponent,
    expandOnRowClicked: true,
    onRowExpandToggled: handleRowExpand,
    
  }

  return (
    <>
      <DataTable
        {...dataTable}
        expandableRowExpanded={(row) => row === filaExpandible}
        onRowClicked={(row) => setFilaExpandible(row)}
        onRowExpandToggled={(bool, row) => setFilaExpandible(row)}
        highlightOnHover
        striped
        responsive
        className='shadow-lg bg-body'
        defaultSortField='Estudio'
      />
    </>
  );
};

export default DetalleFila;
