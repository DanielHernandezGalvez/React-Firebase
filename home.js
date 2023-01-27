import HeaderND from "../../components/headerND.jsx";
import styles from "../../styles/home.module.css";
import NavHome from "../../components/navHome";
import { useEffect, useState } from "react";
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
    } catch (error) {
      console.log(error);
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
          <div className={styles.img}></div>
          <h1 className={styles.title}>Recepción de muestras</h1>
          <h2 className={styles.title2}>Ingresar un Lote</h2>
          <div className="container">
            <div className="pt-xl-4 fLogin">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`${styles.inputLote} form-control`}
                  id="loteInput"
                  placeholder="No. de lote"
                  autoComplete="on" ////////////////////////cambiar a off /////////////////////////////
                  name="lote"
                />
                <label htmlFor="lote">Numero de Lote</label>
              </div>
              <div className={styles.btnLote}>
                <button
                  className="btn btn-primary btn-lg mb-5"
                  onClick={() => {
                    getDataLote("loteInput"), handleSubmit();
                  }}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
          <SamplesLote data={data} isValid={isValid} />
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
      },
    };

    return {
      requestOptions,
    };
  } else return {};
};

export default Home;
