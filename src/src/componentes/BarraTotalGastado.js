import React from 'react';
import styled from 'styled-components';
import theme from './../theme';
import convertirAMoneda from './../funciones/convertirAMoneda';
import {useTotalDelMes} from './../contextos/TotalGastadoEnElMesContext';

const BarraTotal = styled.div`
    background: ${theme.verde};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;

const BarraTotalGastado = () => {
    const {total} = useTotalDelMes();

	return (
		<BarraTotal>
			<p>Total Gastado en el mes:</p>
			<p>{convertirAMoneda(total)}</p>
		</BarraTotal>
	);
}
 
export default BarraTotalGastado;