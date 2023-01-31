// Este componente renderiza el formulario de login para inicio de sesión
import login from "../../styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

function Login_cont() {
  /* El estado inicial de la aplicación se define mediante el hook "useState", 
  donde se almacenan las credenciales del usuario (nombre de usuario, contraseña 
    y si la sesión se mantiene activa) */
  const [credentials, setCredentials] = useState({
    user: "",
    password: "",
    sessionhold: false,
  });

  // Actualiza el estado de la sesión cuando el usuario cambia la selección de la casilla de verificación
  const handleCheckboxChange = (event) => {
    setCredentials({
      ...credentials,
      sessionhold: event.target.checked,
    });
  };

  const router = useRouter();

  /* actualiza el estado del nombre de usuario o la contraseña cuando el usuario 
  los cambia en los campos de entrada correspondientes */
  const handleChange = (event) => {
    if (!event) return;
    const property = event.target.name;
    const value = event.target.value;
    setCredentials({
      ...credentials,
      [property]: value,
    });
  };

  // Se ejecuta cuando el usuario envía el formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* Envía una solicitud POST a la dirección URL 
    "https://dental.nucleodediagnostico.mx/common/web/login" con las credenciales del usuario
     en formato JSON */
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      username: parseInt(credentials.user),
      password: credentials.password,
      sessionhold: credentials.sessionhold,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      credentials: "include",
      withCredentials: true,
      body: raw,
    };
    console.log(raw);
    try {
      const res = await fetch(
        "https://dental.nucleodediagnostico.mx/common/web/login",
        requestOptions
      ).then();
      /* Si la respuesta del servidor es 200 (OK), se agrega una cookie con el nombre 
      de usuario y se redirige al usuario a la página de inicio */
      if (res.status === 200) {
        document.cookie = "l=" + parseInt(credentials.user)
        router.push("/home");
      } else alert("Usuario o contraseña incorrectos");
    } catch (error) {
      console.error("error |", error);
    }
  };
  
  return (
    <>
      <div className={login.margin}>
        <div className="row col-xl-6 col-lg-7 col-md-10 mt-5 mx-auto p-0 pt-4">
          <div className={`${login.log} row shadow m-auto p-0 bg-light`}>
            <div
              className={`${login.bgImage} col-lg-6 login-img h-p-30 p-0 none-dark img-fluid`}
            ></div>
            <div
              className={`${login.form} col-lg-6 h-p-70 text-center p-5 my-auto mx-auto`}
            >
              <div>
                <h4 className={`${login.red}  mb-3`}>Iniciar Sesión</h4>
                <div className="container">
                  {/* Se renderiza el formulario que activa las funciones necesarias para el inicio de la sesión */}
                  <form
                    action="/login"
                    method="POST"
                    className="pt-xl-4 fLogin"
                    onSubmit={handleSubmit}
                  >
                    <div className="input-group mb-4">
                      <span className="input-group-text">@</span>
                      <div className="form-floating">
                        <input
                          type="text"
                          name="user"
                          pattern="^[0-9]+$"
                          title="Escribe tu número de nómina."
                          className="form-control"
                          id="userFrom"
                          placeholder="Username"
                          autoComplete="off"
                          autoFocus
                          required
                          onChange={handleChange}
                        />
                        <label htmlFor="userFrom">Usuario</label>
                      </div>
                    </div>
                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="passFrom"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor="passFrom">Contraseña</label>
                    </div>
                    <div className="row mb-4 t-xl">
                      <div className="col-12 d-flex justify-content-center">
                        <div className="form-check">
                          {/* Si se hace valido el checkbox la sesión se mantiene iniciada */}
                          <input
                            name="sessionhold"
                            className="form-check-input"
                            type="checkbox"
                            value="true"
                            id="holdFrom"
                            onChange={handleCheckboxChange}  
                          />
                          <label
                            className="form-check-label"
                            htmlFor="holdFrom"
                          >
                            Mantén iniciado
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group d-grid gap-2 col-6 mx-auto ">
                      <button
                        onClick={() => handleChange()}
                        className="btn-lg btn btn-primary btn-block mb-3"
                      >
                        Ingresar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login_cont;
