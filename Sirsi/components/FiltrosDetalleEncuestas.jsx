import React, { useState } from 'react';
import GraficaUsuario from './GracifaUsuario';

// PARA LA GRAFICA
import { useTheme } from '@mui/material/styles';
import RevenueChartCard from 'components/widget/Chart/RevenueChartCard';
import useConfig from 'hooks/useConfig';
// PARA LA GRAFICA

export default function FiltrosDetalle({ detalleEncuesta }) {

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


  const [usuarios, setUsuarios] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [preguntas, setPreguntas] = useState([]);

  const usuariosUnicos = [...new Set(detalleEncuesta.map((usu) => usu.Usuario))];
  const sucursalesUnicas = [...new Set(detalleEncuesta.map((sucu) => sucu.Sucursal))];
  const PreguntasUnicas = [...new Set(detalleEncuesta.map((preg) => preg.Pregunta))];

  return (
    <div className="row mb-4 d-flex">
      <div className="input-group d-flex justify-content-center">
        <div className="col-md-3 col-sm-11 my-1 mx-1">
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
        <GraficaUsuario chartData={{ series: revenueChartCardSeries, options: revenueChartCardOptions }} />

        <div className="col-md-3 col-sm-11 my-1 mx-1">
          <div className="form-floating">
            <select id="dos" className="form-select" value={sucursales} onChange={(e) => setSucursales(e.target.value)}>
              <option value="">Todas las sucursales</option>
              {sucursalesUnicas.map((sucu) => (
                <option key={sucu.Folio} value={sucu.Folio}>
                  {sucu}
                </option>
              ))}
            </select>
            <label htmlFor="dos">Sucursal</label>
          </div>
        </div>

        <div className="col-md-4 col-sm-11 my-1 mx-1">
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
      </div>
    </div>
  );
}
