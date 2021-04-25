import React, { useState, useEffect, useRef } from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import ProgressProvider from './ProgressProvider';

const Progress = ({ goal, left, moneyUnit, timeUnit, valuePercentage }) => {
  const [valueEnd, setValueEnd] = React.useState(valuePercentage);

  useEffect(() => {
    setValueEnd(valuePercentage);
  }, [valuePercentage]);

  if (goal && left !== null) {
    return (
      <div
        style={{
          // padding: "10px 60px 60px 60px",
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
                  top: '48%',
                  left: '45%',
                  color: '#228B22',
                  marginTop: '10%',
                  fontSize: '1.4em'
                }}
              >
                {moneyUnit + ` left`}
              </div>
              <CircularProgressbar
                value={value}
                text={`${left}/${goal}`}
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
  } else {
    return <div></div>;
  }
};

function Wrapper(props) {
  return (
    <div style={{ width: 200, position: 'relative' }}>{props.children}</div>
  );
}

export default Progress;
