import React from "react";

export default function BitacorasFilter(props) {
  return (
    <form id='formBitacora' onSubmit={props.getBitacora}>
      <div className='row p-3 d-flex mx-5'>
        <div className='col-md-5 col-sm-12  pe-0'>
          <div className='input-group'>
            <span className='input-group-text' id='basic-addon1'>
              Inicial:
            </span>
            <input
              type='date'
              className='form-control p-3'
              id='fiInputBitacora'
              aria-describedby='Fecha Inicial'
              required
            />
            <span className='input-group-text' id='basic-addon1'>
              Final:
            </span>
            <input
              type='date'
              className='form-control p-3'
              id='ffInputBitacora'
              aria-describedby='Fecha Final'
              required
            />
          </div>
        </div>
        <div className='col-md-2 col-sm-12 pe-0'>
          <div className='form-floating'>
            <select
              className='form-select'
              id='sucInputBitacora'
              placeholder='Username'
              required
            >
              <option id='cero'>Todas</option>
            </select>
            <label htmlFor='sucInputBitacora'>Sucursales</label>
          </div>
        </div>
        <div className='col-md-2 col-sm-12 pe-0'>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='fInputBitacora'
            //   placeholder="Número de Folio"
            />

            <label htmlFor='fInputBitacora'>Folio</label>
          </div>
        </div>
        <div className='col-md-1 col-sm-4'>
          <button type='submit' className='btn btn-primary p-3'>
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
