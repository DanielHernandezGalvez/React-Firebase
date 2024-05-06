import React from "react";
import {
  Header,
  Titulo,
  ContenedorBotones,
  ContenedorHeader,
} from "./elements/Header";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto</Titulo>
          <ContenedorBotones>
            <button>Categorías</button>
            <button>Lista de gastos</button>
            <button></button>
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
    </>
  );
};

export default App;
