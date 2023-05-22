import React, { useEffect, useState } from 'react';
// PARA LA GRAFICA
import { useTheme } from '@mui/material/styles';
import RevenueChartCard from 'components/widget/Chart/RevenueChartCard';

import GraficaSucursal from './GraficaSucursal';
import useConfig from 'hooks/useConfig';
// PARA LA GRAFICA

export default function SelectSucursal({ detalleEncuesta, sucursales, setSucursales }) {
  const theme = useTheme();

  // PARA LA GRAFICA --- DATOS TABLA
  let RevenueChartCardOptions = {
    chart: {
      id: 'revenue-chart',
      height: 228,
      type: 'donut'
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

  const [resultados, setResultados] = useState([]);
  const [sucuSel, setSucuSel] = useState([]);
  const [bueno, setBueno] = useState(0);
  const [regular, setRegular] = useState(0);
  const [malo, setMalo] = useState(0);

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

  const sucursalesUnicas = [...new Set(detalleEncuesta.map((sucu) => sucu.Sucursal))];

  useEffect(() => {
    setResultados(
      detalleEncuesta.filter((row) => {
        return row.Sucursal === sucursales ? true : false;
      })
    );
  }, [detalleEncuesta, sucursales]);

useEffect(() => {
  setSucursales(sucursalesUnicas[0])
},[detalleEncuesta])

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
    let sumaBueno = resultados.reduce((total, row) => {
      let val = row.Calificacion === 'Bueno' ? 1 : 0;
      return total + val;
    }, 0);
    let sumaRegular = resultados.reduce((total, row) => {
      let val = row.Calificacion === 'Regular' ? 1 : 0;
      return total + val;
    }, 0);
    let sumaMalo = resultados.reduce((total, row) => {
      let val = row.Calificacion === 'Malo' ? 1 : 0;
      return total + val;
    }, 0);

    console.log(resultados, '==================>');

    let porcentajeBueno = ((sumaBueno / (sumaBueno + sumaRegular + sumaMalo)) * 100).toFixed(2);
    let porcentajeRegular = ((sumaRegular / (sumaBueno + sumaRegular + sumaMalo)) * 100).toFixed(2);
    let porcentajeMalo = ((sumaMalo / (sumaBueno + sumaRegular + sumaMalo)) * 100).toFixed(2);

    setRevenueChartCardSeries([sumaBueno, sumaRegular, sumaMalo]);
    setBueno(porcentajeBueno);
    setRegular(porcentajeRegular);
    setMalo(porcentajeMalo);
  }, [resultados]);

  return (
    <div className="col-lg-3 col-sm-11 my-1 mx-1">
      {/* <GraficaSucursal
        chartData={{ series: revenueChartCardSeries, options: revenueChartCardOptions }}
        detalleEncuesta={detalleEncuesta}
        sucursales={sucursales}
      /> */}
      <RevenueChartCard
        chartData={{ series: revenueChartCardSeries, options: revenueChartCardOptions }}
        bueno={bueno}
        regular={regular}
        malo={malo}
      />

      <div className="form-floating">
        <select id="dos" className="form-select" value={sucursales} onChange={(e) => setSucursales(e.target.value)}>
          {sucursalesUnicas.map((sucu) => (
            <option key={sucu.Folio} value={sucu.Folio}>
              {sucu}
            </option>
          ))}
        </select>
        <label htmlFor="dos">Sucursal</label>
      </div>
    </div>
  );
}
