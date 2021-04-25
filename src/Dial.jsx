// import { rgbToHex } from "@material-ui/core";
// import { SportsRugbySharp } from "@material-ui/icons";
import React, { useState, useEffect, useRef } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    fontSize: 20
  }
});

const Dial = ({ goal, past, timeUnit, moneyUnit, spendingRatio }) => {
  const classes = useStyles();
  const dialWrapperRef = useRef(null);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    setRerender(prevRerender => !prevRerender);
  }, [dialWrapperRef]);

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
      return '#e9f922';
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

  if (spendingRatio) {
    return (
      <Grid container justify="center" alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <Typography
            className={classes.header}
            color="primary"
            component="div"
          >
            Past Trends
          </Typography>
        </Grid>
        <Grid item>
          <ReactSpeedometer
            startColor={'#34c9eb'}
            endColor={'#FF471A'}
            width={300}
            height={200}
            maxSegmentLabels={0}
            segments={51}
            value={Math.min(2, spendingRatio)}
            currentValueText={spending()}
            valueTextFontSize={'30px'}
            maxValue={2}
            ringWidth={60}
            textColor={getColor()}
            paddingHorizontal={20}
            paddingVertical={20}
            forceRender={true}
          />
        </Grid>
        <Grid item>
          <div
            style={{
              width: 250,
              margin: 'auto',
              padding: 10,
              backgroundColor: '#555'
            }}
          >
            Based on the past month's data, you have a{' '}
            <span style={{ color: getColor() }} className="predicted">
              predicted
            </span>{' '}
            spending rate of
            <span style={{ color: getColor() }} className="predicted">
              {' ' +
                past +
                ' ' +
                moneyUnit.toLowerCase() +
                ' per ' +
                timeUnit.toLowerCase()}
            </span>
          </div>
        </Grid>
      </Grid>
    );
  } else {
    return <div></div>;
  }
};

export default Dial;
