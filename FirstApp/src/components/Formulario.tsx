import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import IngresarTareaProps from "../interfaces/IngresarTareaProps"

const handleSubmit = (e) => {
    e.preventDefault();

    setTareas([...tareas, {}])
}
const Formulario = ({tareas, setTareas}) => {
  return (
    <form action='' className='formulario-tareas' onSubmit={habdleSubmit}>
        <input 
            type="text" 
            className='formulario-tareas__input' 
            placeholder='Escribe una tarea'
        />
        <button 
            type="submit"
            className="formulario-tareas__btn"
        >
            <FontAwesomeIcon 
                icon={faPlusSquare} 
                className="formulario-tareas__icono-btn"
            />
        </button>
    </form>
  )
}

export default Formulario
