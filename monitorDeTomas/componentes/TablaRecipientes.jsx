import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DetalleFila from "./DetalleFila";
import { TABLA_PRINCIPAL_COLUMNS } from "./funciones/columns";

export default function TablaPrincipal({ columns, data }) {
  const [recipientes, setRecipientes] = useState([]);
  const [filaExpandible, setFilaExpandible] = useState({});
  const [filaActual, setFilaActual] = useState(null);

  useEffect(() => {
    const fetchRecipientes = async () => {
      let url = `http://localhost:8081/sian2/ms/monitor/GetRecipientesByFolio?f=${data.OrdenDeTrabajo}`;
      const response = await fetch(url);
      const data_r = await response.json();
      setRecipientes(data_r.data);
    };
    fetchRecipientes();
  }, []);

  const handleExpand = (row, expanded) => {
    const filaExpandibleCopia = { ...filaExpandible };
    filaExpandibleCopia[(row, index)] = expanded;
    setFilaExpandible(filaExpandibleCopia);
  };

  const dataTable = {
    columns: columns,
    data: data,
    expandableRows: true,
    expandableRowsComponent: DetalleFila,
    expandOnRowClicked: true,
    onRowExpandToggled: handleExpand,
    expandedRows: filaExpandible,
    fileNme: "document",
  };

  return (
    <>
    {/* <DataTableExtensions { ...dataTable }> */}
      <DataTable
        columns={ TABLA_PRINCIPAL_COLUMNS }
        data={ recipientes }
        highlightOnHover
        striped
        responsive
        fixedHeader
        expandableRows
        // className='border-top border-start border-bottom'
        // expandableRowExpanded={(row) => (row === filaActual)}expandOnRowClicked
        // onRowClicked={(row) => setFilaActual(row)}
        // onRowExpandToggled={(bool, row) => setFilaActual(row)}
        // expandableRowsComponent={DetalleFila}
      ></DataTable>
      {/* </DataTableExtensions> */}
    </>
  );
}

