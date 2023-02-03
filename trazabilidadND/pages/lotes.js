//El componente muestra un input tipo fecha para buscar y renderizar los lotes existentes
import HeaderND from "../../components/headerND";
import NavHome from "../../components/navHome";
import styles from "../../styles/lotes.module.css";
import { useState } from "react";
import Detalle from "../../components/detalle";


// Establece la variable que se usará como ruta
const api_route =
  process.env.API_ROUTE || "https://dental.nucleodediagnostico.mx";

const Lotes = ({ requestOptions, user }) => {
  const [data, setData] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [loteDetalle, setLoteDetalle] = useState({});
  const [sactivar, setActivar] = useState(false);

  // Se encarga de cerrar el acordión cada vez que se haga click en otra fecha
  function cambio() {
    let buton = document.querySelector(".accordion-collapse");
    if (data.length > 0 && buton.classList.contains("show")) {
      buton.classList.remove("show");
    }
  }

  /* Esta es una función getDataLotes en JavaScript que hace una petición GET a una 
  URL específica, utilizando fetch y las opciones de la solicitud previamente definidas 
  en requestOptions */
  const getDataLotes = async () => {
    setFechaSeleccionada(document.getElementById("fecha").value);
    let ts = new Date(document.getElementById("fecha").value);
    ts = ts.setHours(ts.getHours() + 6);
    try {
      let url = api_route + "/trace/web/findLotes";
      // Esta es la fecha seleccionada por el usuario en un elemento de entrada de fecha en formato Unix
      let fechaUnix = Math.floor(
        new Date(document.getElementById("fecha").value).getTime() / 1000
      );
      if (fechaUnix) {
        url += `?d=${fechaUnix}`;
      }
      let res = await fetch(url, requestOptions).then();
      // Si la respuesta es 200, se almacenan los datos obtenidos en la respuesta en la variable data
      if (res.status === 200) {
        let data = (await res.json()).data;
        setData(data);
      } else {
      // De lo contrario muestra un mensaje de alerta con el contenido de la respuesta.
        alert(await res.text());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Se encarga de hacer una petición a una API y obtener los detalles de un lote específico
  const getDataLote = async (e, lote) => {
    try {
      /* La URL de la API se construye concatenando api_route + "/trace/web/findLote" con un parámetro
      adicional ?Descripcion=${lote} que representa el número de lote */
      let url = api_route + "/trace/web/findLote" + `?Descripcion=${lote}`;
      let data = await fetch(url, requestOptions).then();
      data = (await data.json()).data;
      console.log(data);
      // Si la petición tiene éxito, se actualiza el estado loteDetalle
      setLoteDetalle(data);
    } catch (error) {
      // En caso de no tener éxito se imprime el error en consola
      console.log(error);
    }
  };
  return (
    <>
      <HeaderND title='Recepción de Muestras' />
      <NavHome />
      <div className={styles.bgImg}>
        <div className={styles.caja}>
          <div className='row p-0'>
            <div className='col-12'>
              <h3 className={styles.titulo2}>Lotes</h3>
            </div>
            <div className='col-12'>
              <h4 className={styles.title3}>
                <b>Filtrar por fecha</b>
              </h4>
            </div>
            <div className='col-12'>
              <div className='input-group justify-content-center'>
                <input
                  className={styles.inputLote}
                  type='date'
                  id='fecha'
                />
                {/* Al hacer clic en el botón, se llama a la función getDataLotes y a la función cambio */}
                <button
                  className={`btn btn-primary ${styles.inputLote}`}
                  onClick={() => {
                    getDataLotes();
                    cambio();
                  }}
                >
                  <i className='bi bi-search'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* La sección de detalles de los lotes utiliza un acordeón de Bootstrap para mostrar los detalles de cada lote */}
      <div className='accordion' id='acordeon_lotes'>
        {data.map((lote, index) => {
          // Se muestra información sobre el estatus del lote, la fecha y la descripción
          return (
            <div key={index} className='accordion-item'>
              <div className='accordion-header'>
              {/* Al hacer clic en un elemento del acordeón, se llama a la función getDataLote y se pasa la 
              descripción del lote como argumento */}
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={"#" + lote.lotedescripcion}
                  aria-expanded='false'
                  aria-controls={lote.lotedescripcion}
                  onClick={(e) => getDataLote(e, lote.lotedescripcion)}
                >
                  {/* Si el lote está activo o no, se le asignarán clases correspondientes */}
                  <span className='h3 m-0'>
                    Lote: {lote.lotedescripcion}
                    {lote.loteactivo === true ? (
                      <p className={styles.activo + " m-0"}>Activo</p>
                    ) : (
                      <p className={styles.inactivo + " m-0"}>Inactivo</p>
                    )}
                  {/* En caso de que tenga estatus 5, 6 o indefinido, también se cambiará la 
                  clase y afectará el funcionamiento de los botones */}
                    {lote.loteestatus === 5 && (
                      <p className='text-primary m-0'>
                        En traslado a laboratorio
                      </p>
                    )}
                    {lote.loteestatus === 6 && (
                      <p className='text-primary m-0'>En laboratorio</p>
                    )}
                    {lote.loteestatus !== 5 && lote.loteestatus !== 6 && (
                      <p className='text-danger m-0'>Estatus indefinido</p>
                    )}
                    <h6 className='m-0'>Fecha: {lote.lotefecha}</h6>
                  </span>
                </button>
              </div>
              <div
                className='accordion-collapse collapse'
                id={lote.lotedescripcion}
                data-bs-parent='#acordeon_lotes'
              >
                <div className='accordion-body'>
                  {/* Finalmente se renderiza el componente con los detalles del lote y sus respectivos productos */}
                  <Detalle id={lote.lotedescripcion} lote={loteDetalle} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// Es una función estática que se ejecuta en el lado del servidor y se usa para inicializar los props en la página
Lotes.getInitialProps = async ({ req, res }) => {
  // La función toma como parámetro un objeto { req, res } que contiene la información de la solicitud y la 
  // respuesta del servidor. Si el objeto req existe, significa que se está ejecutando en el lado del servidor.
  if (req) {
    let cookieSplit = req.headers.cookie.split(";");
    let user = "";
    let _token;
  // recupera el nombre de usuario y el token de autenticación del usuario desde las cookies en la cabecera de la solicitud req. 
    cookieSplit.forEach((cookie) => {
      if (cookie.trim().startsWith("l=")) {
        user = `${cookie.replace("l=", "")}`;
      } else if (cookie.trim().startsWith("Token=")) {
        _token = cookie;
      }
    });
    // crea un objeto de opciones de solicitud para hacer una petición GET con credenciales incluidas y el token de autenticación.
    let requestOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: _token, //Token
      },
    };
    // Finalmente, se devuelve un objeto con las opciones de solicitud y el nombre de usuario
    return {
      requestOptions,
      user,
    };
  } else return {};
};

export default Lotes;
