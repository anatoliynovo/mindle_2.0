import React, { useState } from 'react';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import Input from './Input';
import Icon from './Icon';

import { signup, signin } from '../../actions/auth';

import {
  Container,
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessful. Try again later.');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Adress'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
                type='password'
              />
            )}
          </Grid>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
            fullWidth
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId='387065588353-n6voct37rq6eluf9v13ihe92ao1hjs9c.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color='primary'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
                fullWidth
              >
                Sign In with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
