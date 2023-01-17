import login from "../../styles/login.module.css"
import {useState} from 'react'

function Login_cont() {

    const [ credentials, setCredentials] = useState({
       user: "",
       password: "" 
    })

    const handleChange = (event) => {
        if(!event) return
        const property = event.target.name;
        const value = event.target.value;
        setCredentials({
            ...credentials,
            [property]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(credentials)

        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({username: credentials.user, password: credentials.password}),
                redirect: 'follow'
            };

            const response = await fetch("https://auth.nucleodediagnostico.mx/common/web/login", requestOptions);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <>
            <div className={login.margin}>
                <div className="row col-xl-6 col-lg-7 col-md-10 mt-5 mx-auto p-0 pt-4">
                    <div className={`${login.log} row shadow m-auto p-0 bg-light`}>
                        <div className={`${login.bgImage} col-lg-6 login-img h-p-30 p-0 none-dark img-fluid`} >
                        </div>
                        <div className={`${login.form} col-lg-6 h-p-70 text-center p-5 my-auto mx-auto`}>
                            <div>
                                <h4 className={`${login.red}  mb-3`}>
                                    Iniciar Sesión
                                </h4>
                                <div className="container">
                                    <form action="/login" method="POST" className="pt-xl-4 fLogin" onSubmit={handleSubmit}>
                                        <div className="input-group mb-4">
                                            <span className="input-group-text">
                                                @
                                            </span>
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    name="user"
                                                    pattern="[A-Za-z0-9]{1,15}"
                                                    className="form-control"
                                                    id="userFrom"
                                                    placeholder="Username"
                                                    autoComplete="off"
                                                    autoFocus
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="userFrom">
                                                    Usuario
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                id="passFrom"
                                                placeholder="Password"
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="passFrom">
                                                Contraseña
                                            </label>
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
                                                    <label className="form-check-label" htmlFor="holdFrom">
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
            </div >
        </>
    )
}

export default Login_cont

