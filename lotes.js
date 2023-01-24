import HeaderND from "../../components/headerND";
import NavHome from "../../components/navHome";
import styles from "../../styles/lotes.module.css";
import { useState } from "react";
import Detalle from "../../components/detalle";

const Lotes = () => {
  const response = require("../api/fakeApiLotes.json");
  const data = response.data;
  const [estadoModal, setEstadoModal] = useState(
    Array(data.length).fill(false)
  );

  data.sort(function (a, b) {
    var dateA = new Date(a.lotefecha),
      dateB = new Date(b.lotefecha);
    return dateB - dateA;
  });

  return (
    <>
      <HeaderND title='Recepción de Muestras' />
      <NavHome />
      <div className={styles.bgImg}></div>
      <h1 className={styles.titulo}>Lotes</h1>
      <hr />
      {data.map((producto, index) => {
        return (
          <div key={index}>
            <div className='contenedorLista'>
              <button
                className='botonloteLista'
                onClick={() => {
                  let newEstadoModal = [...estadoModal];
                  newEstadoModal[index] = !newEstadoModal[index];
                  setEstadoModal(newEstadoModal);
                }}
              >
                <h1>{producto.lotedescripcion}</h1>
                <h3>{producto.lotefecha}</h3>
              </button>
            </div>
            <Detalle
              estado={estadoModal[index]}
              cambiarEstado={() => {
                let newEstadoModal = [...estadoModal];
                newEstadoModal[index] = !newEstadoModal[index];
                setEstadoModal(newEstadoModal);
              }}
              producto={producto}
            >
              <div className='contenidoModal'>
                <h1 className={styles.title}>
                  Lote: {producto.lotedescripcion}
                </h1>
                <h5>fecha: {producto.lotefecha}</h5>

                {producto.loteactivo === true ? (
                  <h2 className={styles.activo}>Activo</h2>
                ) : (
                  <h2 className={styles.inactivo}>Inactivo</h2>
                )}

                <p>Feca de inicio: {producto.lotefechainicio}</p>
                <p>Feca de cierre: {producto.lotefechhacierre}</p>

                <h3 className={styles.title}>Productos:</h3>
                {producto.productos.map((producto, index) => {
                  return (
                    <>
                      <div key={index}>
                        <hr />
                        <p>Clave: <b>{producto.productoclave}</b></p>
                        <p>{producto.productoimagen}</p>
                        <p>Cantidad: <b>{producto.productocantidad}</b></p>
                        <p>Descripción: <b>{producto.productodescripcion}</b></p>
                      </div>
                    </>
                  );
                })}
              </div>
            </Detalle>
          </div>
        );
      })}
      <div className='pb-5 mb-5'>
        <div className='pb-5 mb-5'>
          <div className='pb-5 mb-5'></div>
        </div>
      </div>
    </>
  );
};

export default Lotes;


