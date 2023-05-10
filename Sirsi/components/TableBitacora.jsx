import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TableFloatBitacora from "./TableFloatBitacora";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import BitacorasFilter from "./BitacorasFilter";

export default function TableBitacora() {
  const [bitacora, setBitacora] = useState([]);
  const [clickID, setClickId] = useState(null);
  const [oderId, setOrderId] = useState(null);

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
      const today = new Date().toISOString().split('T')[0];  
      const fiDate = new Date(document.getElementById("fiInputBitacora").value);
      fiDate.value =  today
      const ffDate = new Date(document.getElementById("ffInputBitacora").value);
      const fi = Math.floor(fiDate.getTime() / 1000);
      const ff = Math.floor(ffDate.getTime() / 1000);

      const f = document.getElementById("fInputBitacora").value;
      const suc = document.getElementById("sucInputBitacora").value;

      const url = `${process.env.RUTA_API}/sirsi/web/BuscarBitacoraEncabezado?fi=${fi}&ff=${ff}&suc=${suc}&f=${f}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log("click", data.data);
      setBitacora(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSucursales();
  }, []);

  const handleClickId = (id, id2) => {
    setClickId(id);
    setOrderId(id2);
  };

  const columns = [
    {
      name: "OTEn ID",
      cell: (row) => (
        <button
          id={row.PacienteId.Int64}
          className='btn'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasBottom'
          aria-controls='offcanvasBottom'
          onClick={() => {
            handleClickId(row.PacienteId.Int64, row.OrdenTrabajoId);
          }}
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
      selector: "FolioCotizacion.String",
    },
    {
      name: "Fecha",
      selector: "Fecha.String",
    },
    {
      name: "Estatus",
      selector: "Estatus.String",
    },
    {
      name: "Descuento",
      selector: "Descuento.Float64",
    },
    {
      name: "PacId",
      selector: "PacienteId.Int64",
    },
    {
      name: "Paciente",
      selector: "Paciente.String",
    },
    {
      name: "Medico",
      selector: "Medico.String",
    },
    {
      name: "EnviarMedico",
      selector: "EnviarMedico.Bool",
    },
    {
      name: "CorreoMedico",
      selector: "CorreoMedico.String",
    },
    {
      name: "TipoOrden",
      selector: "TipoOrden.String",
    },
    {
      name: "Factura",
      selector: "Factura.Bool",
    },
    {
      name: "EnviarPaciente",
      selector: "EnviarPaciente.Bool",
    },
    {
      name: "CorreoPaciente",
      selector: "CorreoPaciente.String",
    },
    {
      name: "UsuarioAlta",
      selector: "UsuarioAlta.String",
    },
    {
      name: "FechaAlta",
      selector: "FechaAlta.String",
    },
    {
      name: "UsuarioActualiza",
      selector: "UsuarioActualiza.String",
    },
    {
      name: "FechaActualiza",
      selector: "FechaActualiza.String",
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

  const tableData = {
    columns: columns,
    data: bitacora,
    fileName: "document",
    export: true,
    print: true,
    filterHidden: true,
    filterDigit: 1,
  };

  return (
    <>
      <div
        id='my-bitacora'
        className='col-12 col-xl-10 col-lg-12 col-sm-12 bg-white table-scroll mt-2'
      >
        <h3 className='m-3'>Bitácora</h3>
        {/*<div className='btnPDFBitacora'>
         <button className='text-end btn-hover btn p-1'>
            <i className='bi bi-filetype-pdf color-icon fs-5'></i>
          </button>

        </div> */}
        <BitacorasFilter getBitacora={getBitacora} />
        <DataTableExtensions {...tableData}>
          <DataTable
            columns={columns}
            data={bitacora}
            responsive='true'
            pagination
            fixedHeader
            fixedHeaderScrollHeight='600px'
          />
        </DataTableExtensions>


        <div
          className='offcanvas offcanvas-bottom pb-5'
          tabindex='-1'
          id='offcanvasBottom'
          aria-labelledby='offcanvasBottomLabel'
        >
          {clickID && (
            <TableFloatBitacora
              oderId={oderId}
              clickID={clickID}
              handleClickId={handleClickId}
            />
          )}
        </div>
      </div>
    </>
  );
}
