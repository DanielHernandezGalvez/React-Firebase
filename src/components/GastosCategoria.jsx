import React from "react";
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from "../elements/Header"
import { Helmet } from "react-helmet";
import BtnRegresar from "../elements/BtnRegresar";
const GastosCategoria = () => {
  return (
    <>
        <Helmet>
        <title>Gastos por categoría</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Gastos por categoría</Titulo>
          <BtnRegresar />
        </ContenedorHeader>
      </Header>
    </>
  )
};

export default GastosCategoria;
