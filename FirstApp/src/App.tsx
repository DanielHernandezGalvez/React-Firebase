import React, { useState } from 'react'
import './App.css'
import Formulario from './components/Formulario'
import Header from './components/Header'

const App = () => {
  const [tareas, setTareas] = useState([
    {
      id: 1,
      texto: "lavar ropa",
      completada: false
    },
    {
      id: 2,
      texto: "lavar platos",
      completada: false
    },
  ]);

  return (
    <div className='contenedor'>
      <Header />
      <Formulario tareas={tareas} setTareas={setTareas} />
    </div>
  )
}

export default App
