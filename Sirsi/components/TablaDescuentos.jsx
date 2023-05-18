import React, { useEffect, useState } from 'react'
import FiltrosDescuentos from './FiltroDescuentos'
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import ResumenDescuentos from './ResumenDescuentos';
import GraficaDescuentos from "./GraficaDescuentos"
import DescuentoDetalle from './DescuentoDetalle';
import ResumenDescuentosDetalle from "./ResumenDescuentosDetalle"
// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, useMediaQuery } from '@mui/material';
import { gridSpacing } from 'store/constant';

function TablaDescuentos({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }) {
  const [dataDescuentos, setDataDescuentos] = useState([])
  const [tipoDescuento, setTipoDescuento] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [dataDetalle, setDataDetalle] = useState([])

  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const capitalize = (val) => {
    return val
      .toLowerCase()
      .trim()
      .split(" ")
      .map((v) => v[0].toUpperCase() + v.substr(1))
      .join(" ");
  };

  const getSucursales = async () => {

    const url = process.env.RUTA_API + "/sirsi/web/BuscarSucursales?suc=1";

    try {
      const response = await fetch(url);
      let data = [];
      data = await response.json();

      const select = document.getElementById("sucInputDescuentos");
      select.innerHTML = "";
      const option = document.createElement("option");
      option.value = 0;
      option.selected = true;
      option.text = "Todas";
      select.appendChild(option);

      data.data.map((sucursal) => {
        const option = document.createElement("option");
        option.value = sucursal.SucuId;
        option.text = capitalize(sucursal.SucuNombre);
        select.appendChild(option);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fechaActualDescuentos = () => {
    const myDateInput = document.getElementById("fiInputDescuentos");
    const ffInputBitacora = document.getElementById("ffInputDescuentos");
    const fechaActual = new Date(new Date() - 6 * 60 * 60 * 1000).toISOString().split("T")[0];
    myDateInput.value = fechaActual;
    ffInputBitacora.value = fechaActual;
  };

  const getDescuentos = async (event) => {
    event.preventDefault()

    const fiDate = new Date(document.getElementById("fiInputDescuentos").value);
    const ffDate = new Date(document.getElementById("ffInputDescuentos").value);
    const fi = Math.floor(fiDate.getTime() / 1000);
    const ff = Math.floor(ffDate.getTime() / 1000);
    const suc = document.getElementById("sucInputDescuentos").value;
    const url = `${process.env.RUTA_API}/sirsi/web/BuscarDescuentosTotales?IdSucursal=${suc}&Fi=${fi}&Ff=${ff}`

    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json()
        // console.log("click descuentos", data.data)
        setDataDescuentos(data.data)
        setIsOpen(false)
        sessionStorage.setItem('data', JSON.stringify(data.data));
      }
    }
    catch (error) {
      alert(error, "no se pudieron traer los datos")
    }
  };

  useEffect(() => {
    getSucursales();
    fechaActualDescuentos();
  }, []);


  const activarTabla = (td) => {
    // if(td === tipoDescuento) setIsOpen(false)
    setTipoDescuento(td)
    setIsOpen(true)
    console.log(tipoDescuento)
  }

  const columns = [
    {
      name: "Detalle",
      selector: (row) => row.TipoDescuento,
      sortable: true,
      cell: (row) => (
        <button className='btn' onClick={() => activarTabla(row.TipoDescuento)}>
          <i className='bi bi-search'></i>
        </button>
      ),
    },
    {
      name: "Tipo de Descuento",
      selector: (row) => row.TipoDescuento,
      sorteable: true
    },
    {
      name: "N. Descuentos",
      selector: (row) => row.NumDescuentos,
      sorteable: true
    },
    {
      name: "Importe Total",
      selector: (row) => row.ImporteTotal,
      sorteable: true
    },
    {
      name: "Descuento",
      selector: (row) => row.Descuento,
      sorteable: true
    },
    {
      name: "Subtotal",
      selector: (row) => row.Subtotal,
      sorteable: true
    },
  ]

  const tableData = {
    columns: columns,
    data: dataDescuentos,
    fileName: "document",
    export: true,
    print: true,
    filterHidden: true,
    filterDigit: 1,
  };

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
          <FiltrosDescuentos getDescuentos={getDescuentos} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={8} md={7}>
            <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
              <DataTableExtensions {...tableData}>
                <DataTable
                  columns={columns}
                  data={dataDescuentos}
                  responsive='true'
                  pagination
                  fixedHeader
                />
              </DataTableExtensions>
            </Card>
          </Grid>
          
          <Grid item xs={12} lg={4} md={5}>
            <Card  sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
              <h5 className='my-3 fw-bold mx-2'>Resumen</h5>
              </Card>
          </Grid>
              <Grid item xs={12} lg={4} md={5}>
            <Card  sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
              {dataDescuentos.length > 0 ? <ResumenDescuentos dataDescuentos={dataDescuentos} /> : []}
              </Card>
          </Grid>
              <Grid item xs={12} lg={4} md={5}>
            <Card  sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
              {tipoDescuento !== "" && isOpen ? <ResumenDescuentosDetalle dataDetalle={dataDetalle} /> : ""}
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
          {dataDescuentos.length > 0 && <GraficaDescuentos dataDescuentos={dataDescuentos} />}
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
          {isOpen ?
            <DescuentoDetalle tipoDescuento={tipoDescuento} setDataDetalle={setDataDetalle} /> : ""
          }
        </Card>
      </Grid>

    </>
  )
}

export default TablaDescuentos
