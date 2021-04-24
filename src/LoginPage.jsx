import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  Box,
  Card,
  CardContent,
  OutlinedInput,
  InputLabel,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory, Redirect } from 'react-router-dom';
import testData from './testUsersJson.json';

// Styles setup
const useStyles = makeStyles({
  container: {
    height: '100vh'
  },
  alertContainer: {
    width: '100%'
  },
  alert: {
    width: '100%'
  },
  card: {
    width: '100%',
    maxWidth: 480
  },
  cardContent: {
    padding: '2rem'
  },
  toggleLoginText: {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
});

const LoginPage = () => {
  console.log(testData);
  const history = useHistory();

  // Cookie
  const cookies = new Cookies();

  // Local States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [requestError, setRequestError] = useState(null);

  // input element reference
  const inputRef = useRef();

  const classes = useStyles();

  useEffect(
    // set password input cursor to the end on type change
    () => {
      inputRef.current?.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    },
    [showPassword]
  );

  const appUsername = cookies.get('appUsername');

  if (appUsername != null) {
    return <Redirect to="/dashboard" />;
  }

  const onSubmit = async e => {
    try {
      console.log('username: ', username);
      console.log('password: ', password);
      e.preventDefault();

      // form validation
      if (!username && !password) {
        setUsernameError(true);
        setPasswordError(true);
      } else if (!username) {
        setUsernameError(true);
      } else if (!password) {
        setPasswordError(true);
      } else {
        if (
          testData.some(
            ({ username: testUsername, password: testPassword }) =>
              testUsername === username && testPassword === password
          )
        ) {
          cookies.set('appUsername', username, { path: '/' });
          history.push('/dashboard');
        } else {
          setRequestError('User does not exist.');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      {requestError && (
        <Box className={classes.alertContainer} position="absolute" top={0}>
          <Alert severity="error">{requestError}</Alert>
        </Box>
      )}
      <Card className={classes.card} raised>
        <CardContent className={classes.cardContent}>
          <Typography variant="h4" align="center">
            Login
          </Typography>
          <form onSubmit={onSubmit}>
            <Box mt={3} mb={2}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  error={usernameError}
                  id="username-text-field"
                  label="Username"
                  type="text"
                  variant="outlined"
                  value={username}
                  onChange={e => {
                    if (usernameError) {
                      setUsernameError(false);
                    }
                    setUsername(e.target.value);
                  }}
                  helperText={usernameError && 'Username is required'}
                />
              </FormControl>
            </Box>
            <Box my={2}>
              <FormControl fullWidth variant="outlined" error={passwordError}>
                <InputLabel htmlFor="password-text-field">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="password-text-field"
                  label="Password"
                  inputRef={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    if (passwordError) {
                      setPasswordError(false);
                    }
                    setPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowPassword(prevShowPassword => !prevShowPassword)
                        }
                        onMouseDown={e => e.preventDefault()}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  {passwordError && 'Password is required'}
                </FormHelperText>
              </FormControl>
            </Box>
            <Box textAlign="center">
              <Button
                type="submit"
                size="large"
                color="primary"
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
