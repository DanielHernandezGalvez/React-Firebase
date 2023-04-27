import React from "react";

export default function FacturaFilter() {
  return (
    <div>
      <label htmlFor='fiInput'>Fecha Inicial: </label>
      <input id='fiInput' type='date' />
      <label htmlFor='ffInput'>Fecha Final: </label>
      <input id='ffInput' type='date' />

      <select id='sucInput'>
        <option>Todas</option>
      </select>

      <select id='tpInput'>
        <option>Seleccionar</option>
      </select>

      <label htmlFor='todas'>Todas: </label>
      <input id='todas' type='checkbox' />
      <label htmlFor='sinfactura'>Sin factura: </label>
      <input id='sinfactura' type='checkbox' />
      <label htmlFor='facturadas'>Facturadas: </label>
      <input id='facturadas' type='checkbox' />

      <button  type="button" >Buscar</button>
    </div>
  );
}
