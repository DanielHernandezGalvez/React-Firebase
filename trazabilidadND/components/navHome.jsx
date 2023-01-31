// Este código renderiza la barra de navegación responsiva hecha con Bootstrap que va una vez se 
// ha autenticado el ingreso
import React from "react";
import Link from "next/link.js";
import Image from "next/image";

export default function navHome() {
  return (
    <nav className='navbar navbar-expand-md shadow-sm bg-body rounded'>
      <div className='container-fluid '>
        <Link href='/'>
          <Image
            className='navbar-brand mx-4 p-0'
            src='/img/ND.png'
            alt='ND'
            width={80}
            height={39}
          />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarText'>
          <ul className='navbar-nav me-auto mx-4 pt-1 mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                className='nav-link mx-3'
                aria-current='page'
                href='http://web.nucleodediagnostico.mx/'
              >
                Web ND
              </Link>
            </li>
            <li className='nav-item mx-3'>
              <Link className='nav-link' aria-current='page' href='/home'>
                Recepción de muestras
              </Link>
            </li>
            <li className='nav-item mx-3'>
              <Link className='nav-link' aria-current='page' href='/home/lotes'>
                Lotes
              </Link>
            </li>
          </ul>
          <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
            <Link href='/logout'>
              <button className='btn btn-outline-danger me-md-2' type='button'>
                <i className='bi bi-box-arrow-in-right'></i> Cerrar sesión
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
