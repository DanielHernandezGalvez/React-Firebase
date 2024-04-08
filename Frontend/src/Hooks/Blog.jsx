import React, { useEffect, useState } from 'react'

const Blog = () => {
    const [articulos, setArticulos] = useState([])

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
        }, 3000)
    }, [])

    console.log(articulos)

    return (
        <div>
            <h2>Blog</h2>
            <div>
                {articulos.map((articulo, key) => {
                    return ( 
                    <p key={articulo.id}>{articulo.title}</p>
                )
                })}
            </div>
        </div>
    )
}

export default Blog
