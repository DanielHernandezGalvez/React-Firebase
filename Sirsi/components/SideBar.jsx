import React, { useState } from "react";
import Accordion from "./Accordion";

export default function Sidebar(props) {
  return (
    <>
      <div className=' pt-4 pb-5 me-1  '>
        <div className='px-4 pt-3 sidebarsidebar-height'>
          <span id='employee' className='fw-bold fs-6 text-white sidebarTitle'>
            Daniel Alejandro Hernández Gálvez
          </span>{" "}
          <br />
          <span id='number' className='fw-bold primary-text text-end  fs-6'>
            {" "}
            2438
          </span>
          <div className='d-flex mx-center pb-2 pt-5'>
            <i className='bi bi-clock fs-4 my-auto'></i>
           <button className="btn" onClick={() => { props.handleButtonBitacora(); props.scrollByAmount(); }}> <span className='fw-bold ps-3 text-white pe-3 my-auto fs-6'>Bitácora</span></button>
          </div>
        </div>
        <Accordion
          handleButtonFacturas={props.handleButtonFacturas}
          handleButtonEmpresa={props.handleButtonEmpresa}
          scrollByAmount={props.scrollByAmount}
        />
      </div>
    </>
  );
}
