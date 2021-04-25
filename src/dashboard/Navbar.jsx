import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import { AccountCircle, ExpandMore } from "@material-ui/icons";
import Cookies from "universal-cookie";
import { typeEnum, timePeriodEnum } from "./enums";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({
  type,
  timePeriod,
  setType,
  setTimePeriod,
  getVars,
  hasPoints,
  hasMeals,
}) => {
  const history = useHistory();
  const cookies = new Cookies();

  const classes = useStyles();
  const [timePeriodAnchorEl, setTimePeriodAnchorEl] = useState(null);
  const [typeAnchorEl, setTypeAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);

  // Type
  const handleTypeMenu = (event) => setTypeAnchorEl(event.currentTarget);

  const handleTypeMenuClose = () => setTypeAnchorEl(null);

  const isTypeOpen = Boolean(typeAnchorEl);

  // Time Period
  const handleTimePeriodMenu = (event) =>
    setTimePeriodAnchorEl(event.currentTarget);

  const handleTimePeriodMenuClose = () => setTimePeriodAnchorEl(null);

  const isTimePeriodOpen = Boolean(timePeriodAnchorEl);

  // User
  const handleUserMenu = (event) => setUserAnchorEl(event.currentTarget);

  const handleUserMenuClose = () => setUserAnchorEl(null);

  const isUserOpen = Boolean(userAnchorEl);

  const logOut = () => {
    cookies.remove("appUsername");
    history.push("/");
  };

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Dashboard
        </Typography>
        {/* Meals/Points */}
        <Button
          aria-label="account of current user"
          aria-controls="menu-appbar-type"
          aria-haspopup="true"
          onClick={handleTypeMenu}
          color="inherit"
          endIcon={<ExpandMore />}
        >
          {type}
        </Button>
        <Menu
          id="menu-appbar-type"
          anchorEl={typeAnchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={isTypeOpen}
          onClose={handleTypeMenuClose}
        >
          {hasMeals && (
            <MenuItem
              onClick={() => {
                setType(typeEnum.MEALS);
                getVars(typeEnum.MEALS, null, null);
                handleTypeMenuClose();
              }}
            >
              {typeEnum.MEALS}
            </MenuItem>
          )}
          {hasPoints && (
            <MenuItem
              onClick={() => {
                setType(typeEnum.POINTS);
                getVars(typeEnum.POINTS, null, null);
                handleTypeMenuClose();
              }}
            >
              {typeEnum.POINTS}
            </MenuItem>
          )}
        </Menu>
        {/* Time Period */}
        <Button
          aria-label="account of current user"
          aria-controls="menu-appbar-time-period"
          aria-haspopup="true"
          onClick={handleTimePeriodMenu}
          color="inherit"
          endIcon={<ExpandMore />}
        >
          {timePeriod}
        </Button>
        <Menu
          id="menu-appbar-time-period"
          anchorEl={timePeriodAnchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={isTimePeriodOpen}
          onClose={handleTimePeriodMenuClose}
        >
          <MenuItem
            onClick={() => {
              setTimePeriod(timePeriodEnum.DAY);
              getVars(null, null, timePeriodEnum.DAY);
              handleTimePeriodMenuClose();
            }}
          >
            {timePeriodEnum.DAY}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setTimePeriod(timePeriodEnum.WEEK);
              getVars(null, null, timePeriodEnum.WEEK);
              handleTimePeriodMenuClose();
            }}
          >
            {timePeriodEnum.WEEK}
          </MenuItem>
          {/* <MenuItem
            onClick={() => {
              setTimePeriod(timePeriodEnum.TWO_WEEKS);
              handleTimePeriodMenuClose();
            }}
          >
            {timePeriodEnum.TWO_WEEKS}
          </MenuItem> */}
        </Menu>
        {/* User Profile */}
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar-user"
          aria-haspopup="true"
          onClick={handleUserMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar-user"
          anchorEl={userAnchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={isUserOpen}
          onClose={handleUserMenuClose}
        >
          {/* <MenuItem>User1</MenuItem> */}
          <MenuItem onClick={logOut}>Log Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
