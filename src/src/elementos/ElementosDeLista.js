import styled from 'styled-components';
import theme from './../theme';
 
const Lista = styled.ul`
    list-style: none;
    padding: 0 2.5rem; /* 40px */
    height: 100%;
    overflow-y: auto;
 
    li {
        grid-template-columns: 1fr 1fr 1fr auto;
    }
 
    @media (max-width: 50rem) { /*80px*/
        li {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
        }
    }
`;
 
const ElementoLista = styled.li`
    padding: 1.25rem 0; /* 20px */
    border-bottom: 2px solid #F2F2F2;
    display: grid;
    gap: 0.31rem; /* 5px */
    justify-content: space-between;
 
    & > div {
        width: 100%;
        display: flex;
        align-items: center;
    }
 
    &:hover button,
    &:hover a {
        opacity: 1;
    }
`;
 
 
const ListaDeCategorias = styled.ul`
    list-style: none;
    padding: 0 2.5rem; /* 40px */
    height: 100%;
    overflow-y: auto;
`;
 
const ElementoListaCategorias = styled.li`
    padding: 1.25rem 0; /* 20px */
    border-bottom: 2px solid #F2F2F2;
    display: flex;
    justify-content: space-between;
`;
 
const Categoria = styled.div`
    font-weight: 500;
    font-size: 1.25rem; /* 20px */
    text-transform: uppercase;
    display: flex;
    align-items: center;
    
    svg {
        width: 3.12rem; /* 50px */
        height: auto;
        margin-right: 1.25rem; /* 20px */
        border-radius: 0.62rem; /* 10px */
    }
 
    @media (max-width: 50rem) { /* 80px */
        font-size: 1.12rem;
    }
`;
 
const Descripcion = styled.div`
    justify-content: center;
    font-size: 1.25rem;
    text-transform: capitalize;
    @media (max-width: 50rem) { /* 50px */
        justify-content: end;
    }
`;
 
const Valor = styled.div`
    font-size: 1.25rem; /* 20px */
    font-weight: 700;
    justify-content: end;
 
    @media (max-width: 50rem) { /* 80px */
        justify-content: start;
    }
`;
 
const Fecha = styled.div`
    border-radius: 0.31rem; /* 5px */
    background: ${theme.azulClaro};
    text-align: center;
    color: #fff;
    padding: 0.62rem 3.12rem; /* 10px 50px */
    display: inline-block;
    margin: 1.25rem 0; /* 20px */
 
    @media (max-width: 50rem) { /* 80px */
        width: 100%;
    }
`;
 
const ContenedorBotones = styled.div`
    @media (max-width: 50rem) { /* 80px */
        justify-content: end;
    }
`;
 
const BotonAccion = styled.button`
    outline: none;
    background: ${theme.grisClaro};
    border: none;
    width: 2.5rem; /* 40px */
    display: inline-block;
    height: 2.5rem; /* 40px */
    line-height: 2.5rem; /* 40px */
    font-size: 16px;
    cursor: pointer;
    border-radius: 0.31rem; /* 5px */
    margin-left: 0.625rem; /* 10px */
    transition: .3s ease all;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
 
    &:hover {
        background: ${theme.grisClaro2};
    }
 
    svg {
        width: 1.125rem; /* 18px */
    }
 
    @media (max-width: 50rem) { /* 80px */
        opacity: 1;
    }
`;
 
const ContenedorSubtitulo = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
 
const Subtitulo = styled.h3`
    color: ${theme.grisClaro2};
    font-weight: 400;
    font-size: 40px;
    padding: 2.5rem 0; /* 40px */
`;
 
const ContenedorBotonCentral = styled.div`
    display: flex;
    justify-content: center;
    margin: 2.5rem; /* 40px */
`;
 
const BotonCargarMas = styled.button`
    background: ${theme.grisClaro};
    border: none;
    border-radius: 7px;
    color: #000;
    font-family: 'Work Sans', sans-serif;
    padding: 1rem 1.87rem; /* 20px 30px */
    
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
    transition: .3s ease all;
 
    &:hover {
        background: ${theme.grisClaro2};
    }
`;
 
export {
    Lista,
    ElementoLista,
    ListaDeCategorias,
    ElementoListaCategorias,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
};