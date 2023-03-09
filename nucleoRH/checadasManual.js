const form = document.querySelector("#myForm");
form.addEventListener("submit", (event) => {
  console.log("Hola");
  event.preventDefault();

  const fecha = document.querySelector("#fechaInput").value;
  const hora = document.querySelector("#horaInput").value;
  let datetime = new Date(fecha + " " + hora)
  datetime.setHours(datetime.getHours()- 6)

  let fechaunix = Math.floor(datetime.getTime() / 1000)
  let nomina = parseInt(document.getElementById("numeroEmpleado").innerText)
  console.log(fechaunix)
  fetch(
    "https://ms.nucleodediagnostico.com/caphumano/checador/InsertCheckManually",
    {
      method: "POST",
      body: JSON.stringify({ nomina, fechaunix }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        console.log("Los datos se han enviado correctamente");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Recarga la página para ver los cambios',
          showConfirmButton: false,
          timer: 3000
        })
      } else {
        console.error("Error en la respuesta del servidor:", response.status);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal, inténtalo más tarde',
        })
      }
    })
    .catch((error) => {
      console.error("Ha ocurrido un error al enviar los datos:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal, inténtalo más tarde',
      })
    });
});

let myForm = document.getElementById("myForm");

myForm.addEventListener("submit", (event) => {
  let now = new Date();

  let fechaInput = new Date(
    document.getElementById("fechaInput").value + "T00:00:00Z"
  );
  let horaInput = document.getElementById("horaInput").value.split(":");
  let horaInputDate = new Date().setHours(horaInput[0], horaInput[1], 0);

  if (fechaInput > now || horaInputDate > now) {
    event.preventDefault();
    alert(
      "La fecha y hora introducidas no pueden ser posteriores a la fecha y hora actual."
    );
  }
});

