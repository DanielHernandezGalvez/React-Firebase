const fecha = new Date();
const dia: string | number = fecha.getDate();
const mes: string | number = fecha.getMonth() + 1;
const anio: number = fecha.getFullYear();

let diaStr: string | number = dia;
let mesStr: string | number = mes;
if (dia < 10) {
  diaStr = "0" + dia;
}
if (mes < 10) {
  mesStr = "0" + mes;
}

const fechaCorta: string = `${diaStr}-${mesStr}-${anio}`;

interface DataTableOptions {
  lengthMenu: number[] | Array<Array<number | string>>;
  pageLength: number;
  destroy: boolean;
  language: {
    lengthMenu: string;
    zeroRecords: string;
    info: string;
    infoEmpty: string;
    infoFiltered: string;
    search: string;
    loadingRecords: string;
    paginate: {
      first: string;
      last: string;
      next: string;
      previous: string;
    };
  };
  dom: string;
  buttons: {
    extend: string;
    text: string;
    title: string;
    className: string;
    visibility: boolean;
    filename: string;
  }[];
  scrollY: string;
  scrollCollapse: boolean;
  paging: boolean;
}

const dataTableOptions: DataTableOptions = {
  lengthMenu: [10, 20, 50],
  pageLength: 50,
  destroy: true,
  language: {
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "Ningún usuario encontrado",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún usuario encontrado",
    infoFiltered: "(filtrados desde _MAX_ registros totales)",
    search: "Buscar",
    loadingRecords: "Cargando...",
    paginate: {
      first: "Primero",
      last: "Último",
      next: "Siguiente",
      previous: "Anterior",
    },
  },
  dom: "Bfrtip",
  buttons: [
    {
      extend: "excel",
      text: "Ex",
      title: "excel",
      className: "rounded-circle",
      visibility: false,
      filename: `${fechaCorta}_ReporteChecador`,
    },
  ],
  scrollY: "50vh",
  scrollCollapse: true,
  paging: false,
};


$("#excelbtn").click(function () {
  table.buttons(".buttons-excel").trigger();
});

let GlobalData: any[] = [];

const initDataTable = async (): Promise<void> => {
  if (dataTableInicialized) {
    dataTable.destroy();
  }
  if ((document.getElementById("inputSucursal") as HTMLInputElement).value === "NA") {
    await getDataByPeriodo();
  } else {
    await getDataByPeriodoSucursal();
  }
  $("#container-floating").show();

  dataTable = $("#tableND").DataTable(dataTableOptions);
  (document.getElementById("tabla") as HTMLElement).hidden = false;

  dataTable.buttons().container().appendTo($("#excel-container"));

  dataTableInicialized = true;
};
  
  // import React from "react";

// const PrintLabels = () => {
//   const printLabels = () => {
//     // Este botón será un checkbox que indique con un boolean si se ejecuta la función o no
//     if (botonDeImpresiones) {
        
//       // Obtener el contenido de la etiqueta
//       const labelContent = document.getElementById("etiqueta").innerHTML;

//       // Crear un objeto para la ventana de impresión
//       const printWindow = window.open("", "Etiquetas");

//       // Escribir el contenido de la etiqueta en la ventana de impresión
//       printWindow.document.write(labelContent);

//       // Imprimir la etiqueta
//       printWindow.print();

//       // Cerrar la ventana de impresión
//       printWindow.close();

//       // Si se detiene la ejecución se imprime por consola
//     } else {
//       console.log("impresión iterrumpida");
//     }
//   };
//   return (
//     <div>
//       <div
//         id='etiqueta'
//         style={{ width: "100px", height: "50px", border: "1px solid black" }}
//       >
//         {/* Se crea un componente que importe los datos de la etiqueta que te dió Diego */}
//         <TablaEtiquetas />
//       </div>
//       <button onClick={printLabels}>Imprimir etiquetas</button>
//     </div>
//   );
// };

// export default PrintLabels;












const getDataByPeriodo = async () => {
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let inputCortes = document.getElementById("inputCorte");
    let id = inputCortes.value;
    for (let q = 0; q < inputCortes.childNodes.length; q++) {
      const child = inputCortes.childNodes[q];
      if (child.value === inputCortes.value) corte = child.innerText;
    }

    const url = `https://ms.nucleodediagnostico.com/caphumano/checador/CheckByPeriod?Id=${id}`;
    const response = await fetch(url, requestOptions).then();
    const users = await response.json();

    let empdata = users.data;
    GlobalData = users.data;
    let content = ``;

    for (let index = 0; index < empdata.length; index++) {
      let incidencias = {
        faltas: 0,
        pcg: 0,
        psg: 0,
        vacaciones: 0,
        incapacidad: 0,
        retardos: 0,
        n_vr: 0,
      };

      const user = empdata[index];
      console.log(user);

      for (let j = 0; j < user.empfechas.length; j++) {
        const fecha = user.empfechas[j];
        if (fecha.observaciones === "FALTA") incidencias.faltas += 1;
        if (fecha.observaciones === "NO SE PUEDEN VALIDAR LOS RETARDOS")
          incidencias.n_vr += 1;
        incidencias.retardos += fecha.minutosretardo;
      }

      content += `
        <tr>
          <td class="filtro">${user.empnomina}</td>
          <td class="col-3">${user.empname}</td>
          ${
            incidencias.faltas > 0
              ? `<td style="background-color: #B54166; color: #fff; text-align:center;">${incidencias.faltas}</td>`
              : `<td style="text-align:center;">${incidencias.faltas}</td>`
          }          
          ${
            incidencias.pcg > 0
              ? `<td style="background-color: #6EA031; color: #fff; text-align:center;">${incidencias.pcg}</td>`
              : `<td style="text-align:center;">${incidencias.pcg}</td>`
          }
          ${
            incidencias.psg > 0
              ? `<td style="background-color: #A5B33D; color: #fff; text-align:center;">${incidencias.psg}</td>`
              : `<td style="text-align:center;">${incidencias.psg}</td>`
          }
          ${
            incidencias.vacaciones > 0
              ? `<td style="background-color: #008E7B; color: #fff; text-align:center;">${incidencias.vacaciones}</td>`
              : `<td style="text-align:center;">${incidencias.vacaciones}</td>`
          }
          ${
            incidencias.incapacidad > 0
              ? `<td style="background-color: #00C5FF; color: #fff; text-align:center;">${incidencias.incapacidad}</td>`
              : `<td style="text-align:center;">${incidencias.incapacidad}</td>`
          }
          ${
            incidencias.retardos > 20
              ? `<td style="background-color: #B54166; color: #fff; text-align:center;">${incidencias.retardos}</td>`
              : incidencias.retardos <= 0
              ? `<td style="text-align:center; background-color: none;">${incidencias.retardos}</td>`
              : `<td style="background-color: #BDFCBD; color: #677381; text-align:center;">${incidencias.retardos}</td>`
          }
          ${
            incidencias.n_vr > 0
              ? `<td style="background-color: #FFC0FF; color: #677381; text-align:center;">${incidencias.n_vr}</td>`
              : `<td style="text-align:center;">${incidencias.n_vr}</td>`
          }
          <td>
            <button type="button" onclick="fillmodal(${
              user.empnomina
            })" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#globalmodal">Detalle</button>
          </td>     
        </tr>
      `;
    }
    document.getElementById("tablaBody").innerHTML = content;
  } catch (ex) {
    alert(ex);
  }
};

const getDataByPeriodoSucursal = async () => {
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let id = document.getElementById("inputCorte").value;
    let suc = document.getElementById("inputSucursal").value;

    const url = `https://ms.nucleodediagnostico.com/caphumano/checador/GetCheckBySucursal?id=${id}&s=${suc}`;
    const response = await fetch(url, requestOptions).then();
    const users = await response.json();

    // const response = await fetch("./fakeApi.json");
    // const user = await response.json();
    let empdata = users.data;
    GlobalData = users.data;
    let content = ``;

    for (let index = 0; index < empdata.length; index++) {
      let incidencias = {
        faltas: 0,
        pcg: 0,
        psg: 0, // jaja el parís y también tiene 0
        vacaciones: 0,
        incapacidad: 0,
        retardos: 0,
        n_vr: 0,
      };

      const user = empdata[index];
      console.log(user);
      // Segunda Función
      // const horaEntrada = new Date(user.emphorario.horaentrada.Time);
      // const horaSalida = new Date(user.emphorario.horasalida.Time);
      // const horacomida = new Date(user.emphorario.horasalidacomer.Time);
      // const regresoComida = new Date(user.emphorario.horaregresocomer.Time);
      // const observaciones = user.empfechas[0].observaciones;
      // const entradaSabado = new Date(user.emphorario.horaentradasabado.Time);
      // const salidaSabado = new Date(user.emphorario.horasalidasabado.Time);
      // const comidaSabado = new Date(user.emphorario.horasalidacomersabado.Time);
      // const regresocomidaSabado = new Date(
      //   user.emphorario.horaregresocomersabado.Time
      // );
      for (let j = 0; j < user.empfechas.length; j++) {
        const fecha = user.empfechas[j];
        if (fecha.observaciones === "FALTA") incidencias.faltas += 1;
        if (fecha.observaciones === "NO SE PUEDEN VALIDAR LOS RETARDOS")
          incidencias.n_vr += 1;
        incidencias.retardos += fecha.minutosretardo;
      }

      content += `
        <tr>
          <td>${user.empnomina}</td>
          <td>${user.empname}</td>
          ${
            incidencias.faltas > 0
              ? `<td style="background-color: #B54166; color: #fff; text-align:center;">${incidencias.faltas}</td>`
              : `<td style="text-align:center;">${incidencias.faltas}</td>`
          }          
          ${
            incidencias.pcg > 0
              ? `<td style="background-color: #6EA031; color: #fff; text-align:center;">${incidencias.pcg}</td>`
              : `<td style="text-align:center;">${incidencias.pcg}</td>`
          }
          ${
            incidencias.psg > 0
              ? `<td style="background-color: #A5B33D; color: #fff; text-align:center;">${incidencias.psg}</td>`
              : `<td style="text-align:center;">${incidencias.psg}</td>`
          }
          ${
            incidencias.vacaciones > 0
              ? `<td style="background-color: #008E7B; color: #fff; text-align:center;">${incidencias.vacaciones}</td>`
              : `<td style="text-align:center;">${incidencias.vacaciones}</td>`
          }
          ${
            incidencias.incapacidad > 0
              ? `<td style="background-color: #00C5FF; color: #fff; text-align:center;">${incidencias.incapacidad}</td>`
              : `<td style="text-align:center;">${incidencias.incapacidad}</td>`
          }
          ${
            incidencias.retardos > 20
              ? `<td style="background-color: #B54166; color: #fff; text-align:center;">${incidencias.retardos}</td>`
              : incidencias.retardos <= 0
              ? `<td style="text-align:center; background-color: none;">${incidencias.retardos}</td>`
              : `<td style="background-color: #BDFCBD; color: #677381; text-align:center;">${incidencias.retardos}</td>`
          }
          ${
            incidencias.n_vr > 0
              ? `<td style="background-color: #FFC0FF; color: #677381; text-align:center;">${incidencias.n_vr}</td>`
              : `<td style="text-align:center;">${incidencias.n_vr}</td>`
          }
          <td>
            <button type="button" onclick="fillmodal(${
              user.empnomina
            })" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#globalmodal">Detalle</button>
          </td>     
        </tr>
      `;
    }
    document.getElementById("tablaBody").innerHTML = content;
  } catch (ex) {
    alert(ex);
  }
};

const getDataByPeriodoEmpleado = async () => {
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let id = document.getElementById("inputCorte").value;

    const url = `https://ms.nucleodediagnostico.com/caphumano/checador/CheckByPeriod?Id=${id}`;
    const response = await fetch(url, requestOptions).then();
    const users = await response.json();

    // const response = await fetch("./fakeApi.json");
    // const user = await response.json();
    let empdata = users.data;
    GlobalData = users.data;
    let content = ``;

    for (let index = 0; index < empdata.length; index++) {
      let incidencias = {
        faltas: 0,
        pcg: 0,
        psg: 0, // jaja el parís y también tiene 0
        vacaciones: 0,
        incapacidad: 0,
        retardos: 0,
        n_vr: 0,
      };

      const user = empdata[index];
      console.log(user);
      // Tercera Función
      // const horaEntrada = new Date(user.emphorario.horaentrada.Time);
      // const horaSalida = new Date(user.emphorario.horasalida.Time);
      // const horacomida = new Date(user.emphorario.horasalidacomer.Time);
      // const regresoComida = new Date(user.emphorario.horaregresocomer.Time);
      // const observaciones = user.empfechas[0].observaciones;
      // const entradaSabado = new Date(user.emphorario.horaentradasabado.Time);
      // const salidaSabado = new Date(user.emphorario.horasalidasabado.Time);
      // const comidaSabado = new Date(user.emphorario.horasalidacomersabado.Time);
      // const regresocomidaSabado = new Date(
      //   user.emphorario.horaregresocomersabado.Time
      // );
      for (let j = 0; j < user.empfechas.length; j++) {
        const fecha = user.empfechas[j];
        if (fecha.observaciones === "FALTA") incidencias.faltas += 1;
        if (fecha.observaciones === "NO SE PUEDEN VALIDAR LOS RETARDOS")
          incidencias.n_vr += 1;
        incidencias.retardos += fecha.minutosretardo;
      }

      content += `
        <tr>
          <td>${user.empnomina}</td>
          <td>${user.empname}</td>
          ${
            incidencias.faltas > 0
              ? `<td style="background-color: #B54166; color: #fff; text-align:center;">${incidencias.faltas}</td>`
              : `<td style="text-align:center;">${incidencias.faltas}</td>`
          }          
          ${
            incidencias.pcg > 0
              ? `<td style="background-color: #6EA031; color: #fff; text-align:center;">${incidencias.pcg}</td>`
              : `<td style="text-align:center;">${incidencias.pcg}</td>`
          }
          ${
            incidencias.psg > 0
              ? `<td style="background-color: #A5B33D; color: #fff; text-align:center;">${incidencias.psg}</td>`
              : `<td style="text-align:center;">${incidencias.psg}</td>`
          }
          ${
            incidencias.vacaciones > 0
              ? `<td style="background-color: #008E7B; color: #fff; text-align:center;">${incidencias.vacaciones}</td>`
              : `<td style="text-align:center;">${incidencias.vacaciones}</td>`
          }
          ${
            incidencias.incapacidad > 0
              ? `<td style="background-color: #00C5FF; color: #fff; text-align:center;">${incidencias.incapacidad}</td>`
              : `<td style="text-align:center;">${incidencias.incapacidad}</td>`
          }
          ${
            incidencias.retardos > 20
              ? `<td style="background-color: #B54166; color: #fff; text-align:center;">${incidencias.retardos}</td>`
              : incidencias.retardos <= 0
              ? `<td style="text-align:center; background-color: none;">${incidencias.retardos}</td>`
              : `<td style="background-color: #BDFCBD; color: #677381; text-align:center;">${incidencias.retardos}</td>`
          }
          ${
            incidencias.n_vr > 0
              ? `<td style="background-color: #FFC0FF; color: #677381; text-align:center;">${incidencias.n_vr}</td>`
              : `<td style="text-align:center;">${incidencias.n_vr}</td>`
          }
          <td>
            <button type="button" onclick="fillmodal(${
              user.empnomina
            })" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#globalmodal">Detalle</button>
          </td>     
        </tr>
      `;
    }
    document.getElementById("tablaBody").innerHTML = content;
  } catch (ex) {
    alert(ex);
  }
};

const fillmodal = (nommina) => {
  let empdetalle = GlobalData.filter((emp) => {
    return emp.empnomina === nommina;
  })[0];
  
  document
    .getElementById("sheetjsexport")
    .setAttribute(
      "onclick",
      `exportToExcel('${fechaCorta}_${empdetalle.empnomina}')`
    );

  // console.log(empdetalle)
  document.getElementById("modaltitle").innerText =
    empdetalle.empname + "  n. " + empdetalle.empnomina;
  let modalbody = document.getElementById("modalbody");
  modalbody.innerHTML = "";
  // modalbody.innerHTML = JSON.stringify(empdetalle.empfechas);

  // aquí empieza
  const table = document.createElement("table");
  table.id = "tableExcel";
  table.className = "table table-bordered";
  modalbody.appendChild(table);

  //NAME
  const headertrNAME = document.createElement("tr");
  const headerRowNAME = document.createElement("thead");
  headerRowNAME.className = "table-dark";
  const headerCellNAME = document.createElement("th");
  headerCellNAME.className = "col";
  headerCellNAME.hidden = true;
  headerCellNAME.innerText = empdetalle.empname + " - " + empdetalle.empnomina;

  headertrNAME.appendChild(headerCellNAME);
  headerRowNAME.appendChild(headertrNAME);
  table.appendChild(headerRowNAME);
  //NAME

  const headertr = document.createElement("tr");
  const headerRow = document.createElement("thead");
  headerRow.className = "table-dark";
  const headers = ["Fecha", `Horario`, "Retardos", "Checadas", "Observaciones"];
  for (let h = 0; h < headers.length; h++) {
    const headerCell = document.createElement("th");
    headerCell.className = "col";
    headerCell.textContent = headers[h];
    if (headers[h] === "Checadas") {
      let button = document.createElement("button");
      button.className = "mx-2 btn btn-sm btn-outline-light rounded-circle";
      button.id = "ocultarX";
      button.setAttribute("data-bs-toggle", "button");
      button.value = true;
      button.onclick = (e) => eliminarBoton(e);

      let icon = document.createElement("i");
      icon.className = "bi bi-pencil-square";
      button.appendChild(icon);
      headerCell.appendChild(button);

      // detalle
      let buttonMas = `
      <button class="mx-2 btn btn-sm btn-outline-light rounded-circle" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        <i class="bi bi-plus-circle"></i>
      </button>
    `;
      headerCell.insertAdjacentHTML("beforeend", buttonMas);
      // detalle
    }
    headertr.appendChild(headerCell);
  }
  headerRow.appendChild(headertr);
  table.appendChild(headerRow);

  const emplead = document.getElementById("nombreEmpleado");
  emplead.innerHTML = empdetalle.empname;

  const nEmple = document.getElementById("numeroEmpleado");
  nEmple.innerHTML = empdetalle.empnomina;

  const tbody = document.createElement("tbody");
  for (let i = 0; i < empdetalle.empfechas.length; i++) {
    const rowData = empdetalle.empfechas[i];
    const row = document.createElement("tr");

    let thfecha = document.createElement("th");
    thfecha.id = "fechaDetalle";
    let tdHorario = document.createElement("td");
    let tdRetardos = document.createElement("td");

    let tdChecadas = document.createElement("td");
    tdChecadas.setAttribute("id", "celdasContainer");

    let tdObservaciones = document.createElement("td");

    //fecha
    thfecha.scope = row;
    let fechaDia = new Date(rowData.dia.replace("Z", ""));
    // console.log(fechaDia)
    let dia =
      fechaDia.getDate() < 10 ? "0" + fechaDia.getDate() : fechaDia.getDate();
    let mes =
      fechaDia.getMonth() + 1 < 10
        ? "0" + (fechaDia.getMonth() + 1)
        : fechaDia.getMonth() + 1;
    let anio = fechaDia.getFullYear();
    let fechaCorta = `${dia}/${mes}/${anio}`;
    thfecha.innerText = fechaCorta;
    row.appendChild(thfecha);

    let hor = rowData.horariodia;
    let horario = `E:<b>   ${new Date(hor.horadiaentrada.Time).getUTCHours()}:${
      new Date(hor.horadiaentrada.Time).getUTCMinutes() < 10 ? "0" : ""
    }${new Date(hor.horadiaentrada.Time).getUTCMinutes()}</b>`;
    horario += ` SC: <b>${new Date(
      hor.horadiasalidacomida.Time
    ).getUTCHours()}:${
      new Date(hor.horadiasalidacomida.Time).getUTCMinutes() < 10 ? "0" : ""
    }${new Date(hor.horadiasalidacomida.Time).getUTCMinutes()}</b>`;
    horario += ` RC: <b>${new Date(
      hor.horadiaregresocomida.Time
    ).getUTCHours()}:${
      new Date(hor.horadiaregresocomida.Time).getUTCMinutes() < 10 ? "0" : ""
    }${new Date(hor.horadiaregresocomida.Time).getUTCMinutes()}</b>`;
    horario += ` S: <b>${new Date(hor.horadiasalida.Time).getUTCHours()}:${
      new Date(hor.horadiasalida.Time).getUTCMinutes() < 10 ? "0" : ""
    }${new Date(hor.horadiasalida.Time).getUTCMinutes()}</b>`;
    tdHorario.innerHTML = horario;
    row.appendChild(tdHorario);

    tdRetardos.innerText = rowData.minutosretardo;
    if (rowData.minutosretardo > 0 && rowData.minutosretardo <= 20) {
      tdRetardos.className = "table-success";
    } else if (rowData.minutosretardo >= 21) {
      tdRetardos.className = "table-danger";
    }

    row.appendChild(tdRetardos);

    if (rowData.checadas.length > 0) {
      tdChecadas.className = "align-middle p-0";
      let checadas = "";
      for (let z = 0; z < rowData.checadas.length; z++) {
        const e = rowData.checadas[z];
        let status = "";
        if (e.estatus) status = "table-warning";
        const button = status
          ? ""
          : `
          <button id="cancel" class="btn-cancelar rounded-circle bt_c" onclick="cancelarChecada('${e.idchecada}')" hidden>
          <i class="bi bi-x"></i>
          </button>
          `;

        checadas += `
          <td title="${e.sucursal}" id="idX" class="text-center ${status}">
            ${new Date(e.check).getUTCHours()}:${
          new Date(e.check).getUTCMinutes() < 10 ? "0" : ""
        }${new Date(e.check).getUTCMinutes()}${
          z === rowData.checadas.length - 1 ? "" : ","
        } 
            ${button} 
          </td>
        `;
      }

      tdChecadas.innerHTML = `
    <table class="table table-sm m-0 table-borderless">
        <tbody >
          <tr class="align-middle p-0 idsucursal">
            ${checadas}
          </tr>
        </tbody>
    </table>
    `;
    } else {
      tdChecadas.innerText = "NO TIENE CHECADAS";
    }
    row.appendChild(tdChecadas);

    tdObservaciones.innerText = rowData.observaciones;
    if (rowData.observaciones === "FALTA") {
      tdObservaciones.className = "table-danger";
    } else if (rowData.observaciones === "FECHA POSTERIOR") {
      tdObservaciones.className = "table-info";
    }

    // console.log(rowData.observaciones)
    row.appendChild(tdObservaciones);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  const modalFooter = document.querySelector("#modal-footer");
  modalFooter.className = "d-blo mb-4 mx-3 pt-0";
  let downloadButton = modalFooter.querySelector(".download-button");

  if (downloadButton) modalFooter.removeChild(downloadButton);
  downloadButton = document.createElement("button");
  downloadButton.innerHTML = "Descargar";
  downloadButton.id = "descargadetalle";
  downloadButton.classList.add("btn", "btn-dark", "download-button");
  downloadButton.setAttribute(
    "onclick",
    `downloadPDFsinFirma([${empdetalle.empnomina}],'${fechaCorta}_${empdetalle.empnomina}')`
  );
  modalFooter.appendChild(downloadButton);
};

function cancelarChecada(idchecada) {
  Swal.fire({
    title: "¿Quieres cancelar la checada?",
    text: "Esto no se puede revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Cancelar checada",
    cancelButtonText: "Volver",
  }).then((result) => {
    if (result.isConfirmed) {
      const data = {
        idchecada,
      };
      fetch(
        "https://ms.nucleodediagnostico.com/caphumano/checador/InvalidarChecada",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      ).then((response) => {
        if (response.status === 200) {
          Swal.fire(
            "Cancelado!",
            "la checada ha sido cancelada. Favor de actualizar la página",
            "success"
          );
        } else {
          Swal.fire("Ocurrió un error", "", "error");
        }
        response
          .json()
          .then((data) => {
            console.log("Respuesta del servidor:", data);
          })
          .catch((error) => {
            console.error("Error al enviar mensaje:", error);
          });
      });
    }
  });
}

const eliminarBoton = (e) => {
  let botones = document.getElementsByClassName("bt_c");

  open = !open;

  if (open === true) {
    for (let i = 0; i < botones.length; i++) {
      botones[i].hidden = false;
    }
  } else {
    for (let i = 0; i < botones.length; i++) {
      botones[i].hidden = true;
    }
  }
};

