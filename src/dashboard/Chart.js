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

const username = 'user1';

fetch(`../${username}.json`)
  .then(response => response.json())
  .then(data => console.log(data));

const userData = [
  { Meals: 2, Points: 8 },
  { Meals: 3, Points: 0 },
  { Meals: 3, Points: 0 },
  { Meals: 2, Points: 25 },
  { Meals: 0, Points: 0 },
  { Meals: 2, Points: 0 },
  { Meals: 2, Points: 0 },
  { Meals: 3, Points: 0 },
  { Meals: 1, Points: 20 },
  { Meals: 2, Points: 15 },
  { Meals: 2, Points: 0 },
  { Meals: 3, Points: 0 },
  { Meals: 2, Points: 0 },
  { Meals: 3, Points: 15 },
  { Meals: 0, Points: 0 },
  { Meals: 2, Points: 0 },
  { Meals: 1, Points: 25 },
  { Meals: 2, Points: 0 },
  { Meals: 0, Points: 0 },
  { Meals: 3, Points: 0 },
  { Meals: 3, Points: 0 },
  { Meals: 2, Points: 0 },
  { Meals: 2, Points: 0 },
  { Meals: 2, Points: 0 },
  { Meals: 1, Points: 0 },
  { Meals: 2, Points: 0 },
  { Meals: 2, Points: 0 },
  { Meals: 3, Points: 0 },
  { Meals: 1, Points: 0 },
  { Meals: 2, Points: 0 }
];
let dataMeals = [];
let dataPoints = [];
let sumMeals = 0;
let sumPoints = 0;
for (let i = 0; i < userData.length; i++) {
  sumMeals += userData[i]['Meals'];
  sumPoints += userData[i]['Points'];
  dataMeals.push(createData(i, userData[i]['Meals']));
  dataPoints.push(createData(i, userData[i]['Points']));
}

const data = dataPoints;
// [
//   createData('00:00', 0),
//   createData('00:00', 10),
//   createData('00:00', 22),
//   createData('00:00', 100),
//   createData('00:00', 43),
//   createData('00:00', 56),
//   createData('00:00', 200),
//   createData('00:00', 34),
//   createData('03:00', 300),
//   createData('06:00', 60),
//   createData('09:00', 80),
//   createData('12:00', 150),
//   createData('15:00', 200),
//   createData('18:00', 240),
//   createData('21:00', 240),
//   createData('24:00', undefined)
// ];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Meals/Points Tracker</Title>
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
              Meals / Points ($)
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
