
window.addEventListener("load", async () => {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  let url = "https://ms.nucleodediagnostico.com/caphumano/checador/GetAllPeriodos"
  const response = await fetch(url, requestOptions);
  const data = await response.json();

  console.log(data)


  const option = document.getElementById("inputCorte");
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  let cortes = ""
  for (let i = 0; i < data.length; i++) {
    let corte = data[i];

    let cerrado = "";
    if(corte.fechacerrado.Valid) cerrado = ", cerrado el " + new Date(corte.fechacerrado).toLocaleDateString('es-MX', options);

    let corteinicio = new Date(corte.fechadesde.replace("Z", ""))
    let cortefin = new Date(corte.fechahasta.replace("Z", ""))
    let hoy = new Date()
    let selected = ""
    cortefin.setUTCHours(23)

    if(hoy >= corteinicio && hoy <= cortefin)  selected = "selected"
    cortes += `
    <option class="fechas-imput" value="${corte.id}" ${selected}>${corte.num}: del ${corteinicio.toLocaleDateString('es-MX', options)} al ${cortefin.toLocaleDateString('es-MX', options)} ${cerrado}</span></option>
    `;
  }
  option.innerHTML = cortes;
});
