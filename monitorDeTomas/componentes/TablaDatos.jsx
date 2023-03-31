import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import TablaRecipiente from "./TablaRecipiente";

const TablaDatos = ({ columns, data }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [currentRow, setCurrentRow] = useState(null);

  // Función para manejar el cambio de estado de los expandibles
  const handleRowExpand = (row, expanded) => {
    const expandedRowsCopy = { ...expandedRows };
    expandedRowsCopy[row.index] = expanded;
    setExpandedRows(expandedRowsCopy);
  };

  const tableData = {
    columns: columns,
    data: data,
    expandableRows: true,
    expandableRowsComponent: TablaRecipiente,
    expandOnRowClicked: true,
    onRowExpandToggled: handleRowExpand,
    expandedRows: expandedRows,
    fileName: 'document'
  }; 

  return (
    <div className=''>
      <DataTableExtensions { ...tableData }>
        <DataTable
          columns={ columns }
          data={ data }
          pagination
          highlightOnHover
          striped
          responsive
          fixedHeader
          expandableRows
          className='border-top border-start'
          expandableRowExpanded={(row) => (row === currentRow)}expandOnRowClicked
          onRowClicked={(row) => setCurrentRow(row)}
          onRowExpandToggled={(bool, row) => setCurrentRow(row)}
          expandableRowsComponent={TablaRecipiente}
        ></DataTable>
      </DataTableExtensions>
    </div>
  );
};
export default TablaDatos;
