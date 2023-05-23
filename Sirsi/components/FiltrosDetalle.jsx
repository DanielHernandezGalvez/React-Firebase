import React, { useState, useEffect } from 'react';
import SelectUsuario from './select/SelectUsuario';
import SelectSucursal from './select/SelectSucursal';
import SelectPregunta from './select/SelectPregunta';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { format } from 'date-fns';

export default function FiltrosDetalle({ detalleEncuesta }) {

  const [usuarios, setUsuarios] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [filtros, setFiltros] = useState({
    usuarios: null,
    sucursales: null,
    preguntas: null
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const aplicarFiltros = () => {
    const datosFiltrados = detalleEncuesta.filter((row) => {
      const selectedUsuario = usuarios.length === 0 || usuarios.includes(row.Usuario);
      const selectedSucursal = sucursales.length === 0 || sucursales.includes(row.Sucursal);
      const selectedPregunta = preguntas.length === 0 || preguntas.includes(row.Pregunta);
      return selectedUsuario && selectedSucursal && selectedPregunta;
    });
  
    setFiltros(datosFiltrados);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [usuarios, sucursales, preguntas]);

  return (
    <div className="row mb-4 d-flex">
      <div className="input-group d-flex justify-content-center">
        <SelectSucursal setSucursales={setSucursales} detalleEncuesta={detalleEncuesta} usuarios={usuarios} />

        <SelectPregunta setPreguntas={setPreguntas} detalleEncuesta={detalleEncuesta} preguntas={preguntas} />
        {console.log(usuarios)}
        <SelectUsuario setUsuarios={setUsuarios} detalleEncuesta={detalleEncuesta} sucursales={sucursales} />
      </div>

    </div>
  );
}
