import React, { useState, useEffect, useRef } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import {
  calculateRem,
  calculateWeightedAvg,
  convertSpending,
} from "./calculations.js";

const Dial = ({ data }) => {
  const defaultConfig = 1;
  const units = { 0: "day", 1: "week", 2: "2 weeks" };

  const lastDay = new Date("May 22, 2021 00:00:00");
  var remainingDays = (lastDay - Date.now()) / 1000 / 24 / 60 / 60;
  remainingDays = Math.ceil(remainingDays);

  const [timeUnit, setTimeUnit] = useState(units[1]);
  const [isPoints, setIsPoints] = useState(null);
  const [goal, setGoal] = useState(null);
  const [past, setPast] = useState(null);
  const [moneyUnit, setMoneyUnit] = useState(null);
  const [spendingRatio, setRatio] = useState(null);

  const dialWrapperRef = useRef(null);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const hasMeals = data.totalMeals !== 0;
    const hasPoints = data.totalPoints !== 0;
    var unit = hasPoints ? "Points" : "Meals";
    var pastRate = calculateWeightedAvg(data.transactions, unit);
    // console.log(pastRate);

    var currDay = new Date();
    var dayOfTheWeek = currDay.getDay();
    dayOfTheWeek = dayOfTheWeek !== 0 ? dayOfTheWeek : 7;
    var remAmt = calculateRem(
      data.transactions,
      data.remainingMeals,
      data.remainingPoints,
      units[1],
      dayOfTheWeek
    );
    var remPtsRate = (remAmt.points / remainingDays).toFixed(2);
    var remMealsRate = (remAmt.meals / remainingDays).toFixed(1);
    var currRate = hasPoints ? remPtsRate : remMealsRate;

    setIsPoints(hasPoints);
    setGoal(currRate);
    setPast(pastRate);
    setMoneyUnit(unit);
    setRerender((prevRerender) => !prevRerender);
    setRatio(pastRate / currRate);
  }, [data, dialWrapperRef]);

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
            width={Math.max(
              dialWrapperRef.current
                ? dialWrapperRef.current.offsetWidth * 0.7
                : 0,
              300
            )}
            height={Math.max(
              dialWrapperRef.current
                ? dialWrapperRef.current.offsetWidth * 0.4
                : 0,
              200
            )}
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
          />
        </div>
        <div style={{ marginLeft: 20 }}>
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
                convertSpending(past, timeUnit) +
                " " +
                moneyUnit +
                " per " +
                timeUnit}
            </span>
          </div>
          <div style={{ marginTop: 20 }}>
            For this week, it is <span className="suggestion">suggested </span>
            you spend approximately{" "}
            <span className="suggestion">
              {Math.round(convertSpending(goal, timeUnit)) + " " + moneyUnit}
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
