import { useEffect, useState } from "react";

const DetalleFila = ({ data }) => {
  const [detalle, setDetalle] = useState([]);

  useEffect(() => {
    const fetchOrdenesTrabajo = async () => {
      let requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      try {
        // console.log(data.OrdenTrabajoId);
        const response = await fetch(
          `http://localhost:8081/sian2/ms/monitor/GetAllOrdenesTrabajo?Id=${data.OrdenTrabajoId}`,
          requestOptions
        );
        const data_d = await response.json();
        console.log(data_d);
        setDetalle(data_d.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrdenesTrabajo();
  }, []);

  return (
    <table className='table table-sm border'>
      {console.log(data)}
      <thead>
        <tr className='bg-secondary text-white text-center'>
          <th scope='row' className='border-end  '>
            Estudio
          </th>
          <th className='border-end '>Muestra</th>
          <th className='border-end '>Contenedor</th>
          <th className='border-end '>Etiquetas</th>
          <th className='border-end '>T. Estimado</th>
          <th className='border-end '>F. Estimado</th>
          <th className='border-end '>Urgente</th>
          <th className='border-end '>Area</th>
          <th className=''>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {detalle.map((det) => {
          return (
            <>
              <tr className='text-center'>
                <th scope='row' className=' border-end fw-normal'>
                  {det.Estudio}
                </th>
                <td className=' border-end'>{det.Muestra}</td>
                <td className=' border-end'>{det.Contenedor}</td>
                <td className=' border-end'>{det.CantidadEtiquetas}</td>
                <td className=' border-end'>{det.TiempoEstimado}</td>
                <td className=' border-end'>{det.FechaEstimada}</td>
                <td className=' border-end'>
                  {/* <input type='checkbox' /> */}
                  {det.Urgente}
                </td>
                <td className=' border-end'>{det.Área}</td>
                <td className='border-end '>PTE</td>
              </tr>

              <td colspan='9' className='accordion ' id='accordionExample'>
                <div className='accordion-item'>
                  <h2 className='accordion-header text-center' id='headingOne'>
                    <button
                      className='accordion-button btn btn-secondary py-2 collapsed px-5 fw-bold'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseOne'
                      aria-expanded='false'
                      aria-controls='collapseOne'
                    >
                      PREPARACIÓN
                    </button>
                  </h2>
                  <div
                    id='collapseOne'
                    className='accordion-collapse collapse '
                    aria-labelledby='headingOne'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body text-center'>
                      <p className='px-5'>
                        ORINA RECIENTE, NO REQUIERE AYUNO, MATRIZ LUNES A
                        VIERNES 7 DE A MAÑANA A 7 DE LA TARDE Y SABADO DE 7 DE LA
                        MAÑANA A 2 DE LA TARDE Y SUCURSALES DE 7 DE LA MAÑANA A
                        6 DE LA TARDE Y SABADO DE 7 DE LA MAÑANA A 1 DE LA TARDE
                      </p>
                    </div>
                  </div>
                </div>
              </td>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default DetalleFila;
