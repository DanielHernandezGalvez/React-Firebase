import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import DetalleFila from "./DetalleFila";
import { TABLA_PRINCIPAL_COLUMNS, changeColor } from "./funciones/columns";

export default function TablaRecipiente(props,{ columns, data }) {
  const [recipientes, setRecipientes] = useState([]);
  const [filaExpandible, setFilaExpandible] = useState({});
  const [filaActual, setFilaActual] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // ======================== \\
  const fetchInfo = async (folio) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let url =
      `${process.env.RUTA_API}/ms/monitor/BuscarRecipientesByFolio?f=` + folio;
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    setInfo(data);
  };
  // ======================== \\

  useEffect(() => {
    
    const fetchRecipientes = async () => {
      if (props.info) {
        let url = `${process.env.RUTA_API}/sian2/ms/monitor/GetRecipientesByFolio?f=${data.OrdenDeTrabajo}`;
      } else {
        let url = `${process.env.RUTA_API}/sian2/ms/monitor/GetRecipientesByFolio?f=${data.OrdenDeTrabajo}`;
      }
      let url = `${process.env.RUTA_API}/sian2/ms/monitor/BuscarRecipientesByFolio?f=${data.OrdenDeTrabajo}`;
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
    fetchRecipientes()
    
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

  const handleModalClose = () => {
    setRecipientes(null);
    setIsPrintModalOpen(false);
  };

  const handlePrintModalOpen = () => {
    setRecipientes(recipientes);
    setIsPrintModalOpen(true);
  };

  const dataTable = {
    columns: [...TABLA_PRINCIPAL_COLUMNS],
    data: recipientes,
    expandableRows: true,
    expandableRowsComponent: DetalleFila,
    expandOnRowClicked: true,
    onRowExpandToggled: handleExpand,
    expandedRows: filaExpandible,
    fileName: "document",
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.Pendientes,
      style: {
        backgroundColor: "rgba(254, 138, 127, 0.4)",
        color: "#012639",
      },
    },
    {
      when: (row) => !row.Pendientes,
      style: {
        backgroundColor: "#007cba23",
        color: "#012639",
      },
    },
  ];

  return (
    <>
      <DataTable
        {...dataTable}
        className='shadow-lg bg-body'
        expandableRowExpanded={(row) => row === filaActual}
        expandOnRowClicked
        onRowClicked={(row) => setFilaActual(row)}
        onRowExpandToggled={(bool, row) => {
          console.log("Aqui va la funcion que hace el scroll", row);
          setFilaActual(row);
        }}
        conditionalRowStyles={conditionalRowStyles}
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
    </>
  );
}
