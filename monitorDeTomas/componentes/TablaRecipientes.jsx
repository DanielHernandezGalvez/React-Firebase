import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import DetalleFila from "./DetalleFila";
import { TABLA_PRINCIPAL_COLUMNS, changeColor } from "./funciones/columns";

export default function TablaPrincipal({ columns, data }) {
  const [recipientes, setRecipientes] = useState([]);
  const [filaExpandible, setFilaExpandible] = useState({});
  const [filaActual, setFilaActual] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipientes = async () => {
      let url = `${process.env.RUTA_API}/sian2/ms/monitor/GetRecipientesByFolio?f=${data.OrdenDeTrabajo}`;
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

  // const handleExpandRow = (row) => {
  //   setFilaActual(row);
  //   const filaExpandida = document.getElementById(`fila-${row.id}`);
  //   filaExpandida.scrollIntoView({ behavior: "smooth" });
  // };
  // const changeColor = () => {
  //   const rowColor = document.querySelector(".ifWazN");
  //   const styleSheet = document.createElement("style");

  //   if (true) {
  //     styleSheet.innerHTML =
  //       ".new-row-color { background-color: rgba(254, 138, 127, 0.4) !important; }";
  //     rowColor.style.cssText += "background-color: rgba(254, 138, 127, 0.4) !important;";
  //   } else {
  //     styleSheet.innerHTML =
  //       ".new-row-color { background-color: #007cba23 !important; }";
  //     rowColor.style.cssText += "background-color: #007cba23 !important;";
  //   }

  //   document.head.appendChild(styleSheet);
  //   rowColor.classList.add("new-row-color");
  // };

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

  function scrollToRow(row) {
    const rowElement = document.querySelector(`#${row.id}`);
    if (rowElement) {
      const topPosition = rowElement.offsetTop;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  }

  return (
    <>
      <DataTable
        {...dataTable}
        onClick={() => scrollToRow(row)} // expandir última fila
        className='shadow-lg bg-body'
        expandableRowExpanded={(row) => row === filaActual}
        expandOnRowClicked
        onRowExpandToggled={(bool, row) => {
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
