import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ReactDom from "react-dom";

const ModalImprimir = ({ show, handleClose, data }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";
  const [ data, setData ] = useState(null);
  const [ params, setParams ] = useState({ f: "", Ip: "", P: "" })

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `http://192.168.0.14:8081/sian2/ms/monitor/MandarPdfAImprimir?f=${params.f}&Ip=${params.Ip}&P=${params.P}`;
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [params]);

  const handleDataClick = (data) => {
    // checar los valores de IpValue y Etiquetas
    setParams({ f: data.Folio, Ip: data.IpValue, P: data.Etiquetas })
  }

  return (
    <div className={showHideClassName}>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{data.ProductoDescripcion}</h5>
            <button
              type='button'
              className='btn-close'
              onClick={handleClose}
            ></button>
          </div>
          <div className='modal-body'>
            <p>{data.Estudio}</p>
            <p>{data.Fecha}</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={handleDataClick}
            >
              Cerrar
            </button>
            <button type='button' className='btn btn-primary'>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImprimir;
