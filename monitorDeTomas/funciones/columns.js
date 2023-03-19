export const TABLE_COLUMNS = [
  {
    name: "Orden de trabajo",
    selector: "orden",
    className: "border",
  },
  {
    name: "Nombre del Paciente",
    selector: "nombre",
    className: "border",
  },
  {
    // Formateo de fechas
    name: "Fecha",
    selector: "fecha",
    className: "border",
  },
  {
    name: "Fecha Esperada",
    selector: "fechaesperada",
    className: "border",
  },
  {
    name: "",
    cell: (row) => (
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#row-${row.id}`}
        aria-expanded="false"
        aria-controls={`row-${row.id}`}
      >
        ver
      </button>
    ),
  },
];
