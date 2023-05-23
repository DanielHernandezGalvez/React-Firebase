// material-ui
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import React, { useState } from 'react';
import { format } from 'date-fns';
// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';
import SecondaryAction from 'components/ui-component/cards/CardSecondaryAction';
import CSVExport from './tbl-exports';
import { width } from '@mui/system';
import FiltrosDetalle from './FiltrosDetalle';
import Collapse from '@mui/material/Collapse';


// ==============================|| TABLE - DENSE ||============================== //

function DenseTable({ getResultados, data, detalleEncuesta }) {
  // table data
  function createData(Pregunta, Etiqueta, Departamento, Bueno, Regular, Malo) {
    return { Pregunta, Etiqueta, Departamento, Bueno, Regular, Malo };
  }
  // density="compact"

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [button, setbutton] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [expanded, setExpanded] = useState(false);


  const handleBtn = () => {
    setRotated(!rotated);
    setExpanded(!expanded);
    setbutton(!button);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const header = [
    { label: 'Pregunta', key: 1 },
    { label: 'Etiqueta', key: 2 },
    { label: 'Departamento', key: 3 },
    { label: 'Bueno', key: 4 },
    { label: 'Regular', key: 5 },
    { label: 'Malo', key: 6 }
  ];

  return (
    <Page title="">
      {detalleEncuesta.length > 0 && <FiltrosDetalle detalleEncuesta={detalleEncuesta} />}
      <MainCard
        content={false}
        title=""
        secondary={
          <Stack direction="row" spacing={1} alignItems="center">
            <CSVExport data={detalleEncuesta} filename="dense-table.csv" header={header} />
            {/* <SecondaryAction link="https://next.material-ui.com/components/tables/" /> */}
          </Stack>
        }
      >
        <div className="ms-2">
          <button onClick={() => handleBtn()} className={`btn text-secondary ${rotated ? 'rotate-down' : ''}`}>
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
        {button && (
           <Collapse in={expanded}>
           <div className={`collapsed-content ${expanded ? '' : 'closed'}`}>
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
                {detalleEncuesta.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover key={row.Folio}>
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
              count={detalleEncuesta.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                '& .MuiTablePagination-toolbar': {
                  width: '400px'
                }
              }}
            />
          </TableContainer>
          </div>
    </Collapse>
        )}
      </MainCard>
    </Page>
  );
}

DenseTable.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DenseTable;
