import React, { useEffect, useState } from "react";
import FiltrosEmpresa from "./FiltrosEmpresa";
import DataTable from "react-data-table-component";

export default function TablaEmpresas() {
  const [check, setCheck] = useState("");
  const [dataLab, setDataLab] = useState([]);
  const [dataImg, setDataImg] = useState([]);

  const capitalize = (val) => {
    return val
      .toLowerCase()
      .trim()
      .split(" ")
      .map((v) => v[0].toUpperCase() + v.substr(1))
      .join(" ");
  };

  const selectEmpresas = async () => {
    const url = process.env.RUTA_API + "/sirsi/web/BuscarEmpresas";
    // const url =  "http://192.168.0.14:8081/sirsi/web/BuscarEmpresas";

    try {
      const response = await fetch(url);
      let data = [];
      data = await response.json();

      const select = document.getElementById("sucInputEmpresa");
      select.innerHTML = "";
      const option = document.createElement("option");
      // option.value = 0;
      // option.selected = true;
      // option.text = "";
      // select.appendChild(option);

      data.data.map((empresa) => {
        const option = document.createElement("option");
        option.value = empresa.EmpresaId;
        option.text = capitalize(empresa.EmpresaNombre);
        select.appendChild(option);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fechaActualEmpresa = () => {
    const myDateInput = document.getElementById("fiInputEmpresa");
    const ffInputBitacora = document.getElementById("ffInputEmpresa");
    const fechaActual = new Date(new Date() - 6 * 60 * 60 * 1000).toISOString().split("T")[0];
    myDateInput.value = fechaActual;
    ffInputBitacora.value = fechaActual;
  };

  const diferenciaDias = () => {
    const fiInput = document.getElementById("fiInputEmpresa");
    const ffInput = document.getElementById("ffInputEmpresa");

    const fiDate = new Date(fiInput.value);
    const ffDate = new Date(ffInput.value);

    const diffTime = Math.abs(ffDate - fiDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 2) {
      alert("La diferencia entre las fechas no puede ser mayor a 2 días.");
      fiInput.value = "";
      ffInput.value = "";
    }
  };

  useEffect(() => {
    selectEmpresas();
    fechaActualEmpresa();
  }, []);

  useEffect(() => {
    const fiInput = document.getElementById("fiInputEmpresa");
    const ffInput = document.getElementById("ffInputEmpresa");
    fiInput.addEventListener("change", diferenciaDias);
    ffInput.addEventListener("change", diferenciaDias);
  
    return () => {
      fiInput.removeEventListener("change", diferenciaDias);
      ffInput.removeEventListener("change", diferenciaDias);
    };
  }, [])

  const getEmpresa = async (event) => {
    event.preventDefault();

    try {
      const fiDate = new Date(document.getElementById("fiInputEmpresa").value);
      const ffDate = new Date(document.getElementById("ffInputEmpresa").value);
      const fi = Math.floor(fiDate.getTime() / 1000);
      const ff = Math.floor(ffDate.getTime() / 1000);
      const emp = document.getElementById("sucInputEmpresa").value;

      const laboratorios = document.getElementById("inputLaboratorio");
      const imagenologia = document.getElementById("inputImagenologia");
      var opciones = document.getElementById("opciones");


      const urlLabs = `${process.env.RUTA_API}/sirsi/web/BuscarResultadosLaboratorioEmpresa`;
      const urlImagen = `${process.env.RUTA_API}/sirsi/web/BuscarResultadosImagenologiaEmpresa`;

      // if (emp.trim() === "") {
      //   alert("Debes ingresar el nombre de la empresa.");
      //   return false;
      // }
    
      if (!laboratorios.checked && !imagenologia.checked) {
        alert("Debes seleccionar Laboratorio o Imagenología.");
        return false;
      }
      // if (opciones.value === "") {
      //   alert("Debes seleccionar una opción.");
      //   return false;
      // }

      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      var requestOptions = {
        method: "POST",
        body: JSON.stringify({
          Folios: "",
          EmpresaId: parseInt(emp),
          FechaInicio: fi,
          FechaFinal: ff,
        }),
        redirect: "follow",
        headers,
      };

      let url;
      if (laboratorios.checked) {
        url = urlLabs;
        const response = await fetch(url, requestOptions);
        if (response.status === 200) {
          let data = await response.json();
          setDataLab(data.data);
          setCheck("laboratorio");
        } else {
          alert(await response.text());
        }
      } else if (imagenologia.checked) {
        url = urlImagen;
        const response = await fetch(url, requestOptions);
        let data = await response.json();
        if (response.status === 200) {
          setDataImg(data.data);
          setCheck("imagenologia");
        } else {
          alert(await response.text());
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columnsLaboratorio = [
    {
      name: "Folio",
      selector: "Folio",
      sorteable: true,
    },
    {
      name: "NombrePaciente",
      selector: "NombrePaciente",
      sorteable: true,
    },
    {
      name: "Sexo",
      selector: "Sexo",
      sorteable: true,
    },
    {
      name: "DescripcionEstudio",
      selector: "DescripcionEstudio.String",
      sorteable: true,
    },
    {
      name: "Resultado",
      selector: "Resultado.String",
      sorteable: true,
    },
  ];

  return (
    <>
      <FiltrosEmpresa getEmpresa={getEmpresa} />
      {console.log(check)}
      {check === "laboratorio" && (
        <DataTable
          data={dataLab}
          columns={columnsLaboratorio}
          responsive='true'
          pagination
          fixedHeader
          // fixedHeaderScrollHeight='600px'
        //   scrollY='30vh'
        //   scrollX='true'
        />
      )}
      {check === "imagenologia" && (
        <DataTable
          data={dataImg}
          columns={columnsLaboratorio}
          responsive='true'
          pagination
          fixedHeader
        //   fixedHeaderScrollHeight='60%'
        />
      )}
      
    </>
  );
}
