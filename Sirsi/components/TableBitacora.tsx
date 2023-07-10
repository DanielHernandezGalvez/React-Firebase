import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import TablaOffCanvasBitacora from './TablaOffCanvasBitacora';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import FiltrosBitacora from './FiltrosBitacora';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, useMediaQuery } from '@mui/material';
import { gridSpacing } from 'store/constant';

export default function TablaBitacora({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }) {
  const [bitacora, setBitacora] = useState([]);
  const [clickID, setClickId] = useState(null);
  const [oderId, setOrderId] = useState(null);
  const [folio, setFolio] = useState(null);
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

      const select = document.getElementById('sucInputBitacora');
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

  const fechaActualBitacora = () => {
    const myDateInput = document.getElementById('fiInputBitacora');
    const ffInputBitacora = document.getElementById('ffInputBitacora');
    const fechaActual = new Date(new Date() - 6 * 60 * 60 * 1000).toISOString().split('T')[0];
    myDateInput.value = fechaActual;
    ffInputBitacora.value = fechaActual;
  };

  const getBitacora = async (event) => {
    event.preventDefault();

    try {
      const fiDate = new Date(document.getElementById('fiInputBitacora').value);
      const ffDate = new Date(document.getElementById('ffInputBitacora').value);
      const fi = Math.floor(fiDate.getTime() / 1000);
      const ff = Math.floor(ffDate.getTime() / 1000);

      const f = document.getElementById('fInputBitacora').value;
      const suc = document.getElementById('sucInputBitacora').value;

      const url = `${process.env.RUTA_API}/sirsi/web/BuscarBitacoraEncabezado?fi=${fi}&ff=${ff}&suc=${suc}&f=${f}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log('click', data.data);
      setBitacora(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSucursales();
    fechaActualBitacora();
  }, []);

  const handleClickId = (id, id2, fol) => {
    setClickId(id);
    setOrderId(id2);
    setFolio(fol);
  };

  const columns = [
    {
      name: 'Folio',
      cell: (row) => (
        <button
          id={row.PacienteId.Int64}
          className="btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
          onClick={() => {
            handleClickId(row.PacienteId.Int64, row.OrdenTrabajoId, row.Folio);
          }}
        >
          {row.Folio}
        </button>
      )
    },
    {
      name: 'OTEn ID',
      selector: 'OrdenTrabajoId',
      sortable: true
    },
    {
      name: 'Folio_Cotizacion',
      selector: 'FolioCotizacion.String',
      sortable: true
    },
    {
      name: 'Fecha',
      selector: 'Fecha.String',
      sortable: true
    },
    {
      name: 'Estatus',
      selector: 'Estatus.String',
      sortable: true
    },
    {
      name: 'Descuento',
      selector: 'Descuento.Float64',
      sortable: true
    },
    {
      name: 'PacId',
      selector: 'PacienteId.Int64',
      sortable: true
    },
    {
      name: 'Paciente',
      selector: 'Paciente.String',
      sortable: true
    },
    {
      name: 'Medico',
      selector: 'Medico.String',
      sortable: true
    },
    {
      name: 'EnviarMedico',
      selector: 'EnviarMedico.Bool',
      sortable: true
    },
    {
      name: 'CorreoMedico',
      selector: 'CorreoMedico.String',
      sortable: true
    },
    {
      name: 'TipoOrden',
      selector: 'TipoOrden.String',
      sortable: true
    },
    {
      name: 'Factura',
      selector: 'Factura.Bool',
      sortable: true
    },
    {
      name: 'EnviarPaciente',
      selector: 'EnviarPaciente.Bool',
      sortable: true
    },
    {
      name: 'CorreoPaciente',
      selector: 'CorreoPaciente.String',
      sortable: true
    },
    {
      name: 'UsuarioAlta',
      selector: 'UsuarioAlta.String',
      sortable: true
    },
    {
      name: 'FechaAlta',
      selector: 'FechaAlta.String',
      sortable: true
    },
    {
      name: 'UsuarioActualiza',
      selector: 'UsuarioActualiza.String',
      sortable: true
    },
    {
      name: 'FechaActualiza',
      selector: 'FechaActualiza.String',
      sortable: true
    }
  ];

  //   const data = [
  //     {
  //       id: 1,
  //       title: "Beetlejuice",
  //       year: "1988",
  //     },
  //     {
  //       id: 2,
  //       title: "Ghostbusters",
  //       year: "1984",
  //     },
  //     {
  //       id: 1,
  //       title: "Beetlejuice",
  //       year: "1988",
  //     },
  //     {
  //       id: 2,
  //       title: "Ghostbusters",
  //       year: "1984",
  //     },
  //     {
  //       id: 1,
  //       title: "Beetlejuice",
  //       year: "1988",
  //     },
  //     {
  //       id: 2,
  //       title: "Ghostbusters",
  //       year: "1984",
  //     },
  //     {
  //       id: 1,
  //       title: "Beetlejuice",
  //       year: "1988",
  //     },
  //     {
  //       id: 2,
  //       title: "Ghostbusters",
  //       year: "1984",
  //     },
  //   ];

  const tableData = {
    columns: columns,
    data: bitacora,
    fileName: 'document',
    export: true,
    print: true,
    filterHidden: true,
    filterDigit: 1
  };

  return (
    <>
      {/*<div className='btnPDFBitacora'>
         <button className='text-end btn-hover btn p-1'>
            <i className='bi bi-filetype-pdf color-icon fs-5'></i>
          </button>

        </div> */}

      <Grid item xs={12}>
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
          <FiltrosBitacora getBitacora={getBitacora} />
        </Card>
      </Grid>

{ bitacora.length !== 0 && 
<>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} >
            <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '10px' }}>
              <DataTableExtensions {...tableData}>
                <DataTable columns={columns} data={bitacora} responsive="true" pagination fixedHeader />
              </DataTableExtensions>
            </Card>
          </Grid>
        </Grid>
        </Grid>
        </>
      }
      <div
        className="offcanvas offcanvas-bottom"
        tabindex="1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
        data-bs-backdrop="false"
        >
        {clickID && <TablaOffCanvasBitacora oderId={oderId} clickID={clickID} folio={folio} handleClickId={handleClickId} />}
      </div>
    </>
  );
}
