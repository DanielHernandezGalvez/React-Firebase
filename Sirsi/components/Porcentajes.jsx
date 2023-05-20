import React, { useEffect, useState } from 'react';

// PARA LA GRAFICA
import { useTheme } from '@mui/material/styles';
import RevenueChartCard from 'components/widget/Chart/RevenueChartCard';
import useConfig from 'hooks/useConfig';
// PARA LA GRAFICA

export default function Porcentajes({ resultados, ordenes }) {
const[bueno, setBueno] = useState(0)
const[regular, setRegular] = useState(0)
const[malo, setMalo] = useState(0)

  const sumaBueno = resultados.reduce((total, row) => total + row.Bueno, 0);
  const sumaRegular = resultados.reduce((total, row) => total + row.Regular, 0);
  const sumaMalo = resultados.reduce((total, row) => total + row.Malo, 0);

  const porcentajeBueno = ((sumaBueno / (sumaBueno + sumaRegular + sumaMalo)) * 100).toFixed(2);
  const porcentajeRegular = ((sumaRegular / (sumaBueno + sumaRegular + sumaMalo)) * 100).toFixed(2);
  const porcentajeMalo = ((sumaMalo / (sumaBueno + sumaRegular + sumaMalo)) * 100).toFixed(2);


  // Imprime los resultados
  console.log(`Porcentaje de Bueno: ${porcentajeBueno}%`);
  console.log(`Porcentaje de Regular: ${porcentajeRegular}%`);
  console.log(`Porcentaje de Malo: ${porcentajeMalo}%`);

  // PARA LA GRAFICA --- DATOS TABLA
  let RevenueChartCardOptions = {
    chart: {
      id: 'revenue-chart',
      height: 228,
      type: 'donut',
    },
    dataLabels: {
      enabled: false
    },
    labels: ['Bueno', 'Regular', 'Malo'],
    legend: {
      show: true,
      position: 'bottom',
      fontFamily: 'inherit',
      labels: {
        colors: 'inherit'
      },
      itemMargin: {
        horizontal: 10,
        vertical: 10
      }
    }
  };

  const theme = useTheme();
  const [revenueChartCardSeries, setRevenueChartCardSeries] = useState([1258, 975, 500]);
  const [revenueChartCardOptions, setRevenueChartCardOptions] = useState(RevenueChartCardOptions);
  const { navType } = useConfig();

  const backColor = theme.palette.background.paper;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;
  const primary = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;
  const orange = theme.palette.orange.main;
  const orangeDark = theme.palette.orange.dark;

  React.useEffect(() => {
    setRevenueChartCardOptions((prevState) => ({
      ...prevState,
      colors: [primary, error, secondary],
      stroke: {
        colors: [backColor]
      }
    }));
  }, [navType, backColor, secondary, error, primary, successDark, orange, orangeDark]);
  // PARA LA GRAFICA

useEffect(() => {
    setRevenueChartCardSeries([sumaBueno, sumaRegular, sumaMalo])
    setBueno(porcentajeBueno)
    setRegular(porcentajeRegular)
    setMalo(porcentajeMalo)
}, [resultados])

  return (
    <>
      <RevenueChartCard chartData={{ series: revenueChartCardSeries, options: revenueChartCardOptions }} bueno={bueno} regular={regular} malo={malo} ordenes={ordenes}/>
      {/* <p className="text-end">{ordenes}</p>
      <p className="text-end"> Bueno {porcentajeBueno}%</p>
      <p className="text-end">Regular {porcentajeRegular}%</p>
      <p className="text-end">Malo {porcentajeMalo}%</p> */}
    </>
  );
}
