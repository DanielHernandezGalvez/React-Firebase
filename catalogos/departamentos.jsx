import React from "react";
import { useEffect, useRef } from "react";
import $ from "jquery";
import DataTable from "datatables.net-dt";
import AddDepartameto from "./departamentos.js";
import openModalEdit from "./openModalEdit.js";
import EditDepartamento from "./EditDepartamento.js";
import AsignarPermisosDepartamentos from "./AsignarPermisosDepartamentos.js";

export default function Departamentos() {
  const tableRef = useRef();

  useEffect(() => {
    $(tableRef.current).DataTable({
      searching: true,
      lengthChange: false,
      info: false,
    });

    return () => {
      DataTable.destroy(true);
    };
  }, []);

  return (
    <>
    <AsignarPermisosDepartamentos />
      <div className='dt-card dt-card__full-height'>
        <AddDepartameto />
        <div className='dt-card__header' style={{ justifySelf: "center" }}>
          <h4 className='mb--15'>Departamentos</h4>
          <div>
            <button
              className='btn btn-success'
              data-toggle='modal'
              data-target='#Add'
              id='btnAgregarDepartamentos'
            >
              Agregar Departamento
            </button>
          </div>
        </div>
        <div className='card-body'>
          <table ref={tableRef} className='table' id='table3'>
            <thead>
              <tr>
                <th scope='col'>Descripción</th>
                <th className='accionesEnd'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {departamentos.map((dep) => (
                <tr key={dep.DepaId}>
                  <td>{dep.DepaDescripcion}</td>
                  <td className='accionesEnd'>
                    <a
                      href='#'
                      data-toggle='tooltip'
                      data-placement='top'
                      title='Editar'
                      onClick={() => openModalEdit(dep.DepaId)}
                    >
                      <i className='material-icons text-warning EditarDepartamentos'>
                        edit
                      </i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Agregar YA MOSTRANDO EL MODAL */}
        <div
          className='modal fade'
          id='Add'
          tabIndex='-1'
          role='dialog'
          aria-hidden='true'
        >
          <div
            className='modal-dialog'
            style={{ maxWidth: "45em" }}
            role='document'
          >
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Agregar Departamento</h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
               <EditDepartamento />
              </div>
            </div>
          </div>
        </div>

        {/* Editar FORMULARIO YA EN MODAL */}
        <openModalEdit />
        <div
          class='modal fade'
          id='Edit'
          tabindex='-1'
          role='dialog'
          aria-hidden='true'
        >
          <div class='modal-dialog' style='max-width:45em;' role='document'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h5 class='modal-title'>Editar Departamento</h5>
                <button
                  type='button'
                  class='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div class='modal-body'>
                <form
                  id='EditDepartamento'
                  asp-controller='Departamentos'
                  asp-action='EditDepartamento'
                  method='POST'
                >
                  <input type='hidden' />
                  <input type='hidden' id='Id' name='Id' />
                  <div class='form-group row'>
                    <label class='col-sm-2 col-form-label'>Descripción</label>
                    <div class='col-sm-10'>
                      <input
                        type='text'
                        class='form-control col-sm-10 col-form-label'
                        name='DepaDescripcionE'
                        id='DepaDescripcionE'
                        placeholder='Descripción'
                        autocomplete='off'
                        required
                      />
                    </div>
                  </div>
                  <div class='form-group float-right'>
                    <button
                      type='button'
                      id='btnEditDepartamento'
                      onclick='EditDepartamento()'
                      class='btn btn-success'
                    >
                      Guardar
                    </button>
                    <button data-dismiss='modal' class='btn btn-danger'>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
