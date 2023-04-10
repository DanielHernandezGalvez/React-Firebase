// Este código renderiza la barra de navegación responsiva hecha con Bootstrap cuando
// no se ha autenticado el ingreso
import Link from "next/link";
import Image from "next/image";

export const NoAuthNav = () => {
  return (
    <>
      <nav className='navbar navbar-expand-md '>
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
                  className='nav-link'
                  aria-current='page'
                  href='http://web.nucleodediagnostico.mx/'
                >
                  Web ND
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  href='http://web.nucleodediagnostico.mx/aviso-y-politica-de-privacidad/'
                >
                  Aviso de Privacidad
                </Link>
              </li>
            </ul>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end '></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NoAuthNav;
