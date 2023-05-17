import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

export default function DescuentoDetalle({ tipoDescuento }) {
  const [detalle, setDetalle] = useState([]);

  const activarTabla = async () => {
      const fiDate = new Date(document.getElementById('fiInputDescuentos').value);
      const ffDate = new Date(document.getElementById('ffInputDescuentos').value);
      const fi = Math.floor(fiDate.getTime() / 1000);
      const ff = Math.floor(ffDate.getTime() / 1000);
      const suc = document.getElementById('sucInputDescuentos').value;
      const urlDetalle = `${process.env.RUTA_API}/sirsi/web/BuscarDescuentosDetalles?IdSucursal=${suc}&Fi=${fi}&Ff=${ff}&td=${tipoDescuento}`;

    try {
      const res = await fetch(urlDetalle);
      const dataDetalle = await res.json();
      console.log("click")
      setDetalle(dataDetalle.data);
    } catch (error) {
      alert(error, 'algo falló en el segundo fetch');
    }
  };

  useEffect(() => {
    activarTabla();
  }, []);

  const columns = [
    {
      name: 'Folio',
      selector: 'Folio',
      sorteable: true
    },
    {
      name: 'Sucursal',
      selector: 'Sucursal',
      sorteable: true
    },
    {
      name: 'Fecha',
      selector: 'Fecha',
      sorteable: true
    },
    {
      name: 'Paciente',
      selector: 'Paciente',
      sorteable: true
    },
    {
      name: 'ImporteTotal',
      selector: 'ImporteTotal',
      sorteable: true
    },
    {
      name: 'TipoDescuento',
      selector: 'TipoDescuento',
      sorteable: true
    },
    {
      name: 'Porcentaje',
      selector: 'Porcentaje',
      sorteable: true
    },
    {
      name: 'Descuento',
      selector: 'Descuento',
      sorteable: true
    },
    {
      name: 'Subtotal',
      selector: 'Subtotal',
      sorteable: true
    },
    {
      name: 'Autoriza',
      selector: 'Autoriza',
      sorteable: true
    },
    {
      name: 'Motivo',
      selector: 'Motivo',
      sorteable: true
    }
  ];

  return (
    <div>
      <DataTable columns={columns} data={detalle} />
    </div>
  );
}
