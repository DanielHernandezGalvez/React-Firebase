import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import FacturaFilter from "./FacturaFilter";

export default function Table() {
  const [facturas, setFacturas] = useState([]);

  async function getSucursales() {
    const url =
      "http://192.168.0.46:8081/sirsi/administracion/BuscarSucursales";

    try {
      const response = await fetch(url);
      const data = await response.json();

      const select = document.getElementById("sucInput");

      data.data.forEach((sucursal) => {
        const option = document.createElement("option");
        option.value = sucursal.SucuId;
        option.text = sucursal.SucuNombre;
        select.appendChild(option);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSucursales();
  }, []);

  const getTipoPago = async () => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const url = "http://192.168.0.46:8081/sirsi/administracion/BuscarTipoPagos";

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data)

      const select = document.getElementById("tpInput");

      data.data.forEach((pago) => {
        const option = document.createElement("option");
        option.value = pago.TipoPagoId;
        option.text = pago.TipoPagoDescripcion;
        select.appendChild(option);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTipoPago();
  }, []);

  const getFacturas = async () => {
    try {
      const fiDate = new Date(document.getElementById("fiInput").value);
      const ffDate = new Date(document.getElementById("ffInput").value);
      const fi = Math.floor(fiDate.getTime() / 1000);
      const ff = Math.floor(ffDate.getTime() / 1000);

      const suc = document.getElementById("sucInput").value;
      const tp = document.getElementById("tpInput").value;

      const todas = document.getElementById("todas");
      const sinfactura = document.getElementById("sinfactura");
      const facturadas = document.getElementById("facturadas");
      
      let g;
      
      if (todas.checked) {
        g = 0;
      } else if (sinfactura.checked) {
        g = 1;
      } else if (facturadas.checked) {
        g = 2;
      } else {
        // Si ninguno está seleccionado, asignar un valor predeterminado
        g = 0;
      }

      const url = `http://192.168.0.46:8081/sirsi/administracion/BuscarFacturas?fi=${fi}&ff=${ff}&suc=${suc}&tp=${tp}&g=${g}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data.data);
      setFacturas(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      name: "",
      selector: (row) => row.Sucursal,
    },
  ];

  useEffect(() => {
    getFacturas();
  }, []);

  return (
    <div id='my-table' className='col-10 bg-white table-scroll'>
      <FacturaFilter />
    </div>
  );
}
