import React from 'react';
import Progress from './Progress';
import Cookies from 'universal-cookie';
import Dial from './Dial';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// dashboard should contain the dial and the progress bar
const Dashboard = () => {
  const cookies = new Cookies();
  const username = cookies.get('appUsername');
  const amountGoal = 20;
  const amountLeft = 15;
  const percentageLeft = amountLeft / amountGoal;

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Progress amountGoal={amountGoal} amountLeft={amountLeft} />
      <Dial />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default Dashboard;
