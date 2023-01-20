import HeaderND from "../components/headerND.jsx"
import styles from "../styles/home.module.css"
import NavHome from "../components/navHome"
import { useState } from "react"
import SamplesLote from "../components/samplesLote.jsx"
import axios from "axios"

const home = () => {

  const [lote, setLote] = useState("");
  const [isValid, setIsValid] = useState(false);
  
  var raw = "{\r\n    \"lote\": \"23FE011701\"\r\n}";

  var requestOptions = {
    method: 'GET',
    body: raw,
    redirect: 'follow'
  };

  const response = require("./api/fakeapi.json")

  console.log(response.data.lotedescripcion)
  
  // fetch("http://192.168.0.46:8081/trace/web/findLote", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));

  const handleSubmit = (event) => {
    event.preventDefault();

    if(lote === response.data.lotedescripcion){
      setIsValid(true)
      console.log("lote correcto")
    } else {
      console.log("lote incorrecto")
    }
  }

  const handleChange = (e) => {
    setLote(e.target.value)
  }

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
            <form onSubmit={handleSubmit} className="pt-xl-4 fLogin"> 
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className={`${styles.inputLote} form-control`} 
                  id="floatingInput" 
                  placeholder="No. de lote"
                  value={lote}
                  autoComplete="off"
                  onChange={handleChange}
                />
                  <label for="floatingInput">Numero de Lote</label>
            </div>
              <div className={styles.btnLote}>
                <button 
                  className="btn btn-primary btn-lg mb-5" 
                  type="submit">Enviar</button>
              </div>
            </form>
          </div>
          
        </div>
          {isValid && <SamplesLote /> }
      </div>
    </>
  )
}

export default home
