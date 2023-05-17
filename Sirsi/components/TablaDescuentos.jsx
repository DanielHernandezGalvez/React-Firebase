import React, {useEffect, useState} from 'react'
import FiltrosDescuentos from './FiltroDescuentos'
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import ResumenDescuentos from './ResumenDescuentos';
import GraficaDescuentos from "./GraficaDescuentos"
import DescuentoDetalle from './DescuentoDetalle';

function TablaDescuentos() {
const [dataDescuentos, setDataDescuentos] = useState([])
const [tipoDescuento, setTipoDescuento] = useState("")
const [impTotal, setImpTotal] = useState([])

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
        const data = await response.json()
        console.log("click descuentos", data.data)
        setDataDescuentos(data.data)
        setImpTotal(data.data.ImporteTotal)
      } 
      catch (error) {
        alert(error, "no se pudieron traer los datos")
      }
  };

  useEffect(() => {
    getSucursales();
    fechaActualDescuentos();
  }, []);

  const activarTabla =  (td) => {
    setTipoDescuento(td)
  }

  const columns = [
    {
      name: "Detalle",
      selector: "TipoDescuento",
      sortable: true,
      cell: (row) => (
        <button className='btn' onClick={() => activarTabla(row.TipoDescuento)}>
          <i className='bi bi-search'></i>
        </button>
      ),
    },
    {
        name: "Tipo de Descuento",
        selector: "TipoDescuento",
        sorteable: true
    },
    {
        name: "N. Descuentos",
        selector: "NumDescuentos",
        sorteable: true
    },
    {
        name: "Importe Total",
        selector: "ImporteTotal",
        sorteable: true
    },
    {
        name: "Descuento",
        selector: "Descuento",
        sorteable: true
    },
    {
        name: "Subtotal",
        selector: "Subtotal",
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
        <FiltrosDescuentos getDescuentos={getDescuentos} />   
        <div className='row' > 
        <div className='col-12 col-lg-9' > 
          <DataTableExtensions {...tableData}>
            <DataTable
            columns={columns}
            data={dataDescuentos}
            responsive='true'
            pagination
            fixedHeader
            />
          </DataTableExtensions>
        </div>
        <div className='col-12 col-lg-3 resumen-descuentos'> 
          <ResumenDescuentos />
          </div>
        </div>
        <div className='col-12'> 
          <GraficaDescuentos />
        </div>
        {tipoDescuento && 
        <DescuentoDetalle  tipoDescuento={tipoDescuento} />
      }
  </>
  )
}

export default TablaDescuentos
