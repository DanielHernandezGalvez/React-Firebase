import React, { useState } from "react";
import Header from "./Header";
import Accordion from "./Accordion";
import Table from "./Table";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className='col-12 col-lg-3 col-md-12  bg-white sidebar mb-5'>
        <div className='px-4 pt-3 sidebar-bottom'>
          <span id='employee' className='fw-bold fs-5'>
            Daniel Alejandro Hernández Gálvez
          </span>{" "}
          <br />
          <span id='number' className='fw-bold primary-text text-end fs-5'>
            {" "}
            2438
          </span>
          <div className='d-flex  mx-center'>
            <i className='bi bi-clock fs-3 my-auto'></i>
            <h6 className='fw-bold ps-3 my-auto'>Bitácora</h6>
          </div>
        </div>
        <Accordion />
      </div>
    </>
  );
}
