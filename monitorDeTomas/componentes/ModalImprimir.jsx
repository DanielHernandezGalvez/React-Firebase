import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ReactDom from "react-dom";

const ModalImprimir = ({ show, onClose, recipientes }) => {
  
  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value);
    if (inputValue >= 1) {
      setValue(inputValue);
    }
  };

  return (
    <div
      className='modal fade'
      id='modalprint'
      tabindex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='printProductoDescripcion'>
              recipientes.ProductoDescripcion
            </h5>
            {/* <button
              type='button'
              className='btn-close'
              onClick={onClose}
            ></button> */}
          </div>
          <div className='modal-body'>
            <p id='printFolio'>Folio</p>
            <p id='printEstudios'>recipientes.Estudios</p>
            <input
              id='inputToprint'
              className='form-control'
              type='number'
              min='1'
            />
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Cerrar
            </button>
            <button type='button' className='btn btn-primary' onClick={()=>{print(document.getElementById('inputToprint').ariaLabel, parseInt(document.getElementById('inputToprint').value))}}>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const print = (url, cantidad) => {
  console.log(cantidad)

  fetch(url)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export default ModalImprimir;
