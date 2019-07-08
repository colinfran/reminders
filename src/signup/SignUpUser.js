import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

export default function SignUpUser(props) {
  const [emailObj, setEmail] = useState({ email: ''});
  const [passwordObj, setPassword] = useState({ password: ''});
  const [firstNameObj, setFirstName] = useState({ firstName: ''});
  const [lastNameObj, setLastName] = useState({ lastName: ''});


  const [loading, setLoading] = useState(false);

  const [show, showSnackBar] = useState(false);
  const [variant, setVariant] = useState("error");
  const [message, setMessage] = useState("");

  const classes = useStyles();


  function submitInfo() {
    setLoading(true);
    if (passwordObj.password.length < 6){
      setLoading(false);
      showSnackBar(true);
      setVariant('error');
      setMessage("Failed to sign up. Password is less than the minimum 6 required characters.");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(emailObj.email, passwordObj.password)
      .then(data => {
        console.log("successful");
        console.log("User ID :- ", data.user.uid);
        localStorage.setItem('userId', data.user.uid);
        localStorage.setItem('alreadySignedIn', 'true');
        firebase.database().ref('users/' + data.user.uid).set({
          firstName: firstNameObj.firstName,
          lastName: lastNameObj.lastName,
          email: emailObj.email,
          reminders: {}
        });
        setLoading(false);
        props.updateSignUp();
       })
      .catch(error => {
         console.log(error.code);
         console.log(error.message);
         if (error.code !== undefined && error.message !== undefined){
           setLoading(false);
           showSnackBar(true);
           setVariant('error');
           setMessage("Failed to sign up. " + error.code.charAt(0).toUpperCase() + error.code.slice(1) + ". " + error.message);
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
          <Typography component="h1" variant="h5" style={{marginBottom: 15}}>
            Sign up
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => {
                  const val = e.target.value;
                  setFirstName(prevState => {
                    return { ...prevState, firstName: val }
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => {
                  const val = e.target.value;
                  setLastName(prevState => {
                    return { ...prevState, lastName: val }
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => {
                  const val = e.target.value;
                  setEmail(prevState => {
                    return { ...prevState, email: val }
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => submitInfo()}
          >
            Sign Up
            {renderSpinner()}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <SnackBar anchor={{vertical: 'top',horizontal: 'right'}} updateShow={showSnackBar} show={show} variant={variant} message={message} timeLength={3000}/>
    </Grid>
  );
}
