// material-ui
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';
import SecondaryAction from 'components/ui-component/cards/CardSecondaryAction';
// import CSVExport from './tbl-exports';
import React, { useState } from 'react';

// ==============================|| TABLE - DENSE ||============================== //

function DenseTablaDetalle({ dataMedicos }) {

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

  return (
    <>
      <Page title="">
        <MainCard
          content={false}
          title=""
          secondary={
            <Stack direction="row" spacing={2} alignItems="center">
              {/* <CSVExport data={dataFaltante} filename="dense-table.csv" header={header} /> */}
              {/* <SecondaryAction link="https://next.material-ui.com/components/tables/" /> */}
            </Stack>
          }
        >
          <TableContainer>
            <Table xs={12} id="tablaExcel" size="small" aria-label="a dense table">
              <TableHead>
                <TableCell xs={3}>Médico</TableCell>
                <TableCell align="left">AMERICAS</TableCell>
                <TableCell align="left">CIRCUNVALACION</TableCell>
                <TableCell align="left">COPERNICO</TableCell>
                <TableCell align="left">EMPRESARIAL</TableCell>
                <TableCell align="left">FEDERALISMO</TableCell>
                <TableCell align="left">LOPEZ MATEOS</TableCell>
                <TableCell align="left">MEXICO</TableCell>
                <TableCell align="left">MOVIL</TableCell>
                <TableCell align="left">PATRIA</TableCell>
                <TableCell align="left">REVOLUCION</TableCell>
                <TableCell align="left">RIO NILO</TableCell>
                <TableCell align="left">GRAND TOTAL</TableCell>
              </TableHead>
              <TableBody>
                {dataMedicos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover key={row.Folio}>
                    <TableCell align="left" component="th" scope="row">
                      {row.Medico}
                    </TableCell>
                    <TableCell align="left"> {row.Total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={dataMedicos.length}
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
        </MainCard>
      </Page>
    </>
  );
}

DenseTablaDetalle.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DenseTablaDetalle;
