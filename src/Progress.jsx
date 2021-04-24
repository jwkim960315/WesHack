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
    <div style={{ padding: '40px 40px 40px 40px', margin: 'auto' }}>
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
            //   <>
            //     <div
            //       style={{
            //         position: 'absolute',
            //         top: '50%',
            //         left: '35%',
            //         color: '#228B22',
            //         marginTop: '10%',
            //         fontSize: '0.5em'
            //       }}
            //     >
            //       {`meals left`}
            //     </div>
            //     <CircularProgressbar
            //       value={value}
            //       text={`${15}/${20}`}
            //       styles={{
            //         // Customize the path, i.e. the "completed progress"
            //         path: {
            //           stroke: `rgba(0, 0, , ${value / 100})`,
            //           transition: 'stroke-dashoffset 1.0s ease 1.0s'
            //         },
            //         // Customize the circle behind the path, i.e. the "total progress"
            //         trail: {
            //           // Trail color
            //           stroke: '#228B22'
            //         },
            //         // Customize the text
            //         text: {
            //           fill: '#228B22'
            //           // fontSize: '14px'
            //         }
            //       }}
            //     />
            //   </>
          )}
        </ProgressProvider>
      </Wrapper>
    </div>
  );
};

function Wrapper(props) {
  return (
    <div style={{ marginBottom: 50 }}>
      <div style={{ marginTop: 0, display: 'flex' }}>
        <div style={{ width: 400, position: 'relative' }}>{props.children}</div>
        <div style={{ marginLeft: 30 }}>
          <h1>{props.label}:</h1>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Progress;
