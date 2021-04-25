import React, { useState } from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import ProgressProvider from './ProgressProvider';

const Progress = ({ data }) => {
  const defaultConfig = 1;
  const units = { 0: 'day', 1: 'week', 2: '2 weeks' };
  const lastDay = new Date('May 22, 2021 00:00:00');
  var remainingDays = (lastDay - Date.now()) / 1000 / 24 / 60 / 60;
  remainingDays = Math.ceil(remainingDays);

  const [timeUnit, setTimeUnit] = useState(units[1]);
  const [isPoints, setIsPoints] = useState(null);
  const [goal, setGoal] = useState(null);
  const [past, setPast] = useState(null);
  const [moneyUnit, setMoneyUnit] = useState(null);

  // const [goal, setGoal] = useState(null);

  const amountGoal = 20;
  const amountLeft = 15;
  const valuePercentage = 100 * (1 - amountLeft / amountGoal);
  const [valueEnd, setValueEnd] = React.useState(valuePercentage);
  return (
    <div
      style={{
        padding: '10px 60px 60px 60px',
        margin: 'auto',
        position: 'relative'
      }}
    >
      <ProgressProvider valueEnd={valueEnd}>
        {value => (
          <>
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '35%',
                color: '#228B22',
                marginTop: '10%',
                fontSize: '0.9em'
              }}
            >
              {`meals left`}
            </div>
            <CircularProgressbar
              value={value}
              text={`${15}/${20}`}
              styles={{
                // Customize the path, i.e. the "completed progress"
                path: {
                  stroke: `rgba(255, 255, 255, ${value / 100})`,
                  transition: 'stroke-dashoffset 0.5s ease 0s'
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                  // Trail color
                  stroke: '#228B22'
                },
                // Customize the text
                text: {
                  fill: '#228B22'
                  // fontSize: '14px'
                }
              }}
            />
          </>
        )}
      </ProgressProvider>
    </div>
  );
};

function Wrapper(props) {
  return (
    <div style={{ width: 200, position: 'relative' }}>{props.children}</div>
  );
}

export default Progress;
