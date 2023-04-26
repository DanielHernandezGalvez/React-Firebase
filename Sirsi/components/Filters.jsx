import React from 'react'

export default function Filters() {
  return (
    <div className='col-7 d-flex justify-content-around'>
    <input className='form-control me-5 w-75' type='date' />
    <input className='form-control me-5 w-75' type='date' />
    <div class='input-group'>
      <span class='input-group-text btn btn-primary'>
        {" "}
        <i class='bi bi-search text-white'></i>
      </span>
      <input className='form-control w-50 me-5' type='text' />
    </div>
  </div>
  )
}
