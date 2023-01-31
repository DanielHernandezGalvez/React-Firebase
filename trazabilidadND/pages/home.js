//El componente muestra una página de inicio para la recepción de muestras
import HeaderND from "../../components/headerND.jsx";
import styles from "../../styles/home.module.css";
import NavHome from "../../components/navHome";
import { useState, useRef } from "react";
import SamplesLote from "../../components/samplesLote.jsx";

// Establece la variable que se usará como ruta
const api_route =
  process.env.API_ROUTE || "https://dental.nucleodediagnostico.mx";

const Home = ({ requestOptions }) => {
  const [lote, setLote] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({});

  // Toma un parametro id para identificar el elemento del documento desde la url
  const getDataLote = async (id) => {
    console.log("cookies", document.getElementById('cookies'))
    try {
      /* Crea una URL para una solicitud concatenando una ruta base de la API 
  con una ruta específica para encontrar un lote, y agregarle un "id" */
      let url =
        api_route +
        "/trace/web/findLote" +
        `?Descripcion=${document.getElementById(id).value}`;
      let data = await fetch(url, requestOptions).then();
      data = (await data.json()).data;
      console.log(data);
      setData(data);
      document.getElementById("loteInput").value = "";
    } catch (error) {
      console.log(error);
    }
  };

  

  // Este código asigna la función que se activa al presionar la tecla enter
  const inputRef = useRef(null);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      inputRef.current.click();
    }
  };

  /* Este código se encarga de verificar si una variable "lote" es igual a un valor 
  específico en el objeto "data"*/
  const handleSubmit = (e) => {
    if (lote === data.lotedescripcion) {
      setIsValid(true);
      console.log("lote correcto");
    } else {
      console.log("lote incorrecto");
    }
  };

  // Setea el valor que se compara al del elemento de entrada
  const handleChange = (e) => {
    setLote(e.target.value);
  };

  return (
    <>
      <HeaderND title='Recepción de Muestras' />
      <NavHome />
      <div className={styles.box}>
        <div className={styles.contenedor}>
          <div className={styles.img}>
            <div className={styles.caja2}>
              <h1 className={styles.title}>Recepción de muestras</h1>
              <h3 className={styles.title2}>
                <b>Ingresar un Lote</b>
              </h3>
              <div className='container'>
                <div className='pt-xl-4 fLogin'>
                  <div className='input-group shadow'>
                    <div className='form-floating'>
                      {/* El evento onKeyPress del input está asociado a la función 
                handleKeyPress, que se encarga de detectar si se presiona la tecla 
                "Enter" y hacer clic en el botón de búsqueda */}
                      <input
                        type='text'
                        onKeyPress={handleKeyPress}
                        className={`${styles.inputLote} form-control shadow-sm`}
                        id='loteInput'
                        placeholder='No. de lote'
                        autoComplete='off'
                        name='lote'
                        autoFocus
                      />
                      <label htmlFor='lote'>Numero de Lote</label>
                    </div>
                    {/* La función getDataLote toma el valor del input y hace una 
                solicitud a una API para obtener los datos del lote correspondiente */}
                    <button
                      className='btn btn-primary shadow-sm'
                      ref={inputRef}
                      onClick={() => {
                        getDataLote("loteInput"), handleSubmit();
                      }}
                    >
                      {/* función handleSubmit valida si el lote ingresado es válido 
                  comparándolo con los datos devueltos por la API. */}
                      <i className='bi bi-search'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* se renderiza un componente SamplesLote, que muestra los datos del
           lote y su estado de validación */}
          <SamplesLote data={data} isValid={isValid} req={requestOptions} />
        </div>
      </div>
    </>
  );
};

// La función se ejecuta en el servidor y en el cliente cuando se accede a la página Home.
Home.getInitialProps = async ({ req, res }) => {
  // Obtiene las cookies del encabezado de la petición HTTP y las almacena en variables
  if (req) {
    let cookieSplit = req.headers.cookie.split(";");
    let user = "";
    let _token;
    console.log(req.headers);
    cookieSplit.forEach((cookie) => {
      if (cookie.trim().startsWith("l=")) {
        user = `${cookie.replace("l=", "")}`;
      } else if (cookie.trim().startsWith("Token=")) {
        _token = cookie;
      }
    });
    // Crea un objeto de opciones de solicitud para enviar en una solicitud HTTP posterior
    let requestOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: _token, //Token
      },
    };
    // Finalmente, la función devuelve un objeto que incluye las opciones de solicitud y el usuario como valores
    return {
      requestOptions,
      user,
    };
  } else return {};
};

export default Home;
