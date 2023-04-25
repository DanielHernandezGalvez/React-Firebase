import React from "react";
import Image from "next/image";
import ND from "../utils/ND.png"

export default function Navbar() {
  return (
    <>
      <nav class=' bg-body-tertiary navbar'>
        <div class='container-fluid'>
            <span className="ps-1">
          <Image
            src={ND}
            alt='Núcleo de Diagnóstico'
            width={150}
            height={80}
          />
          </span>
        </div>
      </nav>
      
    </>
  );
}
