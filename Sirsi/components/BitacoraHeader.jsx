import React from "react";

export default function BitacoraHeader() {
  return (
    <div>
      <div
        className='btn-group col-5 pe-3'
        role='group'
        aria-label='Basic radio toggle button group'
      >

        <input
          type='radio'
          className='btn-check bitacora-checked'
          name='btnradio'
          id='btnradio1'
          autocomplete='off'
        />
        <label className='btn btn-outline-secondary' htmlFor='btnradio1'>
          Encabezado
        </label>

        <input
          type='radio'
          className='btn-check bitacora-checked'
          name='btnradio'
          id='btnradio2'
          autocomplete='off'
        />
        <label className='btn btn-outline-secondary' htmlFor='btnradio2'>
        Detalle
        </label>

        <input
          type='radio'
          className='btn-check bitacora-checked'
          name='btnradio'
          id='btnradio3'
          autocomplete='off'
          
        />
        <label className='btn btn-outline-secondary' htmlFor='btnradio3'>
        Pagos
        </label>

        <input
          type='radio'
          className='btn-check bitacora-checked'
          name='btnradio'
          id='btnradio4'
          autocomplete='off'
        />
        <label className='btn btn-outline-secondary' htmlFor='btnradio4'>
        Tickets
        </label>

        <input
          type='radio'
          className='btn-check bitacora-checked'
          name='btnradio'
          id='btnradio5'
          autocomplete='off'
        />
        <label className='btn btn-outline-secondary' htmlFor='btnradio5'>
        Paciente
        </label> 

        <input
          type='radio'
          className='btn-check bitacora-checked'
          name='btnradio'
          id='btnradio6'
          autocomplete='off'
        />
        <label className='btn btn-outline-secondary' htmlFor='btnradio6'>
        Trazabilidad
        </label>  

      </div>
    </div>
  );
}
