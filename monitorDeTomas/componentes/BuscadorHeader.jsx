import React from "react";

const BuscadorHeader = ({ handleFilter }) => {
  return (
    <div className='text-end my-4 d-flex align-middle'>
      <p className="me-4">Orden de Trabajo Historico</p>
      <div className='w-50'>
        <input
          id='buscadorTabla'
          className='form-control w-25 h-75'
          type='text'
          onChange={handleFilter}
        />
      </div>
    </div>
  );
}

export default BuscadorHeader
