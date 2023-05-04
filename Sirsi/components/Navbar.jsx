import React from "react";
import Image from "next/image";
import Logo from "../utils/Logo.png"
export default function Navbar() {
  return (
    <>
      <nav className=' bg-body-tertiary navbar bg-white shadow-sm shadow-navbar'>
        <div className='container-fluid d-flex justify-content-start'>
            <span className="p-2 ">
          <Image
            src={Logo}
            alt='Sirsi web Núcleo de Diagnóstico'
            width={110}
            height={30}
          />
          </span>
        </div>
      </nav>
    </>
  );
}
