// import { useEffect, useState } from "react";

// //============== 3FE0321141 ===============//

// const DetalleFila = ({ data }) => {
//   const [detalle, setDetalle] = useState([]);

//   // useEffect( () => {
//   //   console.log(data.OrdenTrabajoId);
//   //   fetch(
//   //     "http://localhost:8081/sian2/ms/monitor/GetAllOrdenesTrabajo?Id=" + data.OrdenTrabajoId
//   //   )
//   //     .then((response) => response.json())
//   //     .then((data_d) => {
//   //       console.log(data_d);
//   //       setDetalle(data.data);
//   //     })
//   //     .catch((error) => console.log(error));
//   // }, []);

//   useEffect(() => {
//     const fetchOrdenesTrabajo = async () => {
//       let requestOptions = {
//         method: "GET",
//         redirect: "follow",
//       };
//       try {
//         // console.log(data.OrdenTrabajoId);
//         const response = await fetch(
//           `http://localhost:8081/sian2/ms/monitor/GetAllOrdenesTrabajo?Id=${data.OrdenTrabajoId}`,
//           requestOptions
//         );
//         const data_d = await response.json();
//         console.log(data_d);
//         setDetalle(data_d.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchOrdenesTrabajo();
//   }, []);

//   return (
//     <table className='table table-sm border'>
//       {console.log(data)}
//       <thead>
//         <tr className='bg-secondary text-white text-center'>
//           <th scope='row' className='border-end  '>
//             Estudio
//           </th>
//           <th className='border-end '>Muestra</th>
//           <th className='border-end '>Contenedor</th>
//           <th className='border-end '>Etiquetas</th>
//           <th className='border-end '>T. Estimado</th>
//           <th className='border-end '>F. Estimada</th>
//           <th className='border-end '>Urgente</th>
//           <th className='border-end '>Área</th>
//           <th className=''>Observaciones</th>
//         </tr>
//       </thead>
//       <tbody className="text-sm-start">
//         {detalle.map((det) => {

//           return (
//             <>
//               <tr className='text-center'>
//                 <th scope='row' className='d-flex ps-3 border-end fw-normal'>
//                   {/* COLLAPSE */}
//                   <div>
//                     <button
//                       className='btn btn-white me-3 px-2s py-1 border-none'
//                       type='button'
//                       data-bs-toggle='collapse'
//                       data-bs-target='#collapseExample'
//                       aria-expanded='false'
//                       aria-controls='collapseExample'
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div scope="row">
//                   <div className='collapse' id='collapseExample'>
//                     <div className='card card-body'>
//                      {det.Observaciones.String}
//                     </div>
//                   </div>{" "}
//                   </div>
//                   {/* fin del colapse */}
//                   {det.Estudio}
//                 </th>
//                 <td className=' border-end'>{det.Muestra}</td>
//                 <td className=' border-end'>{det.Contenedor}</td>
//                 <td className=' border-end'>{det.CantidadEtiquetas}</td>
//                 <td className=' border-end'>{det.TiempoEstimado != 1 ? <p>{det.TiempoEstimado} Días</p> : <p>{det.TiempoEstimado} Día</p>}</td>
//                 <td className=' border-end'>{new Date(det.FechaEstimada).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, "/")}</td>
//                 <td className=' border-end'>
//                   {det.Urgente ? <p>Urgente</p> : <p>No Urgente</p>}
//                 </td>
//                 <td className='border-end'>{det.Área}</td>
//                 <td className='border-end '>{det.Estatus}</td>
//               </tr>
//             </>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// export default DetalleFila;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { COLUNS_DETAILS_TABLE } from "./funciones/columns";

const DetalleFila = ({ data }) => {
  const [detalle, setDetalle] = useState([]);

  useEffect(() => {
    const fetchOrdenesTrabajo = async () => {
      let requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      try {
        const response = await fetch(
          `http://localhost:8081/sian2/ms/monitor/GetAllOrdenesTrabajo?Id=${data.OrdenTrabajoId}`,
          requestOptions
        );
        const data_d = await response.json();
        console.log(data_d.data);
        setDetalle(
          data_d.data.filter((d) => {
            return d.ProductoId === data.ProductoId;
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrdenesTrabajo();
  }, []);

  const PREPARACION = [
    {
      name: "Preparación",
      selector: "Preparación.String",
      sortable: true,
    },
  ];
  const expandableRowsComponent = () => {
    const preparacionData = detalle.filter(
      (d) => d.ProductoId === data.ProductoId
    );
    return (
      <div>
        <DataTable
          columns={PREPARACION}
          data={preparacionData}
          className='shadow-lg bg-body text-center'
          noHeader
          highlightOnHover
          striped
          responsive
        />
      </div>
    );
  };

  return (
    <>
      <DataTable
        columns={COLUNS_DETAILS_TABLE}
        data={detalle}
        expandableRows
        expandableRowsComponent={expandableRowsComponent}
        highlightOnHover
        striped
        responsive
        className='shadow-lg bg-body'
        defaultSortField='Estudio'
      />
    </>
  );
};

export default DetalleFila;
