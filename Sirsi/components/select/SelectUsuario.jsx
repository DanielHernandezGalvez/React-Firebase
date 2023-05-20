import React, { useState } from 'react';
// PARA LA GRAFICA
import { useTheme } from '@mui/material/styles';
import GraficaUsuario from './GracifaUsuario';
import useConfig from 'hooks/useConfig';
// PARA LA GRAFICA

export default function SelectUsuario({ setUsuarios, detalleEncuesta, usuarios }) {
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

  const usuariosUnicos = [...new Set(detalleEncuesta.map((usu) => usu.Usuario))];

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
      <GraficaUsuario
        chartData={{ series: revenueChartCardSeries, options: revenueChartCardOptions }}
        detalleEncuesta={detalleEncuesta}
        usuarios={usuarios}
      />
      <div className="form-floating">
        <select id="uno" className="form-select" value={usuarios} onChange={(e) => setUsuarios(e.target.value)}>
          <option value="">Todos los usuarios</option>
          {usuariosUnicos.map((usu) => (
            <option key={usu} value={usu}>
              {usu}
            </option>
          ))}
        </select>
        <label htmlFor="uno">Usuarios</label>
      </div>
    </div>
  );
}
