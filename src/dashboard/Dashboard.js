import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import Box from "@material-ui/core/Box";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
import Dial from "../Dial";
import Progress from "../Progress";
// import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import { typeEnum, timePeriodEnum } from "./enums";
import {
  calculateRem,
  calculateWeightedAvg,
  convertSpending,
  getPreviousMonday,
  getNextSunday,
} from "../calculations.js";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    // height: 350,
    height: 500,
  },
  fixedChartHeight: {
    height: 325,
  },
  fixedDateHeight: {
    height: 100,
    textAlign: "center",
  },
}));

export default function Dashboard() {
  const [type, setType] = useState(null);
  // const [type, setType] = useState(typeEnum.POINTS);
  const [timePeriod, setTimePeriod] = useState(timePeriodEnum.WEEK);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightChartPaper = clsx(classes.paper, classes.fixedChartHeight);
  const fixedDateChartPaper = clsx(classes.paper, classes.fixedDateHeight);

  const cookies = new Cookies();
  const username = cookies.get("appUsername");
  var jsonName = `./testUsers/${username}.json`;
  const [data, setData] = useState(null);

  const lastDay = new Date("May 22, 2021 00:00:00");
  var remainingDays = (lastDay - Date.now()) / 1000 / 24 / 60 / 60;
  remainingDays = Math.ceil(remainingDays);
  const todayDateString = new Date(Date.now()).toLocaleDateString();
  const prevMondayString = new Date(getPreviousMonday()).toLocaleDateString();
  const nextSundayString = new Date(getNextSunday()).toLocaleDateString();

  const [goal, setGoal] = useState(null);
  const [past, setPast] = useState(null);
  const [left, setLeft] = useState(null);
  const [spendingRatio, setRatio] = useState(null);
  const [valPercent, setValPercent] = useState(null);

  const getData = async () => {
    return (
      await fetch(jsonName, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).json();
  };

  useEffect(() => {
    // var allData;
    (async () => {
      var dataFromJson = await getData();
      setData(dataFromJson);
      const newType =
        dataFromJson.totalMeals > dataFromJson.totalPoints
          ? typeEnum.MEALS
          : typeEnum.POINTS;
      setType(newType);
      getVars(newType, dataFromJson, timePeriodEnum.WEEK);
    })();
  }, []);

  const getVars = (newType, dataFromJson, newTimePeriod) => {
    newType = newType ? newType : type;
    dataFromJson = dataFromJson ? dataFromJson : data;
    newTimePeriod = newTimePeriod ? newTimePeriod : timePeriod;

    var pastRate = calculateWeightedAvg(dataFromJson.transactions, newType);
    pastRate = parseFloat(pastRate);
    var currDay = new Date();
    var dayOfTheWeek = currDay.getDay();
    dayOfTheWeek = dayOfTheWeek !== 0 ? dayOfTheWeek : 7;
    var sincePeriodStart =
      newType === timePeriodEnum.DAY ? 0 : dayOfTheWeek - 1;

    var remAmt = calculateRem(
      dataFromJson.transactions,
      dataFromJson.remainingMeals,
      dataFromJson.remainingPoints,
      newTimePeriod,
      dayOfTheWeek
    );
    var remInPeriod = calculateRem(
      dataFromJson.transactions,
      0,
      0,
      newTimePeriod,
      dayOfTheWeek
    );

    var remPtsRate = (
      remAmt.points /
      (remainingDays + sincePeriodStart)
    ).toFixed(2);
    var remMealsRate = (
      remAmt.meals /
      (remainingDays + sincePeriodStart)
    ).toFixed(1);

    var currRate = typeEnum.POINTS === newType ? remPtsRate : remMealsRate;
    currRate = parseFloat(currRate);
    var remInPeriodType =
      typeEnum.POINTS === newType ? remInPeriod.points : remInPeriod.meals;
    var goalForPeriod = Math.round(convertSpending(currRate, newTimePeriod));
    var pastRatePeriod = convertSpending(pastRate, newTimePeriod);
    var amtLeft = goalForPeriod - remInPeriodType;

    setLeft(amtLeft);
    setGoal(goalForPeriod);
    setPast(pastRatePeriod);
    setRatio(pastRate / currRate);
    setValPercent(100 * (1 - amtLeft / goalForPeriod));
  };

  return (
    <div className={classes.root}>
      {type && data && (
        <Navbar
          type={type}
          setType={setType}
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
          getVars={getVars}
          hasPoints={data.totalPoints > 0}
          hasMeals={data.totalMeals > 0}
        />
      )}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={fixedDateChartPaper}>
                <div
                  style={{
                    fontSize: 50,
                    color: "#ff5722",
                    height: "100%",
                  }}
                >
                  {timePeriod === timePeriodEnum.WEEK
                    ? prevMondayString + " - " + nextSundayString
                    : todayDateString}
                </div>
              </Paper>
            </Grid>
            {/* Dial */}
            <Grid item xs={12} md={5} lg={5}>
              <Paper className={fixedHeightPaper}>
                {data && (
                  <Dial
                    goal={goal}
                    past={past}
                    timeUnit={timePeriod}
                    moneyUnit={type}
                    spendingRatio={spendingRatio}
                  />
                )}
              </Paper>
            </Grid>
            {/* Progress Bar */}
            <Grid item xs={12} md={7} lg={7}>
              <Paper className={fixedHeightPaper}>
                {goal && left !== null && (
                  <Progress
                    goal={goal}
                    left={left}
                    timeUnit={timePeriod}
                    moneyUnit={type}
                    valuePercentage={valPercent}
                  />
                )}
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightChartPaper}>
                {data && (
                  <Chart transactions={data.transactions} moneyUnit={type} />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
