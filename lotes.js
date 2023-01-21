import HeaderND from "../components/headerND";
import NavHome from "../components/navHome";
import styles from "../styles/lotes.module.css";
import { useState, useEffect } from "react";

const lotes = () => {
  const response = require("./api/fakeApiLotes.json");

  const data = response.data;

  data.sort(function (a, b) {
    var dateA = new Date(a.lotefecha),
      dateB = new Date(b.lotefecha);
    return dateB - dateA;
  });
  console.log(data);

  return (
    <>
      <HeaderND title='Recepción de Muestras' />
      <NavHome />
      <div className={styles.bgImg}></div>
      <h1 className={styles.titulo}>Lotes</h1>
      {data.map((producto, index) => {
        return (
          <div className='container' key={index}>
            <hr />
            <h5>{producto.lotefecha}</h5>
            <h2 className={styles.title}>{producto.lotedescripcion}</h2>
            {producto.loteactivo === true ? (
              <h3 className={styles.activo}>Activo</h3>
            ) : (
              <h3 className={styles.inactivo}>Inactivo</h3>
            )}
          </div>
        );
      })}
      <div className={styles.footer}></div>
    </>
  );
};

export default lotes;
