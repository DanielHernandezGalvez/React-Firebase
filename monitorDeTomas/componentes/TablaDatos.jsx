import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DetalleFila from "./DetalleFila";

const TablaDatos = ({ columns, data }) => {
  const [expandedRows, setExpandedRows] = useState({});

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
    expandableRowsComponent: DetalleFila,
    expandOnRowClicked: true,
    onRowExpandToggled: handleRowExpand,
    expandedRows: expandedRows
  };

  return (
    <div className='container-fluid'>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
          responsive
          fixedHeader
          expandableRows
          className='border-top border-start'
          expandableRowsComponent={DetalleFila}
        ></DataTable>
      </DataTableExtensions>
    </div>
  );
};
export default TablaDatos;
