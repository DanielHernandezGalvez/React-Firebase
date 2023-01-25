import React from "react";
export default function Detalles({ children, estado, cambiarEstado }) {
  return (
    <>
      {estado && (
        <div className='detalleOverlay'>
          <div className='contenedorModal'>
            
            <button
              className='botonCerrarModal'
              onClick={() => cambiarEstado(false)}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
