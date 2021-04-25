# Wesleyan Meal and Points Budgeting App

This project is a react webapp designed to help Wesleyan students keep track of their meal and points spending as well as suggest whether they should spend more or less.

## Login

Allows the user to login with their wesleyan credentials and pulls data from transact to budget their spending.
(currently, to test the webapp, we have temporary users set up with mock data. This will be replaced with API requests once we have access to the transact data)

##### Test Users

The usernames and passwords of the temporary users with mock data are listed in UserDataListings.txt in the repo. This also will show the exact information connected with each user. Total meals and total points are dependent on the given meal plan, while remaining meals, remaining points, and transactions in the last month will all have been pulled from transact. (right now, a random number generator was used to create the data, so the noticeable trends are a little lackluster)

## Dashboard

This is the main page on which we display all of the user's spending/swiping information as well as predictions for future spending.

### Nav Bar

The nav bar allows the user to log out as well as change their customized settings for the type of currency that they want to budget and the time period over which they want to budget.

### Predictive Dial

This dial predicts the future spending of the user and compares it to what they should be spending to end the semester will out exceeding their point limit.

### Periodic Limit

In this component, the user will be able to see how much they have spent in a day/week/2 weeks, and how much they should be spending in that time period.

### Charted Transactions

This is a graph of the spending in the last 30 days. This data is also used to formulate a prediction of the user's future spending using a exponentially weighted average.




