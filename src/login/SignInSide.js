import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackBar from '../snackbar';

import * as firebase from "firebase/app";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();

  const [emailObj, setEmail] = useState({ email: ''});
  const [passwordObj, setPassword] = useState({ password: ''});
  const [loading, setLoading] = useState(false);

  const [show, showSnackBar] = useState(false);
  const [variant, setVariant] = useState("error");
  const [message, setMessage] = useState("");


  function submitInfo() {
    setLoading(true);
    if (passwordObj.password.length < 6){
      setLoading(false);
      showSnackBar(true);
      setVariant('error');
      setMessage("Failed to sign in. Password is less than the minimum 6 required characters.");
      return;
    }
    firebase.auth().signInWithEmailAndPassword(emailObj.email, passwordObj.password)
    .then(function(user) {
      localStorage.setItem('userId', user.user.uid);
      localStorage.setItem('alreadySignedIn', 'true');
      setLoading(false);
      props.updateLogin();
    })
    .catch(function(error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code !== undefined && error.message !== undefined){
        setLoading(false);
        showSnackBar(true);
        setVariant('error');
        setMessage("Failed to sign in. " + error.code.charAt(0).toUpperCase() + error.code.slice(1) + ". " + error.message);
      }
    });

  }

  function renderSpinner(){
    if (loading)
      return(<CircularProgress style={{position: 'absolute', right: '30%'}} size={25}  color="secondary" />)
    else {
      return;
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => {
              const val = e.target.value;
              setEmail(prevState => {
                return { ...prevState, email: val }
              });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => {
              const val = e.target.value;
              setPassword(prevState => {
                return { ...prevState, password: val }
              });
            }}
            onKeyPress={ (e) => {
              if (e.key === 'Enter') {
                console.log('Enter key pressed');
                submitInfo();
                // write your functionality here
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => submitInfo()}
          >
            Sign In
            {renderSpinner()}
          </Button>
          <Grid container style={{justifyContent: 'space-between'}}>
            <Grid item>
                Forgot password?
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <SnackBar anchor={{vertical: 'top', horizontal: 'right'}} updateShow={showSnackBar} show={show} variant={variant} message={message} timeLength={3000}/>
        </div>
      </Grid>
    </Grid>
  );
}
