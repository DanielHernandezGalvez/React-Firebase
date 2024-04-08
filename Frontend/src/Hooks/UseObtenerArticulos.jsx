import React, {useEffect, useState} from 'react'

const UseObtenerArticulos = () => {
    const [articulos, setArticulos] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setArticulos([
                {
                    id: 1,
                    title: "primer articulo"
                }, {
                    id: 2,
                    title: "segundo articulo"
                }, {
                    id: 3,
                    title: "tercero articulo"
                }
            ])
            setCargando(false)
        }, 3000)
    }, [])

  return [articulos, cargando];
}

export default UseObtenerArticulos
