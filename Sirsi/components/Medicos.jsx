import React, { useEffect, useState } from 'react';
import FiltrosMedicos from './FiltrosMedicos';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, useMediaQuery } from '@mui/material';
import { gridSpacing } from 'store/constant';
import DenseTable from './DenseTable';
import { set } from 'lodash';
import TablaEstudio from "./TablaEstudio"

export default function Medicos({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }) {
  const [dataMedicos, setDataMedicos] = useState([]);
  const [dataDetalle, setDataDetalle] =useState([])
  const [id, setId] = useState(null)
  const [dataEstudio, setDataEstudio] =useState([])


  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const fechaActual = () => {
    const myDateInput = document.getElementById('fiInputMedicos');
    const myDateInp = document.getElementById('ffInputMedicos');
    const fechaActual = new Date(new Date() - 6 * 60 * 60 * 1000).toISOString().split('T')[0];
    myDateInput.value = fechaActual;
    myDateInp.value = fechaActual;
  };

  const getDataMedicos = async (event) => {
    event.preventDefault();

    const fiDate = new Date(document.getElementById('fiInputMedicos').value);
    const ffDate = new Date(document.getElementById('ffInputMedicos').value);
    const fi = Math.floor(fiDate.getTime() / 1000);
    const ff = Math.floor(ffDate.getTime() / 1000);
    const cancel = document.getElementById('canceladoCkeck').value;
    const url = `${process.env.RUTA_API}/sirsi/web/ProductividadMedicos?Fi=${fi}&Ff=${ff}&checked=${cancel}`;

    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data.data);
        setDataMedicos(data.data.ProductividadDoctores);
        setDataDetalle(data.data.ProductividadDoctoresDetalles)
      }
    } catch (error) {
      alert(error, 'error al traer datos');
    }
  };

  const getEstudio = async (event) => {
    event.preventDefault();

    const fiDate = new Date(document.getElementById('fiInputMedicos').value);
    const ffDate = new Date(document.getElementById('ffInputMedicos').value);
    const fi = Math.floor(fiDate.getTime() / 1000);
    const ff = Math.floor(ffDate.getTime() / 1000);
    const url2 = `${process.env.RUTA_API}/sirsi/web/BuscarDetallesTecnicoDental?Fi=${fi}&Ff=${ff}&Id=${id}`

    try {
      if(id !== null){
        const res = await fetch(url2)
        if(res.status === 200) {
          const data = res.json()
          console.log(data.data)
          setDataEstudio(data.data)
        }
      }
    } catch (error) {
      alert("error al traer los datos")
    }
  };

  useEffect(() => {
    fechaActual();
  }, []);

  useEffect(() => {
    if(id !== null) {
      getEstudio()
    }
 }, [] )



  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
          <FiltrosMedicos getDataMedicos={getDataMedicos} />
        </Card>
      </Grid>

      {dataMedicos.length !== 0 && (
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={5} md={5}>
              <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}>
                <DenseTable dataMedicos={dataMedicos} setId={setId}  /> 
              </Card>
            </Grid>
            <Grid item xs={12} lg={7} md={7}>
              <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}>
                {/* <DenseTable dataMedicos={dataMedicos} setId={setId} /> */} Tabla primaria Otra Tabla
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={5} md={5}>
            <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}>
             {id !== null && (
              <TablaEstudio dataEstudio={dataEstudio} /> 
             )} 
            </Card>
          </Grid>
          <Grid item xs={12} lg={7} md={7}>
            <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}>
              {/* <DenseTable dataMedicos={dataMedicos} /> */} Tabla primaria Otra Tabla
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
