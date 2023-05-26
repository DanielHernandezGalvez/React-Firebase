import React, { useEffect, useState } from 'react';
import FiltrosExpedientes from './FiltrosExpedientes';
import DataTable from 'react-data-table-component';
import GraficaExpedientes from './GraficaExpedientes';
import GraficaDetalle from './GraficaDetalle';
import GraficaModificada from './GraficaModificada';
import GraficaCancelada from './GraficaCancelada';

// material-ui

import { useTheme } from '@mui/material/styles';
import { Card, Grid, useMediaQuery, Box } from '@mui/material';
import { gridSpacing } from 'store/constant';

export default function Expedientes({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }) {
  const [expedientes, setExpedientes] = useState([]);
  const [estatus, setEstatus] = useState('Activa');

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

  const filtroSelect = (event) => {
    const selectedOptionId = event.target.value;
    setEstatus(selectedOptionId);
  };

  const columns = [
    {
      name: 'Sucursal',
      selector: (row) => row.Sucursal
    },
    {
      name: 'Total',
      selector: (row) => row.Total
    }
  ];

  const columnsDetalle = [
    {
      name: 'Sucursal',
      selector: (row) => row.Sucursal
    },
    {
      name: 'Activa',
      selector: (row) => row.Activa
    },
    {
      name: 'Modificada',
      selector: (row) => row.Modificada
    },
    {
      name: 'Cancelada',
      selector: (row) => row.Cancelada
    }
  ];

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
          <FiltrosExpedientes getExpedientes={getExpedientes} />
        </Card>
      </Grid>

      {expedientes.length !== 0 && (
        <>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} lg={5} md={5}>
                <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}>
                  {expedientes.length !== 0 && (
                    <p className="text-center">
                      Total de Expedientes:{' '}
                      <b>{expedientes.ProductividadSucursalesExpedientes.reduce((total, row) => total + row.Total, 0)}</b>
                    </p>
                  )}
                  <DataTable
                    columns={columns}
                    data={expedientes.ProductividadSucursalesExpedientes}
                    fixedHeader
                    dense
                    responsive="true"
                    pagination
                    paginationPerPage={5}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} lg={7} md={7}>
                <Card>
                  <GraficaExpedientes expedientes={expedientes} />
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
                    dense
                    responsive="true"
                    pagination
                    paginationPerPage={8}
                  />
                </Card>
              </Grid>

              <Grid item xs={12} lg={6} md={6}>
                <Card>
                  <div className="row col-12 d-flex pt-2 justify-content-around">
                    <div className="col-lg-4 col-sm-12 ms-2 mt-3 ">
                      <div className="form-floating">
                        <select className="form-select" id="sucInputExpedientes" onChange={filtroSelect} placeholder="estatus" required>
                          <option value="Activa">Activa</option>
                          <option value="Modificada">Modificada</option>
                          <option value="Cancelada">Cancelada</option>
                        </select>
                        <label htmlFor="sucInputExpedientes">Estatus</label>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 pt-4 d-flex justify-content-center">
                      {expedientes.length !== 0 && (
                        <>
                          <p className="mx-2 letra-chica text-success">
                            Activa {expedientes.DetalleProductividadExpediente.reduce((total, row) => total + row.Activa, 0)}
                          </p>
                          <p className="mx-2 letra-chica text-primary">
                            Modificada {expedientes.DetalleProductividadExpediente.reduce((total, row) => total + row.Modificada, 0)}
                          </p>
                          <p className="mx-2 letra-chica text-danger">
                            Cancelada {expedientes.DetalleProductividadExpediente.reduce((total, row) => total + row.Cancelada, 0)}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  {estatus === 'Activa' && <GraficaDetalle expedientes={expedientes} />}
                  {estatus === 'Modificada' && <GraficaModificada expedientes={expedientes} />}
                  {estatus === 'Cancelada' && <GraficaCancelada expedientes={expedientes} />}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
