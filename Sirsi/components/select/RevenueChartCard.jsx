import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';

// third party
import dynamic from 'next/dynamic';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'components/ui-component/cards/MainCard';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ===========================|| REVENUE CHART CARD ||=========================== //

const RevenueChartCard = ({ chartData, bueno, regular, malo, ordenes }) => {
  const theme = useTheme();

  const { rtlLayout } = useConfig();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MainCard title={ordenes}>
      <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
        <Grid item xs={12} sm={7} md={12} sx={{ '& .apexcharts-legend-text': { marginLeft: rtlLayout ? '8px' : 'initial' } }}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type={chartData.options.chart.type}
            height={chartData.options.chart.height}
          />
        </Grid>
        <Box sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}>
          <Grid item>
            <Divider />
          </Grid>
        </Box>
        <Grid item container justifyContent="space-around" alignItems="center" xs={12} sm={5} md={12}>
          <Grid item sm={4}>
            <Grid container direction="column">
              <Typography variant="h6">Bueno</Typography>
              <Typography variant="subtitle1" style={{ color: theme.palette.primary.main }}>
              {bueno}%
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <Grid container direction="column">
              <Typography variant="h6">Regular</Typography>
              <Box sx={{ color: theme.palette.secondary.main }}>
                <Typography variant="subtitle1" color="inherit">
                  {regular}%
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <Grid container direction="column">
              <Typography variant="h6">Malo</Typography>
              <Typography variant="subtitle1" style={{ color: theme.palette.error.main }}>
                {malo}%
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

RevenueChartCard.propTypes = {
  chartData: PropTypes.object
};

export default RevenueChartCard;
