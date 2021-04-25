import React from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import ProgressProvider from './ProgressProvider';

const Progress = props => {
  const amountGoal = props.amountGoal;
  const amountLeft = props.amountLeft;
  const valuePercentage = 100 * (1 - amountLeft / amountGoal);
  const displayMeals = false;
  const displayPoints = false;
  const [valueEnd, setValueEnd] = React.useState(valuePercentage);
  return (
    <div
      style={{
        padding: '60px 60px 60px 60px',
        margin: 'auto',
        marginTop: 0,
        display: 'flex',
        width: 400,
        position: 'relative'
      }}
    >
      <Wrapper
        label="Status Report"
        description={`Predicted spending rate: 70.00 points per week \n
        Allowance next week: 300.00 points`}
      >
        <ProgressProvider valueEnd={valueEnd}>
          {value => (
            <CircularProgressbar
              value={value}
              text={`${15}/${20}`}
              styles={{
                // Customize the path
                path: {
                  stroke: `rgba(0, 0, 0, ${value / 100})`,
                  transition: 'stroke-dashoffset 1.0s ease 1.0s'
                }
              }}
            />
          )}
        </ProgressProvider>
      </Wrapper>
    </div>
  );
};

function Wrapper(props) {
  return (
    <div style={{ marginTop: 0 }}>
      <div style={{ width: 200, position: 'relative' }}>{props.children}</div>
      {/* <h1>{props.label}:</h1> */}
      <p>{props.description}</p>
    </div>
  );
}

export default Progress;
