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
      <Wrapper label="Meals Left" description={80}>
        <ProgressProvider valueEnd={valueEnd}>
          {value => (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '35%',
                  color: '#228B22',
                  marginTop: '10%',
                  fontSize: '0.5em'
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
      </Wrapper>
    </div>
  );
};

// this wrapper is to be styled to fit into the card
function Wrapper(props) {
  return (
    <div style={{ marginBottom: 80 }}>
      <div style={{ marginTop: 0, display: 'flex' }}>
        <div style={{ width: 100, position: 'relative' }}>{props.children}</div>
        <div style={{ marginLeft: 30 }}>
          <h6>
            {props.label}: <span>{props.description}</span>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Progress;
