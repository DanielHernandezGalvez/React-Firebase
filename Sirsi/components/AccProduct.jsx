import React from "react";

export default function AccProduct() {
  return (
    <div className='accordion  border border-0' id='accordionExample2'>
      <div className='accordion-item border border-0'>
        <h2 className='accordion-header border border-0'>
          <button
            className='accordion-button collapsed border border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse1'
            aria-expanded='false'
            aria-controls='collapse1'
          >
            Sucursal
          </button>
        </h2>
        <div
          id='collapse1'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample2'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Expedientes</li>
              <li>Estudios</li>
              <li>Faltantes / Sobrantes</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='accordion-item border border-0'>
        <h2 className='accordion-header border border-0'>
          <button
            className='accordion-button collapsed border border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse2'
            aria-expanded='false'
            aria-controls='collapse2'
          >
            Sucursal
          </button>
        </h2>
        <div
          id='collapse2'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample2'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Estudios</li>
              <li>Detallado</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='accordion-item border border-0'>
        <h2 className='accordion-header border border-0'>
          <button
            className='accordion-button collapsed border border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse3'
            aria-expanded='false'
            aria-controls='collapse3'
          >
            Imagenología
          </button>
        </h2>
        <div
          id='collapse3'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample2'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Médicos</li>
              <li>Estudios</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='accordion-item border border-0'>
        <h2 className='accordion-header border border-0'>
          <button
            className='accordion-button collapsed border border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse4'
            aria-expanded='false'
            aria-controls='collapse4'
          >
            Dental
          </button>
        </h2>
        <div
          id='collapse4'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample2'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Técnico</li>
              <li>Estudios</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='accordion-item border border-0'>
        <h2 className='accordion-header border border-0'>
          <button
            className='accordion-button collapsed border border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse5'
            aria-expanded='false'
            aria-controls='collapse5'
          >
            Laboratorio
          </button>
        </h2>
        <div
          id='collapse5'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample2'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Analista</li>
              <li>Tomas</li>
              <li>Estudios</li>
              <li>Liberaciones</li>
              <li>Liberaciones Detallado</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='accordion-item border border-0'>
        <h2 className='accordion-header border border-0'>
          <button
            className='accordion-button collapsed border border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse6'
            aria-expanded='false'
            aria-controls='collapse6'
          >
            Caja
          </button>
        </h2>
        <div
          id='collapse6'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample2'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Órdenes</li>
              <li>Estudios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
