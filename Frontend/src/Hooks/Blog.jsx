import React, { useEffect, useState } from 'react'
import UseObtenerArticulos from './UseObtenerArticulos'

const Blog = () => {
    const [articulos, cargando] = UseObtenerArticulos();

    console.log(articulos)

    return (
        <div>
            <h2>Blog</h2>
            {cargando ?
                (<p>Cargando...</p>) : (
                    <div>
                        {
                            articulos.map((articulo, key) => {
                                return (
                                    <p key={articulo.id}>{articulo.title}</p>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Blog
