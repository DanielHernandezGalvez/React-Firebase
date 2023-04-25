import React from "react";
import Monitor from "../utils/analytics.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className='navbar  opacity-navbar p-1 h-75'>
      <div className='container-fluid d-flex justify-content-start col-3'>
        <span className='ps-3'>
          <Image src={Monitor} width={60} height={50} alt='monitor' />
        </span>
        <h1 className='text-dark sirsi'>SIRSI</h1>
      </div>
      <div className='col-7 d-flex justify-content-around'>
        <input className='form-control me-5 w-75' type='date' />
        <input className='form-control me-5 w-75' type='date' />
        <div class='input-group'>
          <span class='input-group-text btn btn-primary '>
            {" "}
            <i class='bi bi-search text-white'></i>
          </span>
          <input className='form-control w-50 me-5' type='text' />
        </div>
      </div>
      <div className='col-2'></div>
      <div className='col-1'></div>
    </div>
  );
}
