import React from "react";
import styles from "../styles/home.module.css";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import Image from "next/image";

const api_route =
  process.env.API_ROUTE || "https://dental.nucleodediagnostico.mx";

export default function SamplesLote({ data, isValid, req }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productos, setProductos] = useState();

  function increment(i) {
    let e = document.getElementById("producto" + i + ".productocantidad");
    let value = parseInt(e.value) + 1;
    e.value = value;
  }

  function decrement(i) {
    let e = document.getElementById("producto" + i + ".productocantidad");
    let value = parseInt(e.value) - 1;
    if (value < 0) {
      alert("No puede ser menor a cero");
    } else e.value = value;
  }

  const reloading = () => {
    location.reload(true);
  };

  // function handleSubmit() {
  //   if (data.productos) {
  //     // setProductos(data.productos)
  //     let selected = [];
  //     data.productos.forEach((producto) => {
  //       selected.push({
  //         clave: producto.productoclave,
  //         cantidad: producto.productocantidad,
  //       });
  //     });
  //   }

  //   setSelectedProducts(selected);
  //   console.log("Selected products: ", selected);

  //   Swal.fire({
  //     title: "Enviado Correctamente",
  //     icon: "success",
  //     confirmButtonText: "Aceptar",
  //     timer: 2000,
  //     confirmButtonColor: "rgb(13, 110, 253)",
  //   });
  //   setTimeout(reloading, 2000);
  // }

  // if (data.productos) setProductos(data.productos);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let row = {
      lotedescripcion: data.lotedescripcion,
      usernomina: 1845,
      productos: [],
    };

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
        if (response.status === 200) {
        }
      })
      .catch((error) => console.log("error", error));

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
      {data.lotedescripcion && (
        <div className={styles.boxSamples}>
          <h2 className={styles.title4}>
            <span className={styles.spanTitle}>Lote: </span>
            <span id='lotedescripcion'>{data.lotedescripcion}</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='container mx-auto'>
              <p>Fecha: {data.lotefecha}</p>
              {data.loteactivo === true ? (
                <h2 className={styles.activo}>Activo</h2>
              ) : (
                <h2 className={styles.inactivo}>Inactivo</h2>
              )}
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
            {data.loteactivo === true &&
              (data.loteestatus === 5 ? (
                <div className='container text-center'>
                  <button
                    // onClick={() => handleSubmit()}
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
                
              ) :             <div className="mb-5 pb-5"></div>
              )}
          </form>
        </div>
      )}
    </>
  );
}



