import { useEffect, useState } from "react";
import useObtenerGastosDelMes from './useObtenerGastosDelMes';

const useObtenerGastosDelMesPorCategoria = () => {
	const [gastosPorCategoria, cambiarGastosPorCategoria] = useState([]);
	const gastos = useObtenerGastosDelMes();

	useEffect(() => {
		const sumaDeGastos = gastos.reduce((objetoResultante, objetoActual) => {
			const categoriaActual = objetoActual.categoria;
			const cantidadActual = objetoActual.cantidad;
	
			objetoResultante[categoriaActual] += cantidadActual;
	
			return objetoResultante;
		}, {
			'comida': 0,
			'cuentas y pagos': 0,
			'hogar': 0,
			'transporte': 0,
			'ropa': 0,
			'salud e higiene': 0,
			'compras': 0,
			'diversion': 0,
		});
	
		cambiarGastosPorCategoria(Object.keys(sumaDeGastos).map((elemento) => {
			return {categoria: elemento, cantidad: sumaDeGastos[elemento]}
		}));
	}, [gastos, cambiarGastosPorCategoria]);
	
	return gastosPorCategoria;
}
 
export default useObtenerGastosDelMesPorCategoria;