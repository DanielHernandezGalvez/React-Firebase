import React from 'react';

export default function ResumenDescuentos({ dataDescuentos }) {
  const importeTotal = dataDescuentos.reduce((total, descuento) => total + descuento.ImporteTotal, 0);
  const impTotal = importeTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })
  const cantidadDesc = dataDescuentos.reduce((total, descuento) => total + descuento.NumDescuentos, 0);
  const subtotalGeneral = dataDescuentos.reduce((total, descuento) => total + descuento.Subtotal, 0);
  const TotalGeneral = subtotalGeneral.toLocaleString("en-US", { minimumFractionDigits: 2 })
  const descuentoGeneral = importeTotal - subtotalGeneral
  const total = descuentoGeneral.toLocaleString("en-US", { minimumFractionDigits: 2 })
  return (
    <div className=" my-4 me-2 ms-2">
      <div className="row">
        <hr/>
        <div className="col-8 ">
          <b>Importe total:</b>
        </div>
        <div className="col-4 text-end">
          <b>$ {impTotal}</b>
        </div>
      </div>
      <div className="row">
        <div className="col-8 ">
          <b>No. Descuento:</b>
        </div>
        <div className="col-4 text-end">
          <b>{cantidadDesc}</b>
        </div>
      </div>
      <div className="row">
        <div className="col-8 ">
          <b>Descuento General:</b>
        </div>
        <div className="col-4 text-end ">
          <b>$ {TotalGeneral}</b>
        </div>
      </div>
      <div className="row">
        <div className="col-8 ">
          <b>Subtotal General:</b>
        </div>
        <div className="col-4 text-end">
          <b>$ {total}</b>
        </div>
      </div>
    </div>
  );
}
