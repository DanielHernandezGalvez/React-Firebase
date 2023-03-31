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
    agrega un cero anes del número */
    cell: (row) => {
      const fechaEstimada = new Date(row.FechaEstimada.Time);
      const anio = fechaEstimada.getUTCFullYear();
      const dia = fechaEstimada.getDate().toString().padStart(2, "0");
      const mes = (fechaEstimada.getMonth() + 1).toString().padStart(2, "0");
      const fechaFormateada = `${dia}/${mes}/${anio}`;
      return <div>{fechaFormateada}</div>;
    },
  },
];

export const TABLA_PRINCIPAL_COLUMNS = [
  {
    name: "Producto",
    selector: "ProductoImagen",
    sortable: true,
    cell: (row) => (
      <img
        // src={row.ProductoImagenUrl}
        src={
          "https://dhb3yazwboecu.cloudfront.net/764//laboratorio/frasco-orina-125-ml.jpg"
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
        onClick={() => console.log(`Imprimir ${row.ProductoDescripcion}`)}
      >
        <i class='bi bi-printer'></i>
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

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
        ? `${row.TiempoEstimado} Días`
        : `${row.TiempoEstimado} Día`;
    },
  },
  {
    name: "F. Estimada",
    selector: "FechaEstimada",
    sortable: true,
    format: (row) => {
      return new Date(row.FechaEstimada)
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
    name: "Observaciones",
    selector: "Estatus",
    sortable: true,
  },
];
