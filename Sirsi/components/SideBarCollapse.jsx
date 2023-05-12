import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TableFacturas from "./TableFacturas";
import TableBitacora from "./TableBitacora";
import TableEmpresa from "./TableEmpresa"

export default function SideBarCollapse() {
  const [expanded, setExpanded] = useState(false);
  const [showTable, setShowTable] = useState(null);

  const handleButtonEmpresa = () => {
    setShowTable("empresa");
  };

  const scrollByAmount = async () => {
    const currentScrollPos = await window.pageYOffset || document.documentElement.scrollTop;
  
    window.scrollTo({
      top: currentScrollPos + 900,
      behavior: 'smooth' 
    });
  }

  const handleButtonFacturas = () => {
    setShowTable("facturas");
  };

  const handleButtonBitacora = () => {
    setShowTable("bitacora");
  };



  // useEffect(() => {
  //   function handleResize() {
  //     if (window.innerWidth < 1200) {
  //       setExpanded(false);
  //     } else {
  //       setExpanded(true);
  //     }
  //   }
  //   window.addEventListener('resize', handleResize);
  //   handleResize();
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);


  return (
    <>
      <div className='row '>
        <div className='col-12 col-xl-2 col-lg-12 col-sm-12 '>
          <nav className='navbar navbar-expand-xl navbar-light sidebar-height '>
            <div className=''>
              <button
                className='navbar-toggler my-3 ms-3 text-white '
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded={expanded}
                aria-label='Toggle navigation'
                onClick={() => setExpanded(!expanded)}
              >
                <span className='navbar-toggler-icon text-body-secondary'></span>
              </button>
              <div
                className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
                id='navbarNav'
              >
                <Sidebar
                  handleButtonFacturas={handleButtonFacturas}
                  handleButtonBitacora={handleButtonBitacora}
                  handleButtonEmpresa={handleButtonEmpresa}
                  scrollByAmount={scrollByAmount}
                />
              </div>
            </div>
          </nav>
        </div>
        {showTable === null && <div className="col-12 col-xl-10 col-lg-12 col-sm-12 bg-white mb-4 mt-2"></div> }
        {showTable === "facturas" ? <TableFacturas /> : null}
        {showTable === "bitacora" ? <TableBitacora /> : null}
        {showTable === "empresa" ? <TableEmpresa /> : null}
      </div>
    </>
  );
}
