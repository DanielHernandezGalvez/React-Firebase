import React from "react";

export default function DowloadButtons(props) {
  return (
    <div className='col-2 h-50 '>
      <div className='btn-group ms-5 ps-5'>
        <button
          onClick={props.handleExportToPDF}
          className='btn btn-danger py-1 px-2'
        >
          <i className='bi bi-filetype-pdf text-white fs-4'></i>
        </button>
        <button
          onClick={props.handleExportToExcel}
          className='btn btn-success p-1 px-2'
        >
          <i className='bi bi-file-earmark-spreadsheet text-white fs-4'></i>
        </button>
        <button
          onClick={props.handlePrintTable}
          className='btn btn-secondary p-1 px-2'
        >
          <i className='bi bi-printer text-white fs-4'></i>
        </button>
      </div>
    </div>
  );
}
