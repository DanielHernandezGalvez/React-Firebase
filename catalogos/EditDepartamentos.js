import React from "react";
import Swal from "sweetalert2";
import $ from "jquery";
import "jquery-validation";

function EditDepartamento() {

    function handleSubmit(event) {
        event.preventDefault();
        var x = $("#EditDepartamento").valid();
        if (x != false) {
            Swal.fire({
                title: '¿Desea Guardar los cambios?',
                text: "¡No se podrá revertir!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.value) {
                    var depa_ = {
                        DepaId: $("#Id").val(),
                        DepaDescripcion: $("#DepaDescripcionE").val()
                    }
                    $.ajax({
                        type: "POST",
                        url: "/EditDepartamento",
                        data: { depa: depa_ },
                        beforeSend: function () {
                            $("#btnEditDepartamento").prop("disabled", true);
                            Swal.fire({
                                title: 'Guardando...',
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                showConfirmButton: false,
                                onOpen: () => {
                                    Swal.showLoading();
                                }
                            });
                        },
                        complete: function (data) {
                            Swal({
                                type: 'success',
                                title: '¡Listo!.',
                                text: "Se ha guardado con éxito"
                            }).then((result) => {
                                location.reload();
                            });
                        },
                        error: function (data) {
                            alert('ERROR AL OBTENER DATOS');
                        }
                    });
                }
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} id="EditDepartamento">
                  <div className='form-group row'>
                    <label className='col-sm-2 col-form-label'>
                      Descripcion
                    </label>
                    <div className='col-sm-10'>
                      <input
                        type='text'
                        className='form-control col-sm-10 col-form-label'
                        name='DepaDescripcion'
                        id='DepaDescripcion'
                        maxLength='50'
                        placeholder='Descripcion'
                        autoComplete='off'
                        required
                      />
                    </div>
                  </div>
                  <div className='form-group float-right'>
                    <button
                      type='button'
                      id='btnAddDepartamento'
                      onClick={addDepartamento}
                      className='btn btn-success'
                    >
                      Agregar
                    </button>
                    <button data-dismiss='modal' className='btn btn-danger'>
                      Cancelar
                    </button>
                  </div>
        </form>
    );
}

export default EditDepartamento;
