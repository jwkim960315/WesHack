import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const Dial = () => {
  var configTime = "week";
  var isPoints = true;
  var pastSpendingRate = 10;
  var moneyUnit = isPoints ? " points" : " meals";

  const lastDay = new Date("May 22, 2021 00:00:00");
  var remainingDays = (lastDay - Date.now()) / 1000 / 24 / 60 / 60;
  remainingDays = Math.ceil(remainingDays);

  var remainingPoints = 1200; // change
  var goalSpendingRate = remainingPoints / remainingDays;

  var spendingRatio = pastSpendingRate / goalSpendingRate;
  var spendingDisplay = Math.min(2, spendingRatio);

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
      return "#fbcb1f";
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

  const convertSpending = (goal) => {
    if (configTime === "week") {
      return (goal * 7).toFixed(2);
    } else {
      return goal.toFixed(2);
    }
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function calculateWeightedAvg() {
    //Exponential Recency Weighted Average
    var transactions = []; //list of dicts of {Meals, Points}
    var label = "Meals"; //can be "Meals" or "Points"
    var alpha = 0.3;
    var weightedavg = 0;
    for (var i = 0; i < transactions.length; i++) {
      weightedavg +=
        transactions[i][label] *
        alpha *
        Math.pow(1 - alpha, transactions.length - i - 1);
    }
    return weightedavg;
  }

  return (
    <div style={{ textAlign: "center" }}>
      {/* <div style={{ display: "inline-block" }}>Underspending</div> */}
      <div>
        <ReactSpeedometer
          startColor={"#34c9eb"}
          endColor={"#FF471A"}
          width={Math.max(getWindowDimensions().width * 0.6, 300)}
          height={Math.max(getWindowDimensions().width * 0.35, 175)}
          maxSegmentLabels={0}
          segments={51}
          value={spendingDisplay}
          currentValueText={spending()}
          valueTextFontSize={"30px"}
          maxValue={2}
          ringWidth={120}
          textColor={getColor()}
          // customSegmentLabels={labels}
        />
      </div>
      <div style={{ width: "300px", margin: "auto" }}>
        Based on the past month's data, you have a{" "}
        <span style={{ color: getColor() }} className="predicted">
          predicted
        </span>{" "}
        spending rate of
        <span
          style={{ color: getColor(), display: "block" }}
          className="predicted"
        >
          {" " +
            convertSpending(pastSpendingRate) +
            moneyUnit +
            " per " +
            configTime}
        </span>
      </div>
      <div style={{ marginTop: 20 }}>
        For the next week, you <span className="suggestion">can</span> spend{" "}
        <span className="suggestion" style={{ display: "block" }}>
          {convertSpending(goalSpendingRate) + moneyUnit}
        </span>
      </div>
    </div>
  );
};

export default Dial;
