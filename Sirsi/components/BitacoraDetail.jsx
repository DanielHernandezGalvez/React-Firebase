import React from "react";
import DataTable from "react-data-table-component";

export default function BitacoraDetail({ cambioEncabezado, activeSection }) {
  // Traer el data-table component
  const columnsEncabezados = [
    {
      name: "Campo",
      selector: "Campo.String",
      sortable: true,
    },
    {
      name: "Campo1",
      selector: "Campo1.String",
      sortable: true,
    },
    {
      name: "Antes",
      selector: "Antes.String",
      sortable: true,
    },
    {
      name: "Despues",
      selector: "Descuento.Float64",
      sortable: true,
    },
    {
      name: "OrdenTrabajo",
      selector: "OrdenTrabajo.String",
      sortable: true,
    },
  ];

  const columnsDetalle = [
    {
      name: "Campo",
      selector: "Campo.String",
      sortable: true,
    },
    {
      name: "Campo1",
      selector: "Campo1.String",
      sortable: true,
    },
    {
      name: "Antes",
      selector: "Antes.String",
      sortable: true,
    },
    {
      name: "Despues",
      selector: "Despues.String",
      sortable: true,
    },
    {
      name: "Estudio",
      selector: "Estudio.String",
      sortable: true,
    },
    {
      name: "Estatus",
      selector: "Estatus.String",
      sortable: true,
    },
  ];

  const columnPagos = [
    {
      name: "Campo",
      selector: "Campo.String",
      sortable: true,
    },
    {
      name: "Campo1",
      selector: "Campo1.String",
      sortable: true,
    },
    {
      name: "Antes",
      selector: "Antes.String",
      sortable: true,
    },
    {
      name: "Despues",
      selector: "Despues.String",
      sortable: true,
    },
    {
      name: "TipoPago",
      selector: "TipoPago.String",
      sortable: true,
    },
    {
      name: "Estatus",
      selector: "Estatus.String",
      sortable: true,
    },
  ];

  const columnsPacientes = [
    {
      name: "Campo",
      selector: "Campo.String",
      sortable: true,
    },
    {
      name: "Campo1",
      selector: "Campo1.String",
      sortable: true,
    },
    {
      name: "Antes",
      selector: "Antes.String",
      sortable: true,
    },
    {
      name: "Despues",
      selector: "Despues.String",
      sortable: true,
    },
  ];

  return (
    <>
      <div className='col-12 col-xxl-7 col-xl-12 col-sm-12 table-responsive'>

        {activeSection === "Encabezado" && (
          <DataTable data={cambioEncabezado} columns={columnsEncabezados} />
        )}

        {activeSection === "Detalle" && (
          <DataTable data={cambioEncabezado} columns={columnsDetalle} />
        )}

        {activeSection === "Pagos" && (
          <DataTable data={cambioEncabezado} columns={columnPagos} />
        )}

        {activeSection === "Pacientes" && (
          <DataTable data={cambioEncabezado} columns={columnsPacientes} />
        )}

      </div>
    </>
  );
}
