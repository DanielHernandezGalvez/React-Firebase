// Este código es un componente de React que muestra un formulario para actualizar un lote de productos
import React from "react";
import styles from "../styles/home.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";

/* La API a la que se hace la petición se especifica en la variable api_route, 
 que es establecida a "https://dental.nucleodediagnostico.mx" o a una ruta
 especificada en las variables de entorno */
const api_route =
  process.env.API_ROUTE || "https://dental.nucleodediagnostico.mx";

export default function SamplesLote({ data, isValid, req }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productos, setProductos] = useState();

  /* incrementa el valor de la cantidad de un producto en 1. 
  Recibe un parámetro i que representa el índice del producto en la lista de productos*/
  function increment(i) {
    let e = document.getElementById("producto" + i + ".productocantidad");
    let value = parseInt(e.value) + 1;
    e.value = value;
  }

  /*decrementa el valor de la cantidad de un producto en 1. Recibe un parámetro i que
  representa el índice del producto en la lista de*/ 
  function decrement(i) {
    let e = document.getElementById("producto" + i + ".productocantidad");
    let value = parseInt(e.value) - 1;
    if (value < 0) {
      alert("No puede ser menor a cero");
    } else e.value = value;
  }

  //Recarga la página actual.
  const reloading = () => {
    location.reload(true);
  };

  /*Manejador de eventos para el envío del formulario. Recibe un parámetro event, 
  que representa el evento del submit del formulario */
  const handleSubmit = async (event) => {
    // Se ejecuta una acción para prevenir el comportamiento por defecto de submit del formulario 
    event.preventDefault(); 
    //luego se crea un objeto row con los valores necesarios para la petición a la API
    let row = {     
      lotedescripcion: data.lotedescripcion,
      usernomina: "",
      productos: [],
    };
   // se rellenan los datos de la petición req y se realiza una petición fetch a la API.
    for (let i = 0; i < data.productos.length; i++) {
      let productoI = {
        productoclave: event.target["producto" + i + ".productoclave"].value,
        productocantidad:
          parseInt(event.target["producto" + i + ".productocantidad"].value),
      };
      row.productos.push(productoI);
    }
    req.body = JSON.stringify(row);
    req.method = "POST"
    console.log(req)
    await fetch(api_route + "/trace/web/updLote", req)
      .then(async (response) => {
        console.log(await response.text().then());
    // Si la respuesta es satisfactoria, se muestra una alerta de éxito y se recarga la página
        if (response.status === 200) {
        }
      })
    //En caso de error, se muestra en la consola
      .catch((error) => console.log("error", error));
    // Sedespliega una alerta en caso de éxito al enviar  
      Swal.fire({
            title: "Enviado Correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
            timer: 2000,
            confirmButtonColor: "rgb(13, 110, 253)",
          });
          setTimeout(reloading, 2000);
  };

  return (
    <>
    {/* Se asegura que solo se renderiza el componente si la propiedad lotedescripcion existe. */}
      {data.lotedescripcion && (
        <div className={styles.boxSamples}>
          <h2 className={styles.title4}>
            <span className={styles.spanTitle}>Lote: </span>             
            <span id='lotedescripcion'>{data.lotedescripcion}</span>     
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='container mx-auto'>
              <p>Fecha: {data.lotefecha}</p>
    {/* determina si el lote está activo o no y muestra un mensaje correspondiente. */}
              {data.loteactivo === true ? (
                <h2 className={styles.activo}>Activo</h2>
              ) : (
                <h2 className={styles.inactivo}>Inactivo</h2>
              )}
    {/* determina el estatus del lote y muestra un mensaje correspondiente. 
    Si el estatus no es 5 ni 6, se muestra un mensaje de estatus indefinido. */}
              {data.loteestatus === 5 ? (
                <h3 className={styles.estatus + " text-primary"}>
                  En traslado a laboratorio
                </h3>
              ) : (
                <h3 className={styles.estatus + " text-secondary"}>
                  En laboratorio
                </h3>
              )}
              {data.loteestatus !== 5 && data.loteestatus !== 6 && (
                <h3 className={styles.estatus + " text-danger"}>
                  Estatus indefinido
                </h3>
              )}
              <hr />
    {/* Se renderiza una lista de productos asociados al lote: Clave, Descripción Cantidad e Imagen */}
              {data.productos.map((producto, index) => {
                return (
                  <div className={styles.fila} key={index}>
                    <div className={styles.box2}>
                      <div className={styles.box3}>
                        <input
                          className={styles.inputLoteForm}
                          value={producto.productoclave}
                          type='text'
                          id={"producto" + index + ".productoclave"}
                          name={"producto" + index + ".productoclave"}
                          readOnly
                        />
                        <h5 className={styles.h5}>
                          {producto.productodescripcion}
                        </h5>
                      </div>
                      <div>
                        <div className={styles.countContainer}>
      {/* Se incluyen dos botones de incremento y decremento de la cantidad de cada producto,  
      que están habilitados solo si el lote está activo y su estatus es 5.*/}
                          <button
                            onClick={() => decrement(index)}
                            className={styles.buttonRestar}
                            type='button'
                            disabled={
                              data.loteactivo !== true || data.loteestatus !== 5
                            }
                          >
                            {" "}
                            -{" "}
                          </button>
                          <input
                            className={styles.inputNumber}
                            type='number'
                            id={"producto" + index + ".productocantidad"}
                            name={"producto" + index + ".productocantidad"}
                            min={0}
                            value={producto.productocantidad}
                            readOnly
                          />
                          <button
                            onClick={() => increment(index)}
                            className={styles.buttonSumar}
                            type='button'
                            disabled={
                              data.loteactivo !== true || data.loteestatus !== 5
                            }
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      </div>
                      <div className={styles.divPrueba}>
                        <Image
                          src={`/imgProductos/${producto.productoimagen}`}
                          alt='imagen del producto'
                          width={200}
                          height={130}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
      {/* Finalmente, si el lote está activo y su estatus es 5, se muestra un botón para enviar la información */}
            {data.loteactivo === true &&
              (data.loteestatus === 5 ? (
                <div className='container text-center'>
                  <button
                    onClick={() => handleSubmit()}
                    className='btn btn-success btn-lg mb-5 mt-5 mx-2 '
                    type='submit'
                    disabled={
                      data.loteactivo !== true || data.loteestatus !== 5
                    }
                  >
                    Enviar
                  </button>
                  <div className="mb-5 pb-5"></div>
                </div>
              ) : <div className="mb-5 pb-5"></div>  
              )}
          </form>
        </div>
      )}
    </>
  );
}


