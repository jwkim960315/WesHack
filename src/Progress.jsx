import React, { useState, useEffect, useRef } from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ProgressProvider from "./ProgressProvider";

const Progress = ({ goal, left }) => {
  // const goal = 20;
  // const left = 15;
  // console.log(goal, left);
  // const [goalAmt, setGoalAmt] = useState(goal);
  // const [leftAmt, setLeftAmt] = useState(left);

  // useEffect(() => {
  //   setGoalAmt(goal);
  //   setLeftAmt(left);
  //   console.log(goal, left);
  // }, [goal, left]);
  const valuePercentage = 100 * (1 - left / goal);
  const [valueEnd, setValueEnd] = React.useState(valuePercentage);
  if (goal && left) {
    return (
      <div
        style={{
          padding: "10px 60px 60px 60px",
          margin: "auto",
          position: "relative",
        }}
      >
        <ProgressProvider valueEnd={valueEnd}>
          {(value) => (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "35%",
                  color: "#228B22",
                  marginTop: "10%",
                  fontSize: "0.9em",
                }}
              >
                {`meals left`}
              </div>
              <CircularProgressbar
                value={value}
                text={`${left}/${goal}`}
                styles={{
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    stroke: `rgba(255, 255, 255, ${value / 100})`,
                    transition: "stroke-dashoffset 0.5s ease 0s",
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    // Trail color
                    stroke: "#228B22",
                  },
                  // Customize the text
                  text: {
                    fill: "#228B22",
                    // fontSize: '14px'
                  },
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
    <div style={{ width: 200, position: "relative" }}>{props.children}</div>
  );
}

export default Progress;
