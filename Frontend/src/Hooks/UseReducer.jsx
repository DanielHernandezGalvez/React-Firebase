import React, { useReducer } from "react";

const UseReducer = () => {
  // Accion es un objeto que describe como queremos cambiar el estado
  // {tipo: "INCREMENTAR"}

  // Estado inicial del reducer
  const count = { contador: 0 };

  // Reducer
  const reducer = (estado, accion) => {
    switch (accion.tipo) {
      case "INCREMENTAR":
        return { contador: estado.contador + 1 };
      case "DECREMENTAR":
        return { contador: estado.contador - 1 };
      case "REINICIAR":
        return { contador: (estado.contador = 0) };
      default:
        return estado;
    }
  };

  const [estado, dispatch] = useReducer(reducer, count);

  return (
    <>
      <div>
        <p>{estado.contador}</p>
        <button onClick={() => dispatch({ tipo: "INCREMENTAR" })}>
          incrementar
        </button>
        <button onClick={() => dispatch({ tipo: "DECREMENTAR" })}>
          decrementar
        </button>

        <button onClick={() => dispatch({ tipo: "REINICIAR" })}>
          reiniciar
        </button>
      </div>
    </>
  );
};

export default UseReducer;
