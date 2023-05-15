import React from "react";
// import Image from "next/image";
// import imanen1 from "../../utils/muestras.jpg";
// import imanen2 from "../../utils/tomas.jpg";
// import lotes from "../../utils/tomas2.jpg";
// import traza from "../../utils/tomas3.jpg";
// import logo from "../../utils/ND.png"


export default function LoginView() {
  return (
    <div className='fondo-suite'>
      <nav className='navbar bg-body-tertiary bg-white shadow-sm'>
        <div className='container-fluid'>
          {/* <Image src={logo} width={100} height={60}/> */}
          <div></div>
        </div>
      </nav>

      <div className='cartas mt-5'>
        <div id='card-container' className='m-4'>
          {/* <Image src={imanen1} width={300} height={190} /> */}
          <h4>Recepción de Muestras</h4>
        </div>

        <div id='card-container' className='m-4'>
          {/* <Image src={imanen2} width={300} height={190} /> */}
          <h4>Monitor de Tomas</h4>
        </div>

        <div id='card-container' className='m-4'>
          {/* <Image src={lotes} width={300} height={190} /> */}
          <h4>Lotes</h4>
        </div>

        <div id='card-container' className='m-4'>
          {/* <Image src={traza} width={300} height={190} /> */}
          <h4>Trazabilidad</h4>
        </div>
      </div>
    </div>
  );
}
