import React from 'react';

export default function ({ detalle }) {
  return (
    <>
      <div className="sumatorias-estudios px-1 py-3 letra-chica">
        <h4 className="text-center text-white fw-bold">Resultados</h4>
        <table className="table text-white">
          <tbody>
            <tr>
              <td>Pendiente</td>
              <td className="text-end me-3">{detalle.reduce((total, row) => total + row.Pendiente, 0)}</td>
            </tr>
            <tr>
              <td>Tomas</td>
              <td className="text-end me-3">{detalle.reduce((total, row) => total + row.Tomas, 0)}</td>
            </tr>
            <tr>
              <td>Proceso</td>
              <td className="text-end me-3">{detalle.reduce((total, row) => total + row.Proceso, 0)}</td>
            </tr>
            <tr>
              <td>Revisión para firma</td>
              <td className="text-end me-3">{detalle.reduce((total, row) => total + row.RevisionFirma, 0)}</td>
            </tr>
            <tr>
              <td>Liberado en laboratorio</td>
              <td className="text-end me-3">{detalle.reduce((total, row) => total + row.LiberadoLab, 0)}</td>
            </tr>
            <tr>
              <td>Acabados Dental</td>
              <td className="text-end me-3">{detalle.reduce((total, row) => total + row.ProcesoAcabadoDental, 0)}</td>
            </tr>
            <tr>
              <td>Interpretado</td>
              <td className="text-end me-3">{detalle.reduce((total, row) => total + row.Interpretado, 0)}</td>
            </tr>
            <tr>
              <td>Sala de Rayos X</td>
              <td className="text-end me-3">{detalle.reduce((total, row) => total + row.EnSalasRayosX, 0)}</td>
            </tr>
            <tr>
              <td>Liberado en Imagen</td>
              <td className="text-end me-3">{detalle.reduce((total, row) => total + row.LiberadoImg, 0)}</td>
            </tr>
            <tr>
              <td>Para Entregar</td>
              <td className="text-end me-3"> {detalle.reduce((total, row) => total + row.Entregar, 0)}</td>
            </tr>
            <tr>
              <td className="border-none">Cancelado</td>
              <td className="text-end me-3">{detalle.reduce((total, row) => total + row.Cancelado, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
