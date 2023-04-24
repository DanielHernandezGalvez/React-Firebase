import { APP_CLIENT_INTERNALS } from "next/dist/shared/lib/constants";

/*  Cada objeto representa una columna de una tabla y tiene las siguientes propiedades:
"name": el nombre de la columna
"selector": el nombre de la propiedad del objeto que se usará para llenar la columna
"className": una clase CSS que se aplicará a la celda de la columna en Bootstrap
"sortable": un valor booleano que indica si la columna es ordenable o no
"cell": una función que se usa para personalizar el contenido de la celda de la columna */
export const TABLE_COLUMNS = [
  {
    name: "Orden de trabajo",
    selector: "OrdenDeTrabajo",
    className: "border",
    sortable: true,
  },
  {
    name: "Nombre del Paciente",
    selector: "NombrePaciente",
    className: "border",
    sortable: true,
  },
  {
    name: "Fecha",
    selector: "Fecha",
    className: "border",
    sortable: true,
    /* La función "cell" se usa en las dos últimas columnas para formatear las 
    fechas a la forma deseada, en caso de que el número sea menor a 10, se le 
    agrega un cero antes del número */
    cell: (row) => {
      const fecha = new Date(row.Fecha);
      const dia = fecha.getDate().toString().padStart(2, "0");
      const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
      const anio = fecha.getFullYear();
      const fechaConFormato = `${dia}/${mes}/${anio}`;
      return <div>{fechaConFormato}</div>;
    },
  },

  {
    name: "Fecha Esperada",
    selector: "FechaEstimada.Time",
    className: "",
    sortable: true,
    /* La función "cell" se usa en las dos últimas columnas para formatear las 
    fechas a la forma deseada, en caso de que el número sea menor a 10, se le 
    agrega un cero antes del número */
    cell: (row) => {
      if (row.FechaEstimada.Valid) {
        const fechaEstimada = new Date(row.FechaEstimada.Time);
        const anio = fechaEstimada.getUTCFullYear();
        const dia = fechaEstimada.getDate().toString().padStart(2, "0");
        const mes = (fechaEstimada.getMonth() + 1).toString().padStart(2, "0");
        const fechaFormateada = `${dia}/${mes}/${anio}`;
        return <div>{fechaFormateada}</div>;
      } else {
        return <div>N-D</div>
      }
    },
  },
];

export const handlePrintModalOpen = (row) => {
  let url = `${process.env.RUTA_API}/sian2/ms/monitor/GenerarUnaSolaEtiqueta?f=${row.Folio}&Ip=${localStorage.getItem("ipdelEquipo")}&P=${localStorage.getItem("nombredeimp")}&pid=${row.ProductoId}`;
  document.getElementById("inputToprint").value = row.CantidadEtiquetas;
  document.getElementById("inputToprint").ariaLabel = url;
  document.getElementById("printProductoDescripcion").innerText =
    row.ProductoDescripcion;
  document.getElementById("printEstudios").innerText = row.Estudios;
  document.getElementById("printFolio").innerText = row.Folio;
  console.log(row);
};

export const handleUpdateEstudioModalOpen = (row) => {
  let url = `${process.env.RUTA_API}/sian2/ms/monitor/UpdateEstudio`;
  document.getElementById("observacionesTomas").value = row.ObservacionesTomas.String;
  document.getElementById("observacionesTomas").ariaLabel = url;
  document.getElementById("btn-setstatus").innerText = row.Estatus === "PENDIENTE"?'Cambiar a En Tomas':'Cambiar a Pendiente';
  document.getElementById("observacionesEstudio").innerText = row.Estudio;
  document.getElementById("observacionesArea").innerText = row.Área;
  document.getElementById("observacionesArea").ariaLabel = row.IdOrdenDetalle;
};

export const TABLA_PRINCIPAL_COLUMNS = [
  {
    name: "Producto",
    selector: "ProductoImagen",
    sortable: true,
    cell: (row) => (
      <img
        // src={row.ProductoImagenUrl}
        src={
          "/laboratorio/imgProductos/" + row.ProductoImagen
        }
        alt={row.ProductoDescripcion}
        className='tabla-img'
      />
    ),
  },
  {
    name: "Descripcion",
    selector: "ProductoDescripcion",
    sortable: true,
  },
  {
    name: "Estudios",
    selector: "Estudios",
    sortable: true,
  },
  {
    name: "Fecha",
    selector: "Fecha",
    sortable: true,
    cell: (row) => {
      const fechaOriginal = "2023-03-10";
      const partesFecha = fechaOriginal.split("-");
      const dia = partesFecha[2];
      const mes = partesFecha[1];
      const año = partesFecha[0];
      const fechaConvertida = `${dia}/${mes}/${año}`;
      return <p>{fechaConvertida}</p>;
    },
  },
  {
    name: "Imprimir",
    cell: (row) => (
      <button
        className='btn btn-outline-secondary'
        title={row.Observaciones}
        data-bs-toggle='modal'
        data-bs-target='#modalprint'
        // onClick={() => console.log(`Imprimir ${row.ProductoDescripcion}`)}
        onClick={() => handlePrintModalOpen(row)}
      >
        <i class='bi bi-printer'></i>
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

// 6

export const COLUNS_DETAILS_TABLE = [
  {
    name: "Estudio",
    selector: "Estudio",
    sortable: true,
  },
  {
    name: "Muestra",
    selector: "Muestra",
    sortable: true,
  },
  {
    name: "Contenedor",
    selector: "Contenedor",
    sortable: true,
  },
  {
    name: "Etiquetas",
    selector: "CantidadEtiquetas",
    sortable: true,
  },
  {
    name: "T. Estimado",
    selector: "TiempoEstimado",
    sortable: true,
    format: (row) => {
      return row.TiempoEstimado !== 1
        ? `${row.TiempoEstimado.Int64} Días`
        : `${row.TiempoEstimado.Int64} Día`;
    },
  },
  {
    name: "F. Estimada",
    selector: "FechaEstimada",
    sortable: true,
    format: (row) => {
      return new Date(row.FechaEstimada.Time)
        .toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "/");
    },
  },
  {
    name: "Urgente",
    selector: "Urgente",
    sortable: true,
    format: (row) => {
      return row.Urgente ? "Urgente" : "No Urgente";
    },
  },
  {
    name: "Área",
    selector: "Área",
    sortable: true,
  },
  { 
    name: "Estatus",
    selector: "Estatus",
    sortable: true,
    cell: (row) => {
      return (
        <>
          <span title={row.ObservacionesTomas.String}>{row.Estatus}</span>
        </>
      );
    },
  },
  {
    name: "Cambiar a:",
    selector: "Estatus",
    sortable: true,
    cell: (row) => {
      if (row.Estatus === "PENDIENTE") {
        return (
          <>
            <button
              type='button'
              className='btn btn-outline-secondary text-center'
              id={row.ProductoId}
              data-bs-toggle='modal'
              data-bs-target='#modal'
              title=''
              onmouseover='setTooltipTitle()'
              onClick={() => handleUpdateEstudioModalOpen(row)}
            >
              En Tomas
            </button>
          </>
        );
      } else if (row.Estatus === "EN TOMAS") {
        return (
          <>
            <button
              type='button'
              className='btn btn-outline-secondary text-center'
              id={row.ProductoId}
              data-bs-toggle='modal'
              data-bs-target='#modal'
              title=''
              onmouseover='setTooltipTitle()'
              onClick={() => handleUpdateEstudioModalOpen(row)}
            >
              Pendiente
            </button>
          </>
        );
      } else {
        return <div>{row.Estatus}</div>;
      }
    },
  },
];
