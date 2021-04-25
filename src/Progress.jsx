import React, { useState, useEffect, useRef } from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ProgressProvider from "./ProgressProvider";

const Progress = ({ goal, left, moneyUnit, timeUnit, valuePercentage }) => {
  const [valueEnd, setValueEnd] = React.useState(valuePercentage);

  useEffect(() => {
    setValueEnd(valuePercentage);
  }, [valuePercentage]);

  if (goal && left !== null) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#ff5722",
          }}
        >
          Current Plan
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            position: "relative",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 350, height: 350 }}>
            <ProgressProvider valueEnd={valueEnd}>
              {(value) => (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "27%",
                      color: "#228B22",
                      marginTop: "10%",
                      fontSize: "1.4em",
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
          <div style={{ marginLeft: 30, width: 250 }}>
            <div
              style={{
                padding: 10,
                backgroundColor: "#555",
                fontSize: 24,
              }}
            >
              For {timeUnit === "Week" ? "this week" : "today"}, it is{" "}
              <span className="suggestion">suggested </span>
              you spend approximately{" "}
              <span className="suggestion">
                {goal + " " + moneyUnit.toLowerCase()}
              </span>
            </div>
            <div
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: "#555",
                fontSize: 16,
              }}
            >
              <ul>
                <li>
                  <span style={{ color: "#7acc7a", fontWeight: "bold" }}>
                    Spent:
                  </span>{" "}
                  {goal - left + " " + moneyUnit.toLowerCase()}
                </li>
                <li>
                  <span style={{ color: "#2ea32e", fontWeight: "bold" }}>
                    Left:
                  </span>{" "}
                  {left + " " + moneyUnit.toLowerCase()}
                </li>
              </ul>
            </div>
          </div>
        </div>
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
