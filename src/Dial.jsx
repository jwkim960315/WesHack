import { rgbToHex } from "@material-ui/core";
import { SportsRugbySharp } from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const Dial = ({ goal, past, timeUnit, moneyUnit, spendingRatio }) => {
  const dialWrapperRef = useRef(null);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    setRerender((prevRerender) => !prevRerender);
  }, [dialWrapperRef]);

  // var spendingRatio = past / goal;
  // var spendingDisplay = Math.min(2, spendingRatio);

  const spending = () => {
    if (spendingRatio > 1.75) {
      return "Really Overspending";
    } else if (spendingRatio > 1.25) {
      return "Overspending";
    } else if (spendingRatio > 1.05) {
      return "Slightly Overspending";
    } else if (spendingRatio > 0.95) {
      return "Spending Right";
    } else if (spendingRatio > 0.75) {
      return "Slightly Underspending";
    } else if (spendingRatio > 0.25) {
      return "Underspending";
    } else {
      return "Really Underspending";
    }
  };

  const getColor = () => {
    if (spendingRatio > 1.75) {
      return "#fd7d1c";
    } else if (spendingRatio > 1.25) {
      return "#e9f922";
    } else if (spendingRatio > 1.05) {
      return "#9df725";
    } else if (spendingRatio > 0.95) {
      return "#55f428";
    } else if (spendingRatio > 0.75) {
      return "#2af239";
    } else if (spendingRatio > 0.25) {
      return "#2eef97";
    } else {
      return "#33dfec";
    }
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  if (spendingRatio) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <div ref={dialWrapperRef}>
          <ReactSpeedometer
            startColor={"#34c9eb"}
            endColor={"#FF471A"}
            width={300}
            height={200}
            maxSegmentLabels={0}
            segments={51}
            value={Math.min(2, spendingRatio)}
            currentValueText={spending()}
            valueTextFontSize={"30px"}
            maxValue={2}
            ringWidth={60}
            textColor={getColor()}
            paddingHorizontal={20}
            paddingVertical={20}
            forceRender={true}
          />
        </div>
        <div style={{ marginLeft: 20 }}>
          <div
            style={{
              width: 250,
              margin: "auto",
              padding: 10,
              backgroundColor: "#555",
            }}
          >
            Based on the past month's data, you have a{" "}
            <span style={{ color: getColor() }} className="predicted">
              predicted
            </span>{" "}
            spending rate of
            <span style={{ color: getColor() }} className="predicted">
              {" " +
                past +
                " " +
                moneyUnit.toLowerCase() +
                " per " +
                timeUnit.toLowerCase()}
            </span>
          </div>
          <div
            style={{
              marginTop: 20,
              width: 250,
              padding: 10,
              backgroundColor: "#555",
            }}
          >
            For this {timeUnit.toLowerCase()}, it is{" "}
            <span className="suggestion">suggested </span>
            you spend approximately{" "}
            <span className="suggestion">
              {goal + " " + moneyUnit.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Dial;
