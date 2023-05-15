import React from "react";
import AccProduct from "./AccProduct";

export default function () {
  return (
    <div
      className='accordion border-none border border-0 p-1 pt-4'
      id='accordionExample'
    >
    
      <div className='d-flex  justify-content-center'>
        <i class='bi bi-clock fs-3 my-auto'></i>
        <h6 className='fw-bold ps-3 my-auto'>Bitácora</h6>
      </div>

      <div className='accordion-item border border-0'>
        <h2 className='accordion-header border border-0'>
          <button
            className='accordion-button collapsed border border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseOne'
            aria-expanded='false'
            aria-controls='collapseOne'
          ><i class="bi bi-buildings pe-2 fs-3"></i>
            Empresa
          </button>
        </h2>
        <div
          id='collapseOne'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Resultados</li>
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
            data-bs-target='#collapseTwo'
            aria-expanded='false'
            aria-controls='collapseTwo'
          >
            <i class="bi bi-clipboard-data pe-2 fs-3"></i>
            Administración
          </button>
        </h2>
        <div
          id='collapseTwo'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Facturación</li>
              <li>Órdenes</li>
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
            data-bs-target='#collapseThree'
            aria-expanded='false'
            aria-controls='collapseThree'
          >
            <i class="bi bi-person-bounding-box pe-2 fs-3"></i>
            Dirección
          </button>
        </h2>
    
        <div
          id='collapseThree'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Médicos</li>
              <li>Vales</li>
              <li>Descuentos</li>
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
            data-bs-target='#collapseFour'
            aria-expanded='false'
            aria-controls='collapseThree'
          >
            <i class="bi bi-clipboard2-check pe-2 fs-3"></i>
            Encuesta
          </button>
        </h2>
        <div
          id='collapseFour'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Resultados</li>
              <li>Sucursales</li>
              <li>Cajero</li>
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
            data-bs-target='#collapseFive'
            aria-expanded='false'
            aria-controls='collapseThree'
          >
            <i class="bi bi-person-add pe-2 fs-3"></i>
            Productividad
          </button>
        </h2>
        <div
          id='collapseFive'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample'
        >
          <div className='accordion-body border border-0'>
            <AccProduct />
          </div>
        </div>
      </div>

      <div className='accordion-item border border-0'>
        <h2 className='accordion-header border border-0'>
          <button
            className='accordion-button collapsed border border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseSix'
            aria-expanded='false'
            aria-controls='collapseSix'
          >
            <i class="bi bi-graph-up-arrow pe-2 fs-3"></i>
            Estadisticos
          </button>
        </h2>
        <div
          id='collapseSix'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Pacientes</li>
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
            data-bs-target='#collapseSeven'
            aria-expanded='false'
            aria-controls='collapseSeven'
          > 
            <i class="bi bi-tools pe-2 fs-3"></i>
            Utilerías
          </button>
        </h2>
        <div
          id='collapseSeven'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Reimpresión de Inicial</li>
              <li>Deshacer Corte</li>
              <li>Quitar Firmas</li>
              <li>Cambiar Cita</li>
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
            data-bs-target='#collapseEight'
            aria-expanded='false'
            aria-controls='collapseEight'
          >
            <i class="bi bi-gear-wide-connected pe-2 fs-3"></i>
            Configuración
          </button>
        </h2>
        <div
          id='collapseEight'
          className='accordion-collapse collapse border border-0'
          data-bs-parent='#accordionExample'
        >
          <div className='accordion-body border border-0'>
            <ul>
              <li>Usuarios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
