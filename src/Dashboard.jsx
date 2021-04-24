import React from 'react';
import Progress from './Progress';
import Cookies from 'universal-cookie';

// dashboard should contain the dial and the progress bar
const Dashboard = () => {
  const cookies = new Cookies();
  const username = cookies.get('appUsername');
  const amountGoal = 20;
  const amountLeft = 15;
  const percentageLeft = amountLeft / amountGoal;
  return <Progress amountGoal={amountGoal} amountLeft={amountLeft} />;
};

export default Dashboard;
