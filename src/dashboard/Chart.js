import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart(props) {
  const theme = useTheme();
  const userData = props.transactions;
  const showMeal = true;

  let dataSeq = [];
  for (let i = 0; i < userData.length; i++) {
    const field = showMeal ? 'Meals' : 'Points';
    console.log(field);
    dataSeq.push(createData(i, userData[i][field]));
  }

  const data = dataSeq;
  return (
    <React.Fragment>
      <Title>{showMeal ? 'Meals' : 'Points'} Used in Last Month</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              {showMeal ? 'Meals (swipe)' : 'Points ($)'}
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
