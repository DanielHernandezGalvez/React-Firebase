import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditarGasto from "./components/EditarGasto.jsx";
import GastosCategoria from "./components/GastosCategoria.jsx";
import InisioSesion from "./components/InisioSesion.jsx";
import ListaGastos from "./components/ListaGastos.jsx";
import RegistroUsuarios from "./components/RegistroUsuarios.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/iniciar-sesion" element={<InisioSesion />} />
        <Route path="/crear-cuenta" element={<RegistroUsuarios />} />
        <Route path="/categorias" element={<GastosCategoria />} />
        <Route path="/lista" element={<ListaGastos />} />
        <Route path="/editar/:id" element={<EditarGasto />} />
        <Route path="/" element={ <App />} />
      </Routes>
     
    </BrowserRouter>
  </React.StrictMode>
);
