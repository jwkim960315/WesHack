//calculate remaining points and meals since last time period
var transactions = []; //list of dicts of {Meals, Points}
var remainingMeals = 0; //will need to be set
var remainingPoints = 0; // will need to be set
var timePeriod = "day"; //can be "day", "week", or "2 weeks"
var date = 3; //can be 1 through 7 (3 is Wed.)
var remainingMealsSince = remainingMeals;
var remainingPointsSince = remainingPoints;
if (timePeriod === "day") {
    remainingMealsSince += transactions[transactions.length-1]["Meals"]
    remainingPointsSince += transactions[transactions.length-1]["Points"]
} else if (timePeriod === "week") {
    for (var i = 0; i < date; i++) {
        remainingMealsSince += transactions[transactions.length-1-i]["Meals"]
        remainingPointsSince += transactions[transactions.length-1-i]["Points"]
    }
} else {
    for (var i = 0; i < date; i++) {
        remainingMealsSince += transactions[transactions.length-1-i]["Meals"]
        remainingPointsSince += transactions[transactions.length-1-i]["Points"]
    }
}

//Exponential Recency Weighted Average
var label = "Meals"; //can be "Meals" or "Points"
var alpha = 0.3;
var weightedavg = 0;
for (var i = 0; i < transactions.length; i++) {
    weightedavg += transactions[i][label]*alpha*Math.pow((1-alpha),transactions.length-i-1)
}
