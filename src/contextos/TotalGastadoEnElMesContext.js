import React, {useState, useEffect, useContext} from 'react';
import useObtenerGastosDelMes from './../hooks/useObtenerGastosDelMes';

const TotalGastadoContext = React.createContext();

const useTotalDelMes = () => useContext(TotalGastadoContext);

const TotalGastadoProvider = ({children}) => {
	const [total, cambiarTotal] = useState(0);
	const gastos = useObtenerGastosDelMes();
	
	useEffect(() => {
		let acumulado = 0;
		gastos.forEach((gasto) => {
			acumulado += gasto.cantidad
		})

		cambiarTotal(acumulado);
	}, [gastos]);

	return(
		<TotalGastadoContext.Provider value={{total: total}}>
			{children}
		</TotalGastadoContext.Provider>
	);
}

export {TotalGastadoProvider, useTotalDelMes};