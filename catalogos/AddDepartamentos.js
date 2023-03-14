import $ from "jquery";
import Swal from "sweetalert2";

const AddDepartamento = () => {
  const addDepartamento = (event) => {
    event.preventDefault();

    let x = $("#AddDepartamento").valid();

    if (x != false) {
      Swal.fire({
        title: "¿Desea Guardar?",
        text: "¡No se podrá revertir!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.value) {
          let depa = {
            DepaDescripcion: $("#DepaDescripcion").val(),
          };
          $.ajax({
            type: "POST",
            url: "/AddDepartamento",
            data: { depa: depa },
            beforeSend: function () {
              $("#btnAddDepartamento").prop("disabled", true);
              Swal.fire({
                title: "Guardando...",
                allowEscapeKey: true,
                allowOutsideClick: true,
                showConfirmButton: false,
                onOpen: () => {
                  Swal.showLoading();
                },
              });
            },
            complete: function (data) {
              Swal({
                type: "success",
                title: "¡Listo!.",
                text: "Se ha guardado con éxito",
              }).then((result) => {
                location.reload();
              });
            },
          });
        }
      });
    }
  };

  return (
    <button onClick={addDepartamento} className='btn btn-primary'>
      Agregar Departamento
    </button>
  );
};
export default AddDepartamento;
