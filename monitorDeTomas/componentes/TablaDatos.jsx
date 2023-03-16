import React from "react";
import DataTable from "react-data-table-component";

const TablaDatos = ({ columns, data }) => {
  return (
    <div className="table-responsive">
    <table className="table table-bordered">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.selector} className={column.className}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <React.Fragment key={row.id}>
            <tr>
              {columns.map((column) => (
                <td key={`${row.id}-${column.selector}`} className={column.className}>
                  {column.cell ? column.cell(row) : row[column.selector]}
                </td>
              ))}
            </tr>
            <tr>
              <td colSpan={columns.length}>
                <div className="collapse" id={`row-${row.id}-${index}`}>
                  <div className="card card-body">
                    <p>Detalles de la fila {row.id} aquí</p>
                  </div>
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
  );
};
export default TablaDatos;
