
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '55ch',
    },
  },
}));

function Login(){
  const classes = useStyles();

  const [login, {isLoading}] = useLoginMutation()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async(event) => {
    event.preventDefault();


    try {
      const user = await login({username, password}).unwrap()
      console.log(user);
      dispatch(loginUser(user))
    } catch (error) {
      console.log(error);
    }
   
   
    setUsername('');
    setPassword('');
  };

  return (
    <form className={`${classes.root} container mt-4`} onSubmit={handleSubmit} id='form'>
      
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className='w-50 mt-3'
      /> <br />
    
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className='mt-3 w-50'
      /><br />
      <Button variant="contained" color="primary" type="submit" className='mt-3'>
        Login
      </Button>
    </form>
  )
  }
  export default Login;
