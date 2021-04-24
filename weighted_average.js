//Exponential Recency Weighted Average
var transactions = []; //list of dicts of {Meals, Points}
var label = "Meals"; //can be "Meals" or "Points"
var alpha = 0.3;
var weightedavg = 0;
for (var i = 0; i < transactions.length; i++) {
    weightedavg += transactions[i][label]*alpha*Math.pow((1-alpha),transactions.length-i-1)
}
