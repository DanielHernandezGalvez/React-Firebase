// const response = await fetch("./fakeApi.json");
// const user = await response.json();

// window.addEventListener("load", async () => {
//   let requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };

//   let url = "https://ms.nucleodediagnostico.com/caphumano/checador/GetAllPeriodos"
//   const response = await fetch(url, requestOptions);
//   const data = await response.json();

//   const option = document.getElementById("inputCorte");
//   const options = { day: 'numeric', month: 'long', year: 'numeric' };

//   const year = document.getElementsByClassName("yearFilter");
//   const years = document.getElementById("years")

//   let cortes = ""
//   for (let i = 0; i < data.length; i++) {
//     let corte = data[i];

//     let cerrado = "";
//     if(corte.fechacerrado.Valid) cerrado = ", cerrado el " + new Date(corte.fechacerrado).toLocaleDateString('es-MX', options);

//     let corteinicio = new Date(corte.fechadesde.replace("Z", ""))
//     let cortefin = new Date(corte.fechahasta.replace("Z", ""))

//     let hoy = new Date()
//     let selected = ""
//     cortefin.setUTCHours(23)
//     console.log(year.value)

//     if(hoy >= corteinicio && hoy <= cortefin)  selected = "selected"

//       cortes += `
//       <option class="fechas-imput" value="${corte.id}" ${selected}>Periodo ${corte.num}: del ${corteinicio.toLocaleDateString('es-MX', options)} al ${cortefin.toLocaleDateString('es-MX', options)} ${cerrado}</span></option>
//       `;
//     }
//     option.innerHTML = cortes;
// });

///////////////////////////////////
// APLICACIÓN DEL FILTRO POR AÑO //
///////////////////////////////////

let cortes_data;

window.addEventListener("load", async () => {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let url =
    "https://ms.nucleodediagnostico.com/caphumano/checador/GetAllPeriodos";
  const response = await fetch(url, requestOptions);
  cortes_data = await response.json();

  fillCortes();
});

let fillCortes = () => {
  const option = document.getElementById("inputCorte");
  const options = { day: "numeric", month: "long", year: "numeric" };

  const yearInput = document.getElementById("inputYear");
  const selectedYear = parseInt(yearInput.value);

  let cortes = "";
  for (let i = 0; i < cortes_data.length; i++) {
    let corte = cortes_data[i];

    let cerrado = "";
    if (corte.fechacerrado.Valid) {
      cerrado =
        ", cerrado el " +
        new Date(corte.fechacerrado).toLocaleDateString("es-MX", options);
    }
    let corteinicio = new Date(corte.fechadesde.replace("Z", ""));
    let cortefin = new Date(corte.fechahasta.replace("Z", ""));

    cortefin.setUTCHours(23);

    if (
      selectedYear === cortefin.getFullYear() ||
      yearInput.value === "sinFiltro"
    ) {
      let hoy = new Date();
      let selected = "";
      if (hoy >= corteinicio && hoy <= cortefin) selected = "selected";

      cortes += `
        <option class="fechas-imput" value="${corte.id}" ${selected}>
          Periodo ${corte.num}: del ${corteinicio.toLocaleDateString(
        "es-MX",
        options
      )} al ${cortefin.toLocaleDateString("es-MX", options)} ${cerrado}
        </option>
      `;
    }
  }
  option.innerHTML = cortes;
};
