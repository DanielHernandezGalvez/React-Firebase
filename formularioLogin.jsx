import login from "../../styles/login.module.css";
import { useState } from "react";
import $ from "jquery";

function Login_cont() {
  const [credentials, setCredentials] = useState({
    user: "",
    password: "",
  });

  const handleChange = (event) => {
    if (!event) return;
    const property = event.target.name;
    const value = event.target.value;
    setCredentials({
      ...credentials,
      [property]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const req = {
      url: "https://auth.nucleodediagnostico.mx/common/web/login",
      type: "POST",
      crossDomain: true,
      data: JSON.stringify({
        username: parseInt(credentials.user),
        password: credentials.password,
      }),
      dataType: "json",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
    };

    $.ajax(req).done((data, status, res) => {
      if (res.status === 200) {
        console.log(data.data)
      } else alert("Usuario o contraseña incorrectos");
    }).fail((err) => {
      alert(err.responseJSON.message)
      console.log(err.responseJSON.message_type)
    });
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
                          <input
                            name="hold"
                            className="form-check-input"
                            type="checkbox"
                            value="true"
                            id="holdFrom"
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


