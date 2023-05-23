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

      {/* {filtros.length > 0 && (
      <TableContainer>
        <Table xs={8} size="small" aria-label="a dense table">
        <TableHead>
              <TableRow>
                <TableCell xs={3}>Folio</TableCell>
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Departamento</TableCell>
                <TableCell align="left">Pregunta</TableCell>
                <TableCell align="left">Etiqueta</TableCell>
                <TableCell align="left">Calificacion</TableCell>
                <TableCell align="left">Sucursal</TableCell>
                <TableCell align="left">Caja</TableCell>
                <TableCell align="left">Usuario</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {filtros
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover>
                <TableCell align="left" component="th" scope="row">
                  {row.Folio}
                </TableCell>
                <TableCell align="left"> {format(new Date(row.Fecha), 'dd/MM/yyyy')}</TableCell>
                <TableCell align="left">{row.Departamento}</TableCell>
                <TableCell align="left">{row.Pregunta}</TableCell>
                <TableCell align="left">{row.Etiqueta}</TableCell>
                <TableCell align="left">{row.Calificacion}</TableCell>
                <TableCell align="left">{row.Sucursal}</TableCell>
                <TableCell align="left">{row.Caja}</TableCell>
                <TableCell align="left">{row.Usuario}</TableCell> 
              </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filtros.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-toolbar': {
              width: '400px',
            },
          }}
        />
      </TableContainer> 
    )}*/}

    </div>
  );
}
