
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { useDispatch } from 'react-redux';
import placeholder from '../avatar.webp'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '55ch',
    },
  },
}));

function SignUp(){
  const classes = useStyles();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [preview, setPreview] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async(event) => {
    event.preventDefault();
   
    const newUser = {

        id : Date.now(),
        fullName,
        username,
        email,
        password,
        avatar:''
    }

    console.log(newUser);

    await fetch('http://localhost:8000/v1/auth/register', {
            method: 'POST',
            body: newUser
        });

        
        setFullName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setAvatar('');

  };


  const handleImage = (event)=>{
    let reader = new FileReader();


    console.log(event);
    reader.onload = () => {
        if (reader.readyState === 2) {
            setAvatar(reader.result);
            setPreview(reader.result)
        }
    }
    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <form className={`${classes.root} container mt-4`} onSubmit={handleSubmit} id='form'>
      <TextField
        id="full-name"
        label="Full Name"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        className=' w-50'
      /> <br />

      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className='w-50 mt-3'
      /> <br />
      <TextField
        id="email"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className='mt-3 w-50'
      /> <br />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className='mt-3 w-50'
      /><br />
      <input type="file" className='mt-4' accept="image/*" onChange={(e)=>handleImage(e)} /><br />
      {
        preview ? 
        <img src={preview} alt="" style={{width:'100px', height:'100px', objectFit:"cover", borderRadius:'50%'}} />:
        <img src={placeholder} alt="" style={{width:'100px', height:'100px', objectFit:"cover", borderRadius:'50%'}} />
      }
      <br />
      <Button variant="contained" color="primary" type="submit" className='mt-3'>
        Sign Up
      </Button>
    </form>
  )
  }
  export default SignUp;
