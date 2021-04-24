import React from 'react';
import Progress from './Progress';
import Cookies from 'universal-cookie';
import Dial from './Dial';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

// dashboard should contain the dial and the progress bar
const Dashboard = () => {
  const cookies = new Cookies();
  const username = cookies.get('appUsername');
  const amountGoal = 20;
  const amountLeft = 15;
  const percentageLeft = amountLeft / amountGoal;

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Dial />
        </Grid>
        <Grid item xs={4}>
          <Progress amountGoal={amountGoal} amountLeft={amountLeft} />
        </Grid>
      </Grid>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default Dashboard;
