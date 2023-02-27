// ✔ descargar dentro del detalle siempre sin firma
// ✔ agregar botón offcanvas live demo btn normal que se abra desde el detalle del usuario que se despliegue desde la derecha
// ✔ dentro del canvas poner un input para poner fecha, hora y confirmación (poner alerta), que tenga nombre y numero de nomina
// ✔ ocultar botón de + cuando no haya tabla desplegada
// para agregar checada se avisa que se debe recargar la página
// en el aviso de se recargaron correctamente poner aviso que que se debe recargar
// ✔ la fecha de incerción no puede ser mayor a hoy
// hacer filtro por año, agregar otro input del lado izquierdo para que se filtren los periodos
// ✔ agregar un titulo para ver por hover el nombre de la sucursal en los check

const form = document.querySelector("#myForm");
form.addEventListener("submit", (event) => {
  console.log("Hola");
  event.preventDefault();

  const fecha = document.querySelector("#fechaInput").value;
  const hora = document.querySelector("#horaInput").value;
  let fechaunix = parseInt(
    (new Date(fecha + " " + hora).getTimezoneOffset() / 1000).toFixed(0)
  );
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
        alert("¡Gracias por enviar los datos!");
      } else {
        console.error("Error en la respuesta del servidor:", response.status);
        alert(
          "Ha ocurrido un error al enviar los datos. Por favor, inténtalo de nuevo más tarde."
        );
      }
    })
    .catch((error) => {
      console.error("Ha ocurrido un error al enviar los datos:", error);
      alert(
        "Ha ocurrido un error al enviar los datos. Por favor, inténtalo de nuevo más tarde."
      );
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
