import React from "react";

export default function FacturaFilter(props) {


  return (
    <form id="form" onSubmit={props.getFacturas}>
      <div className="row p-3 d-flex">
        <div className="col-md-5 col-sm-12  pe-0">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">Inicial:</span>
            <input type="date" className="form-control p-3" id='fiInput' aria-describedby="Fecha Inicial" required/>
            <span className="input-group-text" id="basic-addon1">Final:</span>
            <input type="date" className="form-control" id='ffInput' aria-describedby="Fecha Final" required/>
          </div>
        </div>
        <div className="col-md-2 col-sm-12 pe-0">
          <div className="form-floating">
            <select className="form-select" id="sucInput" placeholder="Username" required>
              <option id="0">Todas</option>
            </select>
            <label htmlFor="sucInput">Sucursales</label>
          </div>
        </div>
        <div className="col-md-2 col-sm-12 pe-0">
          <div className="form-floating">
            <select className="form-select" id="tpInput" placeholder="Username" required>
              <option id="0">Todos</option>
            </select>
            <label htmlFor="tpInput">Tipo de pago</label>
          </div>
        </div>
        <div className="col-md-1 col-sm-8 pe-0">
          <div className="form-floating">
            <select className="form-select" id="Grupo" placeholder="Username" required>
              <option value="3" selected>Todas</option>
              <option value="0">Sin factura</option>
              <option value="1">Con factura</option>
            </select>
            <label htmlFor="tpInput">Grupo</label>
          </div>
        </div>
        <div className="col-md-2 col-sm-4">
          <button type="submit" className="btn btn-primary p-3">Buscar</button>
        </div>
      </div>
    </form>

    //   <div >
    //     <label htmlFor='fiInput'>Fecha Inicial: </label>
    //     <input id='fiInput' type='date' />
    //     <label htmlFor='ffInput'>Fecha Final: </label>
    //     <input id='ffInput' type='date' />

    //     <select id='sucInput'>
    //       <option id="cero">Todas</option>
    //     </select>

    //     <select id='tpInput'>
    //       <option id="0">Seleccionar</option>
    //     </select>

    //     <label htmlFor='todas'>Todas: </label>
    //     <input id='todas' type='checkbox' />
    //     <label htmlFor='sinfactura'>Sin factura: </label>
    //     <input id='sinfactura' type='checkbox' />
    //     <label htmlFor='facturadas'>Facturadas: </label>
    //     <input id='facturadas' type='checkbox' />

    //     <button  type="button" >Buscar</button>
    //   </div>
  );
}
