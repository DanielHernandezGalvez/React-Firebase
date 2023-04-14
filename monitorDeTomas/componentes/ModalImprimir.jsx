import React from "react";
import ReactDom from "react-dom";

const ModalImprimir = ({ show, handleClose, rowData }) => {

  return ReactDOM.createPortal(
    <div className={showHideClassName}>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{rowData.ProductoDescripcion}</h5>
            <button
              type='button'            
              className='btn-close'
              onClick={handleClose}
            ></button>
          </div>
            <button type='button' className='btn btn-primary'>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalImprimir;
