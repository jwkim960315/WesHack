export function calculateRem(
  transactions,
  remainingMeals,
  remainingPoints,
  timePeriod,
  date
) {
  var remainingMealsSince = remainingMeals;
  var remainingPointsSince = remainingPoints;
  if (timePeriod === "Day") {
    remainingMealsSince += transactions[transactions.length - 1]["Meals"];
    remainingPointsSince += transactions[transactions.length - 1]["Points"];
  } else if (timePeriod === "Week") {
    for (var i = 0; i < date; i++) {
      remainingMealsSince += transactions[transactions.length - 1 - i]["Meals"];
      remainingPointsSince +=
        transactions[transactions.length - 1 - i]["Points"];
    }
  } else {
    for (var i = 0; i < date + 7; i++) {
      remainingMealsSince += transactions[transactions.length - 1 - i]["Meals"];
      remainingPointsSince +=
        transactions[transactions.length - 1 - i]["Points"];
    }
  }
  // console.log(remainingPoints, remainingPointsSince);
  // console.log(remainingMeals, remainingMealsSince);
  return {
    points: remainingPointsSince,
    meals: remainingMealsSince,
  };
}

export function calculateWeightedAvg(transactions, label) {
  //Exponential Recency Weighted Average
  var alpha = 0.15;
  var weightedavg = 0;
  for (var i = 0; i < transactions.length; i++) {
    weightedavg +=
      transactions[i][label] *
      alpha *
      Math.pow(1 - alpha, transactions.length - i - 1);
  }
  return weightedavg;
}

export function convertSpending(goalAmt, timeUnit) {
  if (timeUnit === "Week") {
    return (goalAmt * 7).toFixed(2);
  } else {
    return goalAmt.toFixed(2);
  }
}

export function getPreviousMonday() {
  // https://stackoverflow.com/questions/35088088/javascript-for-getting-the-previous-monday
  var prevMonday = new Date();
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));
  return prevMonday;
}

export function getNextSunday() {
  var nextSunday = new Date();
  nextSunday.setDate(nextSunday.getDate() + (nextSunday.getDay() % 7));
  return nextSunday;
}
