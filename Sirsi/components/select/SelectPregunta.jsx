import React, { useState } from 'react';
// PARA LA GRAFICA
import { useTheme } from '@mui/material/styles';
import GraficaPregunta from './GraficaPregunta';
import useConfig from 'hooks/useConfig';
// PARA LA GRAFICA

export default function SelectPregunta({ detalleEncuesta, preguntas, setPreguntas }) {
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

  const PreguntasUnicas = [...new Set(detalleEncuesta.map((preg) => preg.Pregunta))];

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

  return (
    <div className="col-md-3 col-sm-11 my-1 mx-1">
      <GraficaPregunta 
       chartData={{ series: revenueChartCardSeries, options: revenueChartCardOptions }}
       detalleEncuesta={detalleEncuesta}
       preguntas={preguntas} />
      <div className="form-floating">
        <select id="tres" className="form-select" value={preguntas} onChange={(e) => setPreguntas(e.target.value)}>
          <option value="">Todas las preguntas</option>
          {PreguntasUnicas.map((preg) => (
            <option key={preg} value={preg}>
              {preg}
            </option>
          ))}
        </select>
        <label htmlFor="tres">Pregunta</label>
      </div>
    </div>
  );
}
