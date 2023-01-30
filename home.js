import HeaderND from "../../components/headerND.jsx";
import styles from "../../styles/home.module.css";
import NavHome from "../../components/navHome";
import { useEffect, useState, useRef } from "react";
import SamplesLote from "../../components/samplesLote.jsx";

const api_route =
  process.env.API_ROUTE || "https://dental.nucleodediagnostico.mx";

const Home = ({ requestOptions }) => {
  const [lote, setLote] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({});

  const getDataLote = async (id) => {
    try {
      let url =
        api_route +
        "/trace/web/findLote" +
        `?Descripcion=${document.getElementById(id).value}`;

      let data = await fetch(url, requestOptions).then();
      data = (await data.json()).data;
      console.log(data);
      setData(data);
      document.getElementById('loteInput').value = ""
    } catch (error) {
      console.log(error);
    }
  };

  const inputRef = useRef(null);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      inputRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    if (lote === data.lotedescripcion) {
      setIsValid(true);
      console.log("lote correcto");
    } else {
      console.log("lote incorrecto");
    }
  };

  const handleChange = (e) => {
    setLote(e.target.value);
  };

  return (
    <>
      <HeaderND title="Recepción de Muestras" />
      <NavHome />
      <div className={styles.box}>
        <div className={styles.contenedor}>
          <div className={styles.img}>
            <div className={styles.caja2}>
          <h1 className={styles.title}>Recepción de muestras</h1>
          <h3 className={styles.title2}><b>Ingresar un Lote</b></h3>
          <div className="container">
            <div className="pt-xl-4 fLogin">
              <div className="input-group shadow">
                <div className="form-floating">
                  <input
                    type="text"
                    onKeyPress={handleKeyPress}
                    className={`${styles.inputLote} form-control shadow-sm`}
                    id="loteInput"
                    placeholder="No. de lote"
                    autoComplete="off" 
                    name="lote"
                    autoFocus
                  />
                  <label htmlFor="lote">Numero de Lote</label>
                </div>
                <button
                  className="btn btn-primary shadow-sm"
                  ref={inputRef}
                  onClick={() => {
                    getDataLote("loteInput"), handleSubmit();
                  }}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
          </div>
          </div>

          <SamplesLote data={data} isValid={isValid} req={requestOptions} />
        </div>
      </div>
    </>
  );
};

Home.getInitialProps = async ({ req, res }) => {
  if (req) {
    var requestOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: req.headers.cookie,
        'Content-Type': 'application/json'
      },
    };

    return {
      requestOptions,
    };
  } else return {};
};

export default Home;
