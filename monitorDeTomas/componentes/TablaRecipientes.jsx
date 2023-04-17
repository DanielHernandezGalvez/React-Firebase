import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import DetalleFila from "./DetalleFila";
import { TABLA_PRINCIPAL_COLUMNS } from "./funciones/columns";
import ModalImprimir from "./ModalImprimir";

export default function TablaPrincipal({ columns, data }) {
  const [ recipientes, setRecipientes ] = useState([]);
  const [ filaExpandible, setFilaExpandible ] = useState({});
  const [ filaActual, setFilaActual ] = useState(null);
  const [ selectedRow, setSelectedRow ] = useState(null);
  const [ selectedData, setSelectedData ] = useState(null);
  const [ isPrintModalOpen, setIsPrintModalOpen ] = useState(false);

  useEffect(() => {
    const fetchRecipientes = async () => {
      let url = `http://localhost:8081/sian2/ms/monitor/GetRecipientesByFolio?f=${data.OrdenDeTrabajo}`;
      const response = await fetch(url);
      const data_r = await response.json();
      console.log(data_r);
      setRecipientes(
        data_r.filter((r) => {
          r.OrdenTrabajoId = data.OrdenTrabajoId;
          return true;
        })
      );
    };
    fetchRecipientes();
    console.log(recipientes);
  }, []);

  const handleExpand = (row, expanded) => {
    const filaExpandibleCopia = { ...filaExpandible };
    filaExpandibleCopia[row.index] = expanded;
    setFilaExpandible(filaExpandibleCopia);
    setSelectedRow(expanded ? row.index : null);
  };

  const rowClass = (row) => {
    if (selectedRow === row.index) {
      return "selected-row";
    }
    return "";
  };

  const handleRowClick = (row) => {
    setSelectedData(row);
  };

  const handlePrintModalOpen = () => {
    setIsPrintModalOpen(true);
  };

  const handlePrintModalClose = () => {
    setIsPrintModalOpen(false);
  };

  const dataTable = {
    ///////////////////////////////////////
    // columns: TABLA_PRINCIPAL_COLUMNS, //
    ///////////////////////////////////////
    columns: [
      ...TABLA_PRINCIPAL_COLUMNS,
  
    ],
    data: recipientes,
    expandableRows: true,
    expandableRowsComponent: DetalleFila,
    expandOnRowClicked: true,
    onRowExpandToggled: handleExpand,
    expandedRows: filaExpandible,
    fileName: "document",
  };

  return (
    <>
      <DataTable
        {...dataTable}
        // highlightOnHover
        // columns={ TABLA_PRINCIPAL_COLUMNS }
        // data={ recipientes }
        // highlightOnHover
        // striped
        // responsive
        // fixedHeader
        // expandableRows    
        className='shadow-lg bg-body'
        expandableRowExpanded={(row) => row === filaActual}
        expandOnRowClicked
        onRowClicked={(row) => setFilaActual(row)}
        onRowExpandToggled={(bool, row) => setFilaActual(row)}
        conditionalRowStyles={[
          {
            when: (row) => selectedRow === row.index,
            style: {
              backgroundColor: "#f0f0f0 !important",
            },
          },
        ]}
        rowClass={rowClass}
      />
      {selectedData && (
        <div className='d-grid gap-2'>
          <button
            className='btn btn-primary'
            type='button'
            onClick={handlePrintModalOpen}
          >
            Imprimir
          </button>
        </div>
      )}
      <ModalImprimir
        show={isPrintModalOpen}
        handleDataClick={handleDataClick}
        data={data}
      />
    </>
  );
}


