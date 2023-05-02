import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Table from "./Table";

export default function SideBarCollapse() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className='row'>
        <div className='col'>
          <nav className='navbar navbar-expand-md navbar-light bg-white '>
            <div className='container-fluid'>
              <button
                className='navbar-toggler my-3'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded={expanded}
                aria-label='Toggle navigation'
                onClick={() => setExpanded(!expanded)}
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <div
                className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
                id='navbarNav'
              >
                <Sidebar />
              </div>
            </div>
          </nav>
        </div>
        <Table />
      </div>
    </>
  );
}
