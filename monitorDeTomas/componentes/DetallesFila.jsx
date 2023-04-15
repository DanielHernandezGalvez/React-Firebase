import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { COLUNS_DETAILS_TABLE } from "./funciones/columns";

const DetalleFila = ({ data }) => {
  const [detalle, setDetalle] = useState([]);
  const [filaExpandible, setFilaExpandible] = useState(null);
  const [ultimaFilaExpandida, setUltimaFilaExpandida] = useState(null);
  const [observaciones, setObservaciones] = useState("");
  const [motivo, setMotivo] = useState("");
  const observacionesRef = useRef(null);

  useEffect(() => {
    const fetchOrdenesTrabajo = async () => {
      let requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      try {
        const response = await fetch(
          `http://localhost:8081/sian2/ms/monitor/GetAllOrdenesTrabajo?Id=${data.OrdenTrabajoId}`,
          requestOptions
        );
        const data_d = await response.json();
        console.log(data_d.data);
        setDetalle(
          data_d.data.filter((d) => {
            return d.ProductoId === data.ProductoId;
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrdenesTrabajo();
  }, []);

  const expandableRowsComponent = ({ data }) => {
    const preparacionData = detalle.filter(
      (d) => d.ProductoId === data.ProductoId
    );
    return <div className='p-2 bg-body'>{data.Preparación.String}</div>;
  };

  const handleRowExpand = (rowIndex) => {
    // const newFilaExpandible = filaExpandible === rowIndex ? null : rowIndex;
    // setFilaExpandible(newFilaExpandible); 
         
    if (filaExpandible !== rowIndex) {
      setFilaExpandible(rowIndex);
      if (ultimaFilaExpandida !== null && ultimaFilaExpandida !== rowIndex) {
        setFilaExpandible(null);
      }
      setUltimaFilaExpandida(rowIndex);
    } else {
      setFilaExpandible(null);
      setUltimaFilaExpandida(null);
    }
  };

  const dataTable = {
    columns: COLUNS_DETAILS_TABLE,
    data: detalle,
    expandableRows: true,
    expandableRowsComponent: expandableRowsComponent,
    expandOnRowClicked: true,
    onRowExpandToggled: handleRowExpand,
  };

  return (
    <>
      <DataTable
        {...dataTable}
        expandableRowExpanded={(row) => row === filaExpandible}
        onRowClicked={(row) => setFilaExpandible(row)}
        onRowExpandToggled={(bool, row) => setFilaExpandible(row)}
        highlightOnHover
        striped
        responsive
        className='shadow-lg bg-body'
        defaultSortField='Estudio'
      />

      {/* MODAL */}
      <div className='modal fade' id='modal' tabIndex='-1'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Modificar Observaciones</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <label htmlFor='observaciones' className='form-label'>
                  Observaciones
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='observaciones'
                  ref={observacionesRef}
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Cancelar
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                onClick={() => {
                  sendObser(observacionesRef.current.value)
                  setObservaciones(observacionesRef.current.value);
                }}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

let sendObser = (observaciones)=> {
  // aqui va el fetch para mandar el status pendiente y las observaciones
}

export default DetalleFila;
