import React from "react";

export default function BitacorasFilter(props) {
  return (
    <form id='forEmpresa' onSubmit={props.getEmpresa}>
      <div className='row p-3 d-flex mx-5'>
        <div className='col-md-6 col-sm-12  pe-0'>
          <div className='input-group'>
            <span className='input-group-text' id='basic-addon1'>
              Inicial:
            </span>
            <input
              type='date'
              className='form-control p-3'
              id='fiInputEmpresa'
              aria-describedby='Fecha Inicial'
              required
            />
            <span className='input-group-text' id='basic-addon1'>
              Final:
            </span>
            <input
              type='date'
              className='form-control p-3'
              id='ffInputEmpresa'
              aria-describedby='Fecha Final'
              required
            />
          </div>
        </div>
        <div className='col-md-2 col-sm-12 pe-0'>
          <div className='form-floating'>
            <select
              className='form-select'
              id='sucInputEmpresa'
              placeholder='Username'
              required
            >
              <option id='zero'>Todas</option>
            </select>
            <label htmlFor='sucInputEmpresa'>Empresas</label>
          </div>
        </div>
        <div className='col-md-3 col-sm-12 pe-0 my-auto d-flex justify-content-evenly'>
          <div className=''>
            <label htmlFor='fInputBitacora'>Laboratorio</label>

            <input
              type='checkbox'
              className='ms-1'
              id='inputLaboratorio'
              autocomplete='off'
            />

            <label className='ms-3' htmlFor='fInputBitacora'>
              Imagenología
            </label>

            <input
              type='checkbox'
              className='ms-1'
              id='inputImagenologia'
              autocomplete='off'
            />
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
