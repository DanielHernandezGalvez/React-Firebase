window.addEventListener("load", async () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    let urlSucursales = "https://ms.nucleodediagnostico.com/caphumano/checador/GetAllSucursales"
    const res = await fetch(urlSucursales, requestOptions);
    const data = await res.json();
    console.log(data)

    const option = document.getElementById("inputSucursal");

    let sucursales = `
    <option class="fechas-imput" value="NA">No Filtrar</option>
    `;
    for (let i = 0; i < data.length; i++) {
      let sucursal = data[i];
      sucursales += `
      <option class="fechas-imput" value="${sucursal.sucuid}">Sucursal: ${sucursal.sucunombre}</option>
      `;
    }
    option.innerHTML = sucursales;
  });
