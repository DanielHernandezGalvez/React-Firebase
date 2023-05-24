import React from "react";

export default function FiltrosExpedientes(props) {
  return (
    <form id='formExpedientes' onSubmit={props.getExpedientes}>
      <div id="rowformExpedientes" className='row p-3 d-flex justify-content-center  '>
        <div className='col-md-10 col-sm-12  my-1'>
          <div className='input-group'>
            <span className='input-group-text' id='basic-addon1'>
              Inicial:
            </span>
            <input
              type='date'
              className='form-control p-3'
              id='fiInputExpedientes'
              aria-describedby='Fecha Inicial'
              required
            />
            <span className='input-group-text' id='basic-addon1'>
              Final:
            </span>
            <input
              type='date'
              className='form-control p-3'
              id='ffInputExpedientes'
              aria-describedby='Fecha Final'
              required
            />
          </div>
        </div>
       
        <div className='col-md-1 col-sm-4 my-1'>
          <button type='submit' className='btn btn-primary p-3'>
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
