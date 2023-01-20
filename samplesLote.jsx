import React from 'react'
import styles from "../styles/home.module.css"
import { useState, useEffect } from 'react'

export default function samplesLote() {
 
  const response = require("../pages/api/fakeapi.json")
  ///////////////////////// sumar elementos//////////////////////////
  ////////////////cantidad a partir de cero ////////////////

  const [total, setTotal] = useState(0)
  const [selectedProducts, setSelectedProducts] = useState([])
  
  useEffect(() => {
    let total = 0
    response.data.productos.forEach(producto => {
      total += producto.productocantidad
    })
    setTotal(total)
  }, [response.data.productos])
  
  function handleSubmit() {
    console.log("Total: ", total)
    let selected = []
    response.data.productos.forEach(producto => {
      selected.push({clave: producto.clave, count: producto.productocantidad})
    })
    setSelectedProducts(selected)
    console.log("Selected products: ", selected)
  }
////////////////////////////////////////////////////////////////////////

  return (
    <div className={`${styles.boxSamples} ${styles.contenedor}`}>
      
      <h2 className={styles.title4}><span className={styles.spanTitle}>Lote: </span>{response.data.lotedescripcion}</h2>
       <div className='container mx-3'>
        <p>Fecha: {response.data.lotefecha}</p>
        {response.data.loteactivo === true ?
         <h3 className={styles.activo}>Activo</h3> : 
         <h3 className={styles.inactivo}>Inactivo</h3>}  

      {response.data.productos.map((producto, index) => {  
          const [count, setCount] = useState(producto.productocantidad)

          function sumar() {
            setCount(count + 1);
          }

          function restar() {
            if (count > 0) {
              setCount(count - 1);
            }
          }
          return ( 
            <div key={index}>
                <hr/>
              <div className={styles.box2}>
                <div className="container-fluid my-auto mx-auto">
                    <h4>{producto.productoclave}</h4>
                    <h5>{producto.productodescripcion}</h5>
                </div>
                <div className='container-fluid my-auto px-0'>
                  <button className={styles.sumarRestar} onClick={restar}>-</button>
                    <span className={styles.contador}>{count}</span>
                  <button className={styles.sumarRestar} onClick={sumar}>+</button>
                </div>
                <div className="container-fluid my-auto mx-auto">
                  <img src={producto.productoimagen} alt="img" />
                  </div>
              </div>
            </div>
           )
        })}
    </div>
        <div className="container ">
          <hr/>
            <button onClick={() => handleSubmit()}
            className="btn btn-success btn-lg mb-5 mt-5 mx-2" 
            type="submit"
            >Enviar</button>
        </div>
  </div>
  )
}


