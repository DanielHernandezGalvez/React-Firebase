import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { COLUNS_DETAILS_TABLE } from "./funciones/columns";

const DetalleFila = ({ data }) => {
  const [detalle, setDetalle] = useState([]);
  const [filaExpandibe, setFilaExpandible] = useState(null);

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

  const PREPARACION = [
    {
      name: "Preparación",
      selector: "Preparación.String",
      sortable: true,
    },
  ];
  const expandableRowsComponent = ({ data, rowIndex }) => {
    // const preparacionData = detalle.filter(
    //   (d) => d.ProductoId === data.ProductoId
    // );

    if (rowIndex === filaExpandibe) {
      return null;
    }

    const preparacionData = detalle.filter(
      (d) => d.ProductoId === data.ProductoId
    );

    return (
      <div>
        <DataTable
          columns={PREPARACION}
          data={preparacionData}
          className='shadow-lg bg-body text-center'
          noHeader
          highlightOnHover
          striped
          responsive
        />
      </div>
    );
  };

  /* compara si existe igualdad con la función anterior para descartar si ya 
  hay un expandible abierto, toma el rowIndex como parametro principal */
  const handleRowExpand = (rowIndex) => {
    setFilaExpandible(filaExpandibe === rowIndex ? null : rowIndex);
  };

  return (
    <>
      <DataTable
        columns={COLUNS_DETAILS_TABLE}
        data={detalle}
        expandableRows
        expandableRowsComponent={expandableRowsComponent}
        expandableRowExpanded={(row) =>
          row.ProductoId === detalle[filaExpandibe]?.ProductoId
        }
        onRowExpandToggled={handleRowExpand}
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
