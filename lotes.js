import HeaderND from "../../components/headerND";
import NavHome from "../../components/navHome";
import styles from "../../styles/lotes.module.css";
import { useState } from "react";
import Detalle from "../../components/detalle";

const api_route =
  process.env.API_ROUTE || "https://dental.nucleodediagnostico.mx";

const Lotes = ({ requestOptions }) => {
  const [data, setData] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [loteDetalle, setLoteDetalle] = useState({});
  const [sactivar, setActivar] = useState(false);

  const getDataLotes = async () => {
    setFechaSeleccionada(document.getElementById("fecha").value);

    let ts = new Date(document.getElementById("fecha").value);
    ts = ts.setHours(ts.getHours() + 6);
    try {
      let url = api_route + "/trace/web/findLotes";
      let fechaUnix = Math.floor(
        new Date(document.getElementById("fecha").value).getTime() / 1000
      );
      if (fechaUnix) {
        url += `?d=${fechaUnix}`;
      }

      let res = await fetch(url, requestOptions).then();
      if (res.status === 200) {
        let data = (await res.json()).data;
        setData(data);
      } else {
        alert(await res.text());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataLote = async (e, lote) => {
    try {
      let url = api_route + "/trace/web/findLote" + `?Descripcion=${lote}`;

      let data = await fetch(url, requestOptions).then();
      data = (await data.json()).data;
      console.log(data);
      setLoteDetalle(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <HeaderND title="Recepción de Muestras" />
      <NavHome />

      <div className={styles.bgImg}>
        <div className={styles.caja}>
          <div className="row p-0">
            <div className="col-12">
              <h3 className={styles.titulo2}>Lotes</h3>
            </div>
            <div className="col-12">
              <h4 className={styles.title3}>
                <b>Filtrar por fecha</b>
              </h4>
            </div>
            <div className="col-12">
              <div className="input-group justify-content-center">
                <input className={styles.inputLote} type="date" id="fecha" />
                <button
                  className={`btn btn-primary ${styles.inputLote}`}
                  onClick={() => getDataLotes()}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion" id="acordeon_lotes">
        {data.map((lote, index) => {
          return (
            <div key={index} className="accordion-item">
              <div className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#" + lote.lotedescripcion}
                  aria-expanded="false"
                  aria-controls={lote.lotedescripcion}
                  onClick={(e) => getDataLote(e, lote.lotedescripcion)}
                >
                  <span className="h3 m-0">
                    Lote: {lote.lotedescripcion}
                    {lote.loteactivo === true ? (
                      <p className={styles.activo + " m-0"}>Activo</p>
                    ) : (
                      <p className={styles.inactivo + " m-0"}>Inactivo</p>
                    )}
                    {lote.loteestatus === 5 ? (
                      <p className="text-primary m-0">
                        En traslado a laboratorio
                      </p>
                    ) : (
                      <p className="text-secondary m-0">
                        En laboratorio
                      </p>
                    )}
                    {lote.loteestatus !== 5 && lote.loteestatus !== 6 && (
                      <p className="text-danger m-0">
                        Estatus indefinido
                      </p>
                    )}
                    <h6 className="m-0">Fecha: {lote.lotefecha}</h6>
                  </span>
                </button>
              </div>
              <div
                className="accordion-collapse collapse"
                id={lote.lotedescripcion}
                data-bs-parent="#acordeon_lotes"
              >
                <div className="accordion-body">
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

Lotes.getInitialProps = async ({ req, res }) => {
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

export default Lotes;
