import React from "react";
import Header from "./Header";
import Accordion from "./Accordion";

export default function Sidebar() {
  return (
    <>
      <Header />
      <div className='col-2 border-end sidebar'>
        <div className="px-4 py-3">
          <span id='employee' className='fw-bold fs-5'>
            Daniel Alejandro Hernández Gálvez
          </span> <br/>
          <span id='number' className='fw-bold primary-text text-end fs-5'>
            {" "}
            2438
          </span>
        </div>
        <Accordion />
      </div>
    </>
  );
}
