import { useState, useEffect } from "react";

function Departamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editDepartamentoId, setEditDepartamentoId] = useState(null);
  const [newDepartamento, setNewDepartamento] = useState({
    DepaDescripcion: "",
  });
  const [editDepartamento, setEditDepartamento] = useState({
    DepaId: null,
    DepaDescripcionE: "",
  });

  useEffect(() => {
    fetch("/departamentos") // replace with the actual API endpoint
      .then((response) => response.json())
      .then((data) => setDepartamentos(data))
      .catch((error) => console.error(error));
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewDepartamento((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleEditInputChange(event) {
    const { name, value } = event.target;
    setEditDepartamento((prevState) => ({ ...prevState, [name]: value }));
  }

  function openAddModal() {
    setModalAddOpen(true);
  }

  function closeAddModal() {
    setModalAddOpen(false);
    setNewDepartamento({ DepaDescripcion: "" });
  }

  function openEditModal(id) {
    setModalEditOpen(true);
    setEditDepartamentoId(id);
    const departamento = departamentos.find((d) => d.DepaId === id);
    setEditDepartamento({
      DepaId: departamento.DepaId,
      DepaDescripcionE: departamento.DepaDescripcion,
    });
  }

  function closeEditModal() {
    setModalEditOpen(false);
    setEditDepartamentoId(null);
    setEditDepartamento({ DepaId: null, DepaDescripcionE: "" });
  }

  function addDepartamento() {
    fetch("/departamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDepartamento),
    })
      .then((response) => response.json())
      .then((data) => {
        setDepartamentos((prevState) => [...prevState, data]);
        closeAddModal();
      })
      .catch((error) => console.error(error));
  }

  function editDepartamento() {
    fetch(`/departamentos/${editDepartamento.DepaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editDepartamento),
    })
      .then((response) => response.json())
      .then((data) => {
        setDepartamentos((prevState) => {
          const index = prevState.findIndex((d) => d.DepaId === data.DepaId);
          const newDepartamentos = [...prevState];
          newDepartamentos[index] = data;
          return newDepartamentos;
        });
        closeEditModal();
      })
      .catch((error) => console.error(error));
  }

  function deleteDepartamento(id) {
    fetch(`/departamentos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setDepartamentos((prevState) =>
          prevState.filter((d) => d.DepaId !== id)
        );
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div class='dt-card dt-card__full-height'>
        <div class='dt-card__header' style='justify-self'>
          <h4 class='mb--15'>Departamentos</h4>
          <div>
            <button
              class='btn btn-success'
              data-toggle='modal'
              data-target='#Add'
              id='btnAgregarDepartamentos'
            >
              Agregar Departamento
            </button>
          </div>
        </div>
        <div class='card-body'>
          <table class='table' id='table3'>
            <thead>
              <tr>
                <th scope='col'>Descripción</th>
                <th class='accionesEnd'>Acciones</th>
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
                    {/* <a href="" data-toggle="tooltip" data-placement="top" title="Eliminar" onclick="DeleteDepartamento(@ins.DepaId)">
                    <i className="material-icons text-danger EliminarDepartamentos">delete</i>
                  </a> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      @*Agregar YA MOSTRANDO EL MODAL*@
      <div
        class='modal fade'
        id='Add'
        tabindex='-1'
        role='dialog'
        aria-hidden='true'
      >
        <div class='modal-dialog' style='max-width:45em;' role='document'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title'>Agregar Departamento</h5>
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
                id='AddDepartamento'
                asp-controller='Departamentos'
                asp-action='Add'
                method='POST'
              >
                <div class='form-group row'>
                  <label class='col-sm-2 col-form-label'>Descripcion</label>
                  <div class='col-sm-10'>
                    <input
                      type='text'
                      class='form-control col-sm-10 col-form-label'
                      name='DepaDescripcion'
                      id='DepaDescripcion'
                      maxlength='50'
                      placeholder='Descripcion'
                      autocomplete='off'
                      required
                    />
                  </div>
                </div>
                <div class='form-group float-right'>
                  <button
                    type='button'
                    id='btnAddDepartamento'
                    onclick='AddDepartamento()'
                    class='btn btn-success'
                  >
                    Agregar
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
      @*Editar FORMULARIO YA EN MODAL*@
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
    </>
  );
}
