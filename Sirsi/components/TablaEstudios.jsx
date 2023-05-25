import React from 'react';
import FiltrosEstudios from './FiltrosEstudios';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import GraficaEstudios from './GraficaEstudios';

import { useTheme } from '@mui/material/styles';
import { Card, Grid, useMediaQuery } from '@mui/material';
import { gridSpacing } from 'store/constant';

export default function TablaEstudios({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }) {
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title
    },
    {
      name: 'Year',
      selector: (row) => row.year
    }
  ];

  const data = [
    {
      id: 1,
      title: 'AMERICAS',
      year: 178
    },
    {
      id: 2,
      title: 'CIRCUNVALACION',
      year: 291
    },
    {
      id: 3,
      title: 'COPERNICO',
      year: 531
    },
    {
      id: 4,
      title: 'EMPRESARIAL',
      year: 23
    },
    {
      id: 5,
      title: 'FEDERALISMO',
      year: 657
    },
    {
      id: 6,
      title: 'LOPEZ_MATEOS',
      year: 123
    },
    {
      id: 7,
      title: 'MEXICO',
      year: 436
    },
    {
      id: 8,
      title: 'NACIONES UNIDAS',
      year: 59
    },
    {
      id: 9,
      title: 'PATRIA',
      year: 297
    },
    {
      id: 10,
      title: 'PORTATIL',
      year: 8
    }
  ];

  const tableData = {
    columns: columns,
    data: data,
    fileName: 'document',
    export: true,
    print: true,
    filterHidden: true,
    filterDigit: 1
  };

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
          <FiltrosEstudios />
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={4} md={4}>
            <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '10px' }}>
                <DataTable data={data} columns={columns} responsive="true" dense pagination paginationPerPage={5} fixedHeader />
            </Card>
          </Grid>
          <Grid item xs={12} lg={8} md={8}>
            <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
              <GraficaEstudios data={data} />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={12} md={12}>
            <Card sx={{ bgcolor: bgcolor || '', position: 'relative', paddingTop: '10px' }}>
              <DataTableExtensions {...tableData}>
                <DataTable data={data} columns={columns} searchable responsive="true" dense pagination fixedHeader />
              </DataTableExtensions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
