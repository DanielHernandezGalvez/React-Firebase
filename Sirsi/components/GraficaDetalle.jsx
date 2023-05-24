import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party

import dynamic from 'next/dynamic';

// project imports
import useConfig from 'hooks/useConfig';
import SkeletonTotalGrowthBarChart from 'components/ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// chart data
const chartOptions = {
  chart: {
    height: 200,
    type: 'bar',
    id: 'bar-chart',
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%'
    }
  },
  xaxis: {
    type: 'category', // BARRA DE ABAJO
    categories: ['CONVENIO', 'CORTESIA', 'EMPLEADO', "EMPRESA", 'ESPECIAL', 'INSEN', "LIBRE", 'MEDICO']
  },
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    position: 'bottom',
    offsetX: 20,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: 5
    },
    itemMargin: {
      horizontal: 15,
      vertical: 8
    }
  },
  fill: {
    type: 'solid'
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    show: true
  }
};

// const status = [
//   {
//     value: 'today',
//     label: 'Today'
//   },
//   {
//     value: 'month',
//     label: 'This Month'
//   },
//   {
//     value: 'year',
//     label: 'This Year'
//   }
// ];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading, expedientes }) => {


//   const americas = expedientes.ProductividadSucursalesExpedientes.Sucursal

  const [series] = useState([
    // {
    //   // name: 'Hola',
    //    data: [5, 4, 3, 4, 5,]
    // },
    {
      name: 'Total',
       data: []
    },
    // {
    //   // name: 'Profit',
    //    data: []
    // },
    // {
    //   // name: 'Maintenance',
    //    data: []
    // }
  ]);

  const [value, setValue] = useState('today');
  const theme = useTheme();
  const { navType, rtlLayout } = useConfig();

  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  const [options, setOptions] = useState(chartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [primaryDark, primary200, secondaryMain, secondaryLight],
      xaxis: {
        type: 'category',
        categories: ['CONVENIO', 'CORTESIA', 'EMPLEADO', "EMPRESA", 'ESPECIAL', 'INSEN', "LIBRE", 'MEDICO'],
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: navType === 'dark' ? darkLight + 20 : grey200
      },
      tooltip: {
        theme: navType === 'dark' ? 'dark' : 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    }));
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      {/* <Typography variant="subtitle2">Total Growth</Typography> */}
                    </Grid>
                    <Grid item>
                      {/* <Typography variant="h3">$2,324.00</Typography> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {/* <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ '& .apexcharts-legend-text': { marginLeft: rtlLayout ? '8px' : 'initial' } }}>
              <ReactApexChart options={options} series={series} type="bar" height={200} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
