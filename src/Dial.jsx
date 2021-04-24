import React, { useState, useEffect, useRef } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const Dial = ({ data }) => {
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

  const dialWrapperRef = useRef(null);
  const [rerender, setRerender] = useState(false);

  // useEffect(() => {
  //   setRerender(prevRerender => !prevRerender);
  // }, [dialWrapperRef]);

  // var pastSpendingRate = 10;
  // var moneyUnit = isPoints ? " points" : " meals";

  useEffect(() => {
    const hasMeals = data.totalMeals !== 0;
    const hasPoints = data.totalPoints !== 0;
    var remPtsRate = (data.remainingPoints / remainingDays).toFixed(2);
    var remMealsRate = (data.remainingMeals / remainingDays).toFixed(1);
    var currRate = hasPoints ? remPtsRate : remMealsRate;
    var unit = hasPoints ? 'Points' : 'Meals';
    var pastRate = calculateWeightedAvg(data.transactions, unit);
    console.log(pastRate);

    var currDay = new Date();
    var dayOfTheWeek = currDay.getDay();
    dayOfTheWeek = dayOfTheWeek !== 0 ? dayOfTheWeek : 7;

    setIsPoints(hasPoints);
    setGoal(currRate);
    setPast(pastRate);
    setMoneyUnit(unit);
    setRerender(prevRerender => !prevRerender);
  }, [data, dialWrapperRef]);

  var spendingRatio = past / goal;
  var spendingDisplay = Math.min(2, spendingRatio);

  const spending = () => {
    if (spendingRatio > 1.75) {
      return 'Really Overspending';
    } else if (spendingRatio > 1.25) {
      return 'Overspending';
    } else if (spendingRatio > 1.05) {
      return 'Slightly Overspending';
    } else if (spendingRatio > 0.95) {
      return 'Spending Right';
    } else if (spendingRatio > 0.75) {
      return 'Slightly Underspending';
    } else if (spendingRatio > 0.25) {
      return 'Underspending';
    } else {
      return 'Really Underspending';
    }
  };

  const getColor = () => {
    if (spendingRatio > 1.75) {
      return '#fd7d1c';
    } else if (spendingRatio > 1.25) {
      return '#fbcb1f';
    } else if (spendingRatio > 1.05) {
      return '#9df725';
    } else if (spendingRatio > 0.95) {
      return '#55f428';
    } else if (spendingRatio > 0.75) {
      return '#2af239';
    } else if (spendingRatio > 0.25) {
      return '#2eef97';
    } else {
      return '#33dfec';
    }
  };

  const convertSpending = goal => {
    if (timeUnit === 'week') {
      return (goal * 7).toFixed(2);
    } else {
      return goal.toFixed(2);
    }
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  function calculateWeightedAvg(transactions, label) {
    //Exponential Recency Weighted Average
    var alpha = 0.3;
    var weightedavg = 0;
    for (var i = 0; i < transactions.length; i++) {
      console.log(transactions[i]['Meals'], i);
      weightedavg +=
        transactions[i][label] *
        alpha *
        Math.pow(1 - alpha, transactions.length - i - 1);
    }
    return weightedavg;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {/* <div style={{ display: "inline-block" }}>Underspending</div> */}
      <div ref={dialWrapperRef}>
        <ReactSpeedometer
          startColor={'#34c9eb'}
          endColor={'#FF471A'}
          // width={Math.max(dialWrapperRef.current.offsetWidth * 0.6, 300)}
          // height={Math.max(dialWrapperRef.current.offsetWidth * 0.35, 175)}
          width={Math.max(
            dialWrapperRef.current
              ? dialWrapperRef.current.offsetWidth * 0.6
              : 0,
            300
          )}
          height={Math.max(
            dialWrapperRef.current
              ? dialWrapperRef.current.offsetWidth * 0.35
              : 0,
            175
          )}
          maxSegmentLabels={0}
          segments={51}
          value={spendingDisplay}
          currentValueText={spending()}
          valueTextFontSize={'30px'}
          maxValue={2}
          ringWidth={60}
          textColor={getColor()}
        />
      </div>
      <div style={{ width: '300px', margin: 'auto' }}>
        Based on the past month's data, you have a{' '}
        <span style={{ color: getColor() }} className="predicted">
          predicted
        </span>{' '}
        spending rate of
        <span
          style={{ color: getColor(), display: 'block' }}
          className="predicted"
        >
          {' ' + convertSpending(past) + ' ' + moneyUnit + ' per ' + timeUnit}
        </span>
      </div>
      <div style={{ marginTop: 20 }}>
        For the next week, you <span className="suggestion">can</span> spend{' '}
        <span className="suggestion" style={{ display: 'block' }}>
          {convertSpending(goal) + ' ' + moneyUnit}
        </span>
      </div>
    </div>
  );
};

export default Dial;
