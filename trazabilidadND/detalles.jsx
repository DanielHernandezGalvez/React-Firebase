import styles from "../styles/lotes.module.css";

import React from "react";

export default function Detalles({ id, lote }) {
  return (
    <>
      {lote.lotedescripcion && (
        <div className="contenidoModal">
          <h3 className={styles.title}>Lote: {lote.lotedescripcion}</h3>
          <p>Fecha de inicio: {lote.lotefechainicio}</p>
          <p>Fecha de cierre: {lote.lotefechhacierre}</p>

          <h3 className={styles.title}>Productos:</h3>

          {lote.productos &&
            lote.productos.map((producto, index) => {
              return (
                <div
                  key={producto.productoclave}
                  className="container d-flex flex-column"
                >
                  <hr className="w-75 mx-auto" />
                  <p>
                    Clave: <b>{producto.productoclave} </b>
                  </p>
                  <p>{producto.productoimagen}</p>
                 
                  {producto.productocantidad !== producto.productocantidadrecibido ? 
                  <p>
                    Cantidad Recibida: <b className="text-danger">{producto.productocantidadrecibido}</b>
                  </p>
                  :
                  <p>
                  Cantidad Recibida: <b>{producto.productocantidadrecibido}</b>
                </p>
                  }
                   <p>
                    Cantidad: <b>{producto.productocantidad}</b>
                  </p>
                  <p>
                    Descripción: <b>{producto.productodescripcion}</b>
                  </p>
                </div>
              );
            })}
        </div>
      )}
      <div className="final">
        <button
          className="botonCerrarModal "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + id}
          aria-expanded="false"
          aria-controls={id}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </>
  );
}
