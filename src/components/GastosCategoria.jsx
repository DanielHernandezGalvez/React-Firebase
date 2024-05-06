import React from "react";
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from "../elements/Header"
import { Helmet } from "react-helmet";
const GastosCategoria = () => {
  return (
    <>
        <Helmet>
        <title>Gastos por categoría</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Gastos por categoría</Titulo>
  
        </ContenedorHeader>
      </Header>
    </>
  )
};

export default GastosCategoria;
