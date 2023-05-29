import React, { useEffect, useState } from 'react';
import FiltrosEstudios from './FiltrosEstudios';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import GraficaEstudios from './GraficaEstudios';

import { useTheme } from '@mui/material/styles';
import { Card, Grid, useMediaQuery } from '@mui/material';
import { gridSpacing } from 'store/constant';
import Totales from './Totales';

export default function TablaEstudios({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }) {
  const [general, setGeneral] = useState([]);
  const [detalle, setDetalle] = useState([]);

  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const fechaActualDescuentos = () => {
    const myDateInput = document.getElementById('fiInputEstudios');
    const ffInputBitacora = document.getElementById('ffInputEstudios');
    const fechaActual = new Date(new Date() - 6 * 60 * 60 * 1000).toISOString().split('T')[0];
    myDateInput.value = fechaActual;
    ffInputBitacora.value = fechaActual;
  };

  const getEstudios = async (event) => {
    event.preventDefault();

    const fiDate = new Date(document.getElementById('fiInputEstudios').value);
    const ffDate = new Date(document.getElementById('ffInputEstudios').value);
    const fi = Math.floor(fiDate.getTime() / 1000);
    const ff = Math.floor(ffDate.getTime() / 1000);
    const url = `${process.env.RUTA_API}/sirsi/web/ProductividadEstudios?Fi=${fi}&Ff=${ff}`;

    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        console.log('click descuentos', data.data);
        setGeneral(data.data.General);
        setDetalle(data.data.Detalle);
      }
    } catch (error) {
      alert(error, 'no se pudieron traer los datos');
    }
  };

  useEffect(() => {
    fechaActualDescuentos();
  }, []);

  const colEstudios = [
    {
      name: 'Sucursal',
      selector: (row) => row.Sucursal
    },
    {
      name: 'Total',
      selector: (row) => row.Total
    }
  ];

  const colDetalle = [
    {
      name: 'Sucursal',
      selector: (row) => row.Sucursal
    },
    {
      name: 'Pendiente',
      selector: (row) => row.Pendiente
    },
    {
      name: 'Tomas',
      selector: (row) => row.Tomas
    },
    {
      name: 'Proceso',
      selector: (row) => row.Proceso
    },
    {
      name: 'RevisionFirma',
      selector: (row) => row.RevisionFirma
    },
    {
      name: 'LiberadoLab',
      selector: (row) => row.LiberadoLab
    },
    {
      name: 'ProcesoAcabadoDental',
      selector: (row) => row.ProcesoAcabadoDental
    },
    {
      name: 'Interpretado',
      selector: (row) => row.Interpretado
    },
    {
      name: 'EnSalasRayosX',
      selector: (row) => row.EnSalasRayosX
    },
    {
      name: 'LiberadoImg',
      selector: (row) => row.LiberadoImg
    },
    {
      name: 'Entregar',
      selector: (row) => row.Entregar
    },
    {
      name: 'Cancelado',
      selector: (row) => row.Cancelado
    }
  ];

  const tableData = {
    columns: colDetalle,
    data: detalle,
    fileName: 'document',
    export: true,
    print: true,
    filterHidden: true,
    filterDigit: 1
  };

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
          <FiltrosEstudios getEstudios={getEstudios} />
        </Card>
      </Grid>

      {general.length !== 0 && (
        <>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} lg={4} md={4}>
                <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '10px' }}>
                  <div className="my-2">
                    <DataTable data={general} columns={colEstudios} responsive="true" dense pagination paginationPerPage={6} fixedHeader />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} lg={8} md={8}>
                <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
                  <GraficaEstudios general={general} />
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} lg={9} md={9}>
                <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '10px' }}>
                  <DataTableExtensions {...tableData}>
                    <DataTable data={detalle} columns={colDetalle} searchable responsive="true" dense pagination fixedHeader />
                  </DataTableExtensions>
                </Card>
              </Grid>

              <Grid item xs={12} lg={3} md={3}>
                <Grid  spacing={2}>
                  <Grid item>
                    <Card sx={{ bgcolor: '#067DB2' || '', position: 'relative', paddingTop: '10px' }}>
                      <Totales detalle={detalle} />
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
