import React, { useEffect, useState } from "react";

const UseEffect = () => {
  const [count, setCount] = useState(0);

  //   useEffect(() => {
  //     console.log("El componente se renderizó");
  //   }); // se renderiza cada vez que cambie

  //   useEffect(() => {
  //     console.log("El componente cargó por primera vez");
  //   }, []); // solo se renderiza la primera vez

  //   useEffect(() => {
  //     console.log("El estado del contador cambió");
  //   }, [count]); // cada que el contador cambie

  useEffect(() => {
    // codigo del efecto

    return () => {
      console.log("adios componente");
      // vcerramos conexioón a la api
    };
  }, []);



  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>incrementar</button>
      <button onClick={() => setCount(count - 1)}>decrementar</button>
    </div>
  );
};

export default UseEffect;
