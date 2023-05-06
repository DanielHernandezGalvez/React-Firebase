import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TableFloat from "./TableFloat";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import FacturaFilter from "./FacturaFilter";
import BitacorasFilter from "./BitacorasFilter";

export default function TableBitacora() {
  const [bitacora, setBitacora] = useState([]);

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

      const select = document.getElementById("sucInputBitacora");
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

  const getBitacora = async (event) => {
    event.preventDefault();

    try {

      const fiDate = new Date(document.getElementById("fiInputBitacora").value);
      const ffDate = new Date(document.getElementById("ffInputBitacora").value);
      const fi = Math.floor(fiDate.getTime() / 1000);
      const ff = Math.floor(ffDate.getTime() / 1000);

      const f = document.getElementById("fInputBitacora").value;
      const suc = document.getElementById("sucInputBitacora").value;

      const url = `${process.env.RUTA_API}/sirsi/web/BuscarBitacoraEncabezado?fi=${fi}&ff=${ff}&suc=${suc}&f=${f}`;

      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        setBitacora(data.data);
        console.log(bitacora)
      } else {
        alert("Datos no encontrados");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSucursales();
  }, []);

  const columns = [
    {
      name: "OTEn ID",
      cell: (row) => (
        <button
          className='btn'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasBottom'
          aria-controls='offcanvasBottom'
          onClick={() => console.log(row.title)}
        >
          {row.OrdenTrabajoId}
        </button>
      ),
    },
    {
      name: "Folio",
      selector: "Folio",
    },
    {
      name: "Folio_Cotizacion",
      selector: "FolioCotizacion",
    },
    {
      name: "Fecha",
      selector: "Fecha",
    },
    {
      name: "Estatus",
      selector: "Estatus",
    },
    {
      name: "Descuento",
      selector: "Descuento",
    },
    {
      name: "PacId",
      selector: "PacienteId",
    },
    {
      name: "Paciente",
      selector: "Paciente",
    },
    {
      name: "Medico",
      selector: "Medico",
    },
    {
      name: "EnviarMedico",
      selector: "EnviarMedico",
    },
    {
      name: "CorreoMedico",
      selector: "CorreoMedico",
    },
    {
      name: "TipoOrden",
      selector: "TipoOrden",
    },
    {
      name: "Factura",
      selector: "Factura",
    },
    {
      name: "EnviarPaciente",
      selector: "EnviarPaciente",
    },
    {
      name: "CorreoPaciente",
      selector: "CorreoPaciente",
    },
    {
      name: "UsuarioAlta",
      selector: "UsuarioAlta",
    },
    {
      name: "FechaAlta",
      selector: "FechaAlta",
    },
    {
      name: "UsuarioActualiza",
      selector: "UsuarioActualiza",
    },
    {
      name: "FechaActualiza",
      selector: "FechaActualiza",
    },
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

  return (
    <>
      <div
        id='my-bitacora'
        className='col-12 col-xl-10 col-lg-12 col-sm-12 bg-white table-scroll mt-2'
      >
        <h3 className='m-3'>Bitácora</h3>
        {/* <FacturaFilter /> */}
        {/*  <div className='btnPDF'>
         <button className='text-end btn-hover btn p-1'>
            <i className='bi bi-filetype-pdf color-icon fs-5'></i>
          </button> 
        </div>*/}
        <BitacorasFilter getBitacora={getBitacora} />
        {/* <DataTableExtensions> */}
        <DataTable columns={columns} data={bitacora} responsive />
        {/* </DataTableExtensions> */}

        {/* <button
          class='btn btn-primary'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasBottom'
          aria-controls='offcanvasBottom'
        >
          Toggle bottom offcanvas
        </button> */}
        <TableFloat />
      </div>
    </>
  );
}
