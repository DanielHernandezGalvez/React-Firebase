import { Turret_Road } from "next/font/google";

// ------------ FUNCION AGREGAR ----------------
export function AddDepartamento() {
  event.preventDefault();

  let x = $("#AddDepartamento").valid(); // ATENCIÓN AQUÍ

  
  if (x != false) {
    Swal.fire({
      title: "¿Desea Guardar?",
      text: "¡No se podrá revertir!",
      type: "warning",
      showCancelButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.value) {
        let depa = {
          Depadescripcion: $("#DepaDescripcion").val(), // PRESTA SUMA ATENCIÓN EN LOS NOMBRES DE LAS VARIABLES, DEBEN SER IGUALES
        };
        $.ajax({
          type: "POST",
          url: "/AddDepartamento",
          data: { depa: depa }, // EL PRIMER NOMBRE ES LA VARIABLE QUE ALMACENA TODO EN EL CONTROLADOR, LA SEGUNDA ES LA QUE ESTÁ DECLARANDO EN LA NOTA ANTERIOR
          beforeSend: function () {
            $("#btnAddDepartamento").prop("disabled", true); // ES EL NOMBRE DEL BOTÓN EN EL HTML, LOS NOMBRES DEBEN SER IGUALES
            Swal.fire({
              title: "Guardado...",
              allowEscapeKey: true,
              allowOutsideClick: true,
              showConfirmButton: false,
              onOpen: () => {
                Swal.showLoading();
              },
            });
          },
          complete: function (data) {
            swal({
              type: "succes",
              title: "¡Listo!",
              text: "Se ha guardado con éxito",
            }).then((result) => {
              location.reload();
            });
          },
        });
      }
    });
  }
}

// ------------------------ FUNCIÓN DE ABRIR EL MODAL ------------------------
// NOTA: NO OLVIDES REVISAR BIEN EL NOMBRE DE TUS VARIABLES
export function OpenModalEdit(Id) {
  event.preventDefault();
  $.ajax({
    type: "GET",
    url: "/DepartamentoById" + Id,
    success: function (response) {
      $("#Edit").modal("show");
      $("#Id").val(response.depaId);
      $("#DepaDescripcionE").val(response.userName); // LOS NOMBRES DE LAS VARIABLES, NO LO OLVIDES
    },
    error: function (err) {
      console.log(err);
    },
  });
}

// ------------------------ FUNCIÓN DE EDICIÓN DE DATOS ------------------------
// NOTA: NO OLVIDES REVISAR BIEN EL NOMBRE DE TUS VARIABLES
export function EditDepartamento() {
  event.preventDefault();
  let x = $("#EditDepartamento").valid(); // EDITA EL NOMBRE
  if (x != false) {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      text: "¡No se podrá revertir!",
      type: "warning",
      ShowCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.value) {
        let depa_ = {
          // EDITA LOS NOMBRES DE LAS VARIABLES
          DepaId: $("#Id").val(),
          DepaDescripcion: $("#DepaDescripcionE").val(),
        };
        $.ajax({
          type: "POST",
          url: "/EditDepartamento", // EDITA EL NOMBRE
          data: { depa: depa_ },
          beforeSend: function () {
            $("#btnEditDepartamento").prop("disabled", true); // EDITA EL NOMBRE
            Swal.fire({
              title: "Guardando...",
              allowEscapeKey: false,
              allowOutsideClick: false,
              showConfirmButtpm: false,
              onOpen: () => {
                Swal.showLoading();
              },
            });
          },
          complete: function (data) {
            swal({
              type: "success",
              title: "¡Listo!",
              text: "Se ha guardado con éxito",
            }).then((result) => {
              location.reload();
            });
          },
          error: function (data) {
            alert("ERROR AL OBTENER DATOS");
          },
        });
      }
    });
  }
}

$(document).ready(function () {
  AsignarPermisosDepartamentos();
});

function AsignarPermisosDepartamentos() {
  $.ajax({
    type: "GET",
    url: "/PermisosDepartamentos/",
    success: function (data) {
      if (data.banderaPermisos == true) {
        alert(
          "No tienes permiso para ver esta página. Redireccionando al Home"
        );
        window.location.href = "/home";
      } else {
        // Validación para URPCREAR
        if (data.listaPermisos[0].uprCrear == true) {
          $("#btnAgregarDepartamentos").show();
        } else {
          $("#btnAgregarDepartamentos").hide();
        }

        // Validación para UPRCREAR
        if (data.listaPermisos[0].urpMostrar != true) {
          window.location.href = "/home";
        }

        // Validación para URPMODIFICAR
        if (data.listaPermisos[0].urpModificar == true) {
          $(".EditarDepartamentos").show();
        } else {
          $(".EditarDepartamentos").hide();
        }

        // Validación para UPRELIMINAR
        if (data.listaPermisos[0].urpEliminar == true) {
          $(".EliminarDepartamentos").show();
        } else {
          $(".EliminarDepartamentos").hide();
        }
      }
    },
  });
}
