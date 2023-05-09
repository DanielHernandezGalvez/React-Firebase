import React, { useEffect, useState } from 'react'
import EmpresaFilter from "./EmpresaFilter"
import DataTable from 'react-data-table-component'

export default function TableEmpresa() {
  const [dataEmpresa, setDataEmpresa] = useState([])
  const [check, setCheck] = ("")


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
          option.value = 0;
          option.selected = true;
          option.text = "Todas";
          select.appendChild(option);
    
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


      useEffect(() => {
        selectEmpresas();
      }, [])

      const getEmpresa = async (event) => {
        event.preventDefault();
    
        try {
          const fiDate = new Date(document.getElementById("fiInputEmpresa").value);
          const ffDate = new Date(document.getElementById("ffInputEmpresa").value);
          const fi = Math.floor(fiDate.getTime() / 1000);
          const ff = Math.floor(ffDate.getTime() / 1000);
    
          const emp = document.getElementById("sucInputEmpresa").value;
    
          const laboratorios = document.getElementById("inputLaboratorio")
          const imagenologia = document.getElementById("inputImagenologia")
      
          const urlLabs = `${process.env.RUTA_API}/sirsi/web/BuscarResultadosLaboratorioEmpresa`;
          const urlImagen = `${process.env.RUTA_API}/sirsi/web/BuscarResultadosLaboratorioEmpresa`;
    
          var requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
          if(laboratorios.getAttribute.check){
            setCheck("laboratorio")
          } else if(imagenologia.getAttribute.check){
            setCheck("imagenologia")
          } else return ""

          const response = await fetch(url, requestOptions);
          const data = await response.json();
          console.log("empresa", data.data);
          setDataEmpresa(data.data);
        } catch (error) {
          console.error(error);
        }
      };

    

      const columnsLaboratorio = [
        {
          name: "Folio",
          selector: "Folio",
          sorteable: true
        },
        {
          name: "NombrePaciente",
          selector: "NombrePaciente",
          sorteable: true
        },
        {
          name: "Sexo",
          selector: "Sexo",
          sorteable: true
        },
        {
          name: "DescripcionEstudio",
          selector: "DescripcionEstudio.String",
          sorteable: true
        },
        {
          name: "Resultado",
          selector: "Resultado.String",
          sorteable: true
        },
      ]

  return (
    <div  id='my-bitacora'
    className='col-12 col-xl-10 col-lg-12 col-sm-12 bg-white table-scroll mt-2'
  >
    <h3 className='m-3'>Empresas</h3>
    <EmpresaFilter getEmpresa={getEmpresa}/>
    <DataTable data={dataEmpresa} columns={columnsLaboratorio}/>
    TableEmpresa</div>
  )
}
