import React from "react";

export default function FiltrosDescuentos(props) {
  return (
    <form id='formBitacora' onSubmit={props.getDescuentos}>
      <div id="rowformBitacora" className='row p-3 d-flex mx-5 '>
        <div className='col-md-8 col-sm-12  my-1'>
          <div className='input-group'>
            <span className='input-group-text' id='basic-addon1'>
              Inicial:
            </span>
            <input
              type='date'
              className='form-control p-3'
              id='fiInputDescuentos'
              aria-describedby='Fecha Inicial'
              required
            />
            <span className='input-group-text' id='basic-addon1'>
              Final:
            </span>
            <input
              type='date'
              className='form-control p-3'
              id='ffInputDescuentos'
              aria-describedby='Fecha Final'
              required
            />
          </div>
        </div>
        <div className='col-md-3 col-sm-12 my-1'>
          <div className='form-floating'>
            <select
              className='form-select'
              id='sucInputDescuentos'
              placeholder='Username'
              required
            >
              <option id='0'>Todas</option>
            </select>
            <label htmlFor='sucInputBitacora'>Sucursales</label>
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
