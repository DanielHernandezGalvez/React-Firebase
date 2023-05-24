import React, { useEffect, useState } from 'react';
import FiltrosExpedientes from './FiltrosExpedientes';
import DataTable from 'react-data-table-component';
import GraficaExpedientes from './GraficaExpedientes';

// material-ui

import { useTheme } from '@mui/material/styles';
import { Card, Grid, useMediaQuery, Box } from '@mui/material';
import { gridSpacing } from 'store/constant';

export default function Expedientes({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }) {
  const [expedientes, setExpedientes] = useState([]);

  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const fechaActualEmpresa = () => {
    const myDateInput = document.getElementById('fiInputExpedientes');
    const ffInputBitacora = document.getElementById('ffInputExpedientes');
    const fechaActual = new Date(new Date() - 6 * 60 * 60 * 1000).toISOString().split('T')[0];
    myDateInput.value = fechaActual;
    ffInputBitacora.value = fechaActual;
  };

  const getExpedientes = async (event) => {
    event.preventDefault();

    const fiDate = new Date(document.getElementById('fiInputExpedientes').value);
    const ffDate = new Date(document.getElementById('ffInputExpedientes').value);
    const fi = Math.floor(fiDate.getTime() / 1000);
    const ff = Math.floor(ffDate.getTime() / 1000);
    const url = `${process.env.RUTA_API}/sirsi/web/ProductividadExpediente?Fi=${fi}&Ff=${ff}`;

    try {
      const response = await fetch(url);
      if (response.status === 200) {
        let data = await response.json();
        console.log('expedientes');
        setExpedientes(data.data);
      } else {
        alert(await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fechaActualEmpresa();
  }, []);

  const columns = [
    {
      name: 'Sucursal',
      selector: 'Sucursal'
    },
    {
      name: 'Total',
      selector: 'Total'
    }
  ];

  const columnsDetalle = [
    {
      name: 'Sucursal',
      selector: 'Sucursal'
    },
    {
      name: 'Activa',
      selector: 'Activa'
    },
    {
      name: 'Modificada',
      selector: 'Modificada'
    },
    {
      name: 'Cancelada',
      selector: 'Cancelada'
    }
  ];

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
          <FiltrosExpedientes getExpedientes={getExpedientes} />
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={5} md={5}>
            <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}>
              <DataTable
                columns={columns}
                data={expedientes.ProductividadSucursalesExpedientes}
                fixedHeader
                responsive="true"
                pagination
                paginationPerPage={5}
              />
            </Card>
          </Grid>
          <Grid item xs={12} lg={7} md={7}>
            <Card>
              <p>Grafica de Expedientes</p>
              {/* <GraficaExpedientes data={expedientes} /> */}
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={6} md={6}>
            <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}>
              <DataTable
                columns={columnsDetalle}
                data={expedientes.DetalleProductividadExpediente}
                fixedHeader
                responsive="true"
                pagination
                paginationPerPage={5}
              />
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <Card>
              <div className="col-md-3 col-sm-12 my-1 mx-1">
                <div className="form-floating">
                  <select className="form-select" id="sucInputDescuentos" placeholder="Username" required>
                    <option id="0">Activa</option>
                    <option id="0">Modificada</option>
                    <option id="0">Cancelada</option>
                  </select>
                  <label htmlFor="sucInputBitacora">Estatus</label>
                </div>
              </div>
              {/* <GraficaDetalle data={expedientes.DetalleProductividadExpediente} /> */}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
