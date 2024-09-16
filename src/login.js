import React from 'react'
import './login.css'
import {auth , provider} from './firebase'
import Button from '@mui/material/Button';
const Login = () => {
    const signIn = () =>{
        auth.signInWithPopup(provider).catch((error) => {
            alert(error.message)
        })
    }
  return (
    <div className='login'>
        <div className='login__logo'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9B7Sn2gBvdaaEGIusUxTzd7k9-fF30EeZpYiec7BC_zArpnx0TX_rLuwW94px2C1ppLk&usqp=CAU' alt='logo'></img>
    </div>
     <Button onClick={signIn}>Sign In</Button> 
    </div>
  )
}

export default Login