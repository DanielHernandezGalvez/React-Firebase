import React, { useEffect, useState } from "react";
import FacturaFilter from "./FacturaFilter";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

export default function Table() {
  const [facturas, setFacturas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const capitalize = (val) => {
    return val
      .toLowerCase()
      .trim()
      .split(" ")
      .map((v) => v[0].toUpperCase() + v.substr(1))
      .join(" ");
  };

  const getSucursales = async () => {
    const url = process.env.RUTA_API + "/sirsi/web/BuscarSucursales?suc=1";

    try {
      const response = await fetch(url);
      let data = [];
      data = await response.json();

      const select = document.getElementById("sucInput");
      select.innerHTML = "";
      const option = document.createElement("option");
      option.value = 0;
      option.selected = true;
      option.text = "Todas";
      select.appendChild(option);

      data.data.map((sucursal) => {
        const option = document.createElement("option");
        option.value = sucursal.SucuId;
        option.text = capitalize(sucursal.SucuNombre);
        select.appendChild(option);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTipoPago = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const url = process.env.RUTA_API + "/sirsi/web/BuscarTipoPagos";

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);

      const select = document.getElementById("tpInput");
      select.innerHTML = "";
      const option = document.createElement("option");
      option.value = 0;
      option.selected = true;
      option.text = "Todos";
      select.appendChild(option);

      data.data.map((pago) => {
        const option = document.createElement("option");
        option.value = pago.TipoPagoId;
        option.text = capitalize(pago.TipoPagoDescripcion);
        select.appendChild(option);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSucursales();
    getTipoPago();
  }, []);

  const getFacturas = async (event) => {
    event.preventDefault();
    try {
      const fiDate = new Date(document.getElementById("fiInput").value);
      const ffDate = new Date(document.getElementById("ffInput").value);
      const fi = Math.floor(fiDate.getTime() / 1000);
      const ff = Math.floor(ffDate.getTime() / 1000);

      const suc = document.getElementById("sucInput").value;
      const tp = document.getElementById("tpInput").value;

      const Grupo = document.getElementById("Grupo").value;

      const url = `${process.env.RUTA_API}/sirsi/web/BuscarFacturas?fi=${fi}&ff=${ff}&suc=${suc}&tp=${tp}&g=${Grupo}`;
      //const url = `http://ms.nucleodediagnostico.com/sirsi/web/BuscarFacturas?fi=1682143200&ff=1682316000&suc=0&tp=1&g=1`;

      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        setFacturas(data.data);
      } else {
        alert("Datos no encontrados");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendData = () => {
    const dataToSend = { selectedRows };
    fetch("http://192.168.0.14:8081/sirsi/web/GenerarPDFFacturas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const handleRowSelected = (rows) => {
    setSelectedRows(rows);
  };

  const options = {
    selectableRows: true,
    onRowSelected: handleRowSelected,
  };

  const columns = [
    {
      name: "Sucursal",
      selector: "Sucursal",
      sortable: true,
    },
    {
      name: "Folio",
      selector: "Folio",
      sortable: true,
    },
    {
      name: "Fecha",
      selector: "Fecha",
      sortable: true,
    },
    {
      name: "Monto",
      selector: "Monto.Float64",
      sortable: true,
    },
    {
      name: "Descuento",
      selector: "Descuento.Float64",
      sortable: true,
    },
    {
      name: "Total",
      selector: "Total.Float64",
      sortable: true,
    },
    {
      name: "Tipo de Pago",
      selector: "TipoPago.String",
      sortable: true,
    },
    {
      name: "Factura",
      selector: "Factura.String",
      sortable: true,
    },
    {
      name: "Número de Factura",
      selector: "NumeroFactura.String",
      sortable: true,
    },
  ];

  const tableData = {
    columns: columns,
    data: facturas,
    fileName: "document",
    export: true,
    print: true,
    filterHidden: true,
    filterDigit: 1,
  };

  const filteredData = facturas.filter((row) =>
    Object.values(row).some((value) => {
      if (typeof value === "string" || typeof value === "number") {
        return value
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );

  return (
    <div
      id='my-table'
      className='col-12 col-lg-9 col-md-12   bg-white table-scroll mt-2'
    >
      <FacturaFilter getFacturas={getFacturas} />
      <button className='text-end btn' onClick={handleRowSelected}>
        {" "}
        <i className='bi bi-filetype-pdf text-info fs-4'></i>
      </button>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={filteredData}
          responsive='true'
          pagination
          fixedHeader
          option={options}
          fixedHeaderScrollHeight='600px'
        />
      </DataTableExtensions>
    </div>
  );
}
