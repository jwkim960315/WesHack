import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Paper,
  Grid,
  Container,
  Typography
} from '@material-ui/core';
import Chart from './Chart';
import Dial from '../Dial';
import Progress from '../Progress';
import Navbar from './Navbar';
import { typeEnum, timePeriodEnum } from './enums';
import {
  calculateRem,
  calculateWeightedAvg,
  convertSpending,
  getPreviousMonday,
  getNextSunday
} from '../calculations.js';
import deepOrange from '@material-ui/core/colors/deepOrange';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  paperHeight: {
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  fixedChartHeight: {
    height: 300
  },
  fixedDateHeight: {
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function Dashboard() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [type, setType] = useState(null);
  // const [type, setType] = useState(typeEnum.POINTS);
  const [timePeriod, setTimePeriod] = useState(timePeriodEnum.WEEK);

  const classes = useStyles();

  const minHeightPaper = clsx(classes.paper, classes.paperHeight);
  const fixedHeightChartPaper = clsx(classes.paper, classes.fixedChartHeight);
  const fixedDateChartPaper = clsx(classes.paper, classes.fixedDateHeight);

  const cookies = new Cookies();
  const username = cookies.get('appUsername');
  var jsonName = `./testUsers/${username}.json`;
  const [data, setData] = useState(null);

  const lastDay = new Date('May 22, 2021 00:00:00');
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
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
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
                <Typography
                  component="div"
                  color="primary"
                  style={{ fontSize: matches ? 40 : 20 }}
                >
                  {timePeriod === timePeriodEnum.WEEK
                    ? prevMondayString + ' - ' + nextSundayString
                    : todayDateString}
                </Typography>
              </Paper>
            </Grid>
            {/* Dial */}
            <Grid item xs={12} md={5} lg={5} zeroMinWidth={false}>
              <Paper className={minHeightPaper}>
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
            <Grid item xs={12} md={7} lg={7} zeroMinWidth={false}>
              <Paper className={minHeightPaper}>
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
