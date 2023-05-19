import React, { useEffect, useState } from 'react';
import FiltrosResultados from './FiltrosResultados';
import DataTable from 'react-data-table-component';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, useMediaQuery } from '@mui/material';
import { gridSpacing } from 'store/constant';
import DenseTable from './DenseTAble';
import TablaUno from './TablaUno';
import RevenueChartCard from "./RevenueChartCard"

export default function TablaResultados({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }) {
  const [data, setData] = useState([]);
  const [resultados, setResultados] = useState([]);

  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const capitalize = (val) => {
    return val
      .toLowerCase()
      .trim()
      .split(' ')
      .map((v) => v[0].toUpperCase() + v.substr(1))
      .join(' ');
  };

  const getSucursales = async () => {
    const url = process.env.RUTA_API + '/sirsi/web/BuscarSucursales?suc=1';

    try {
      const response = await fetch(url);
      let data = [];
      data = await response.json();

      const select = document.getElementById('sucInputResultados');
      select.innerHTML = '';
      const option = document.createElement('option');
      option.value = 0;
      option.selected = true;
      option.text = 'Todas';
      select.appendChild(option);

      data.data.map((sucursal) => {
        const option = document.createElement('option');
        option.value = sucursal.SucuId;
        option.text = capitalize(sucursal.SucuNombre);
        select.appendChild(option);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fechaActualResultados = () => {
    const myDateInput = document.getElementById('fiInputResultados');
    const ffInputBitacora = document.getElementById('ffInputResultados');
    const fechaActual = new Date(new Date() - 6 * 60 * 60 * 1000).toISOString().split('T')[0];
    myDateInput.value = fechaActual;
    ffInputBitacora.value = fechaActual;
  };

  const getResultados = async (event) => {
    event.preventDefault();
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const fiDate = new Date(document.getElementById('fiInputResultados').value);
    const ffDate = new Date(document.getElementById('ffInputResultados').value);
    const fi = Math.floor(fiDate.getTime() / 1000);
    const ff = Math.floor(ffDate.getTime() / 1000);
    const suc = document.getElementById('sucInputResultados').value;

    const url = `${process.env.RUTA_API}/sirsi/web/ResultadosEncuestas?Fi=${fi}&Ff=${ff}&IdSucursal=${suc}`;
    try {
      const response = await fetch(url, requestOptions);
      if (response.status === 200) {
        const data = await response.json();
        setData(data.data);
        setResultados(data.data.ResultadosEncuestas);
        console.log(data);
      } else {
        alert('error en el primer fetch');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSucursales();
    fechaActualResultados();
  }, []);

  const columns = [
    {
      name: 'Preguntas',
      selector: (row) => row.Pregunta,
      sortable: true,
      cell: (row) => <p className="py-1 m-0">{row.Pregunta}</p>
    },
    {
      name: 'Etiqueta',
      selector: 'Etiqueta',
      sortable: true
    },
    {
      name: 'Departamento',
      selector: 'Departamento',
      sortable: true
    },
    {
      name: 'Bueno',
      selector: 'Bueno',
      sortable: true,
      cell: (row) => <p className="py-1  m-0" style={{ width: '20px' }}>{row.Bueno}</p>
    },
    {
      name: 'Regular',
      selector: 'Regular',
      sortable: true,
      cell: (row) => <p className="py-1 w-25 m-0" style={{ width: '50px' }}>{row.Regular}</p>
    },
    {
      name: 'Malo',
      selector: 'Malo',
      sortable: true
    }
  ];

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
          <FiltrosResultados getResultados={getResultados} />
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={12} md={12}>
            <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}>
              <DenseTable resultados={resultados} />  
              {/* <p>{data.ResultadosEncuestas[0].Pregunta}</p> */}
              {/* <DataTable data={resultados} columns={columns} dense paginationPerPage={10} responsive /> */}
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* <RevenueChartCard resultados={resultados} /> */}

      {/* <TablaUno  /> */}
    </>
  );
}
