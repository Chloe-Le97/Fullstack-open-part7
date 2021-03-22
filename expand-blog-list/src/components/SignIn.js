import React,{useState} from 'react';
import signUpService from '../services/signup';
import blogService from '../services/blogs'
import { connect } from 'react-redux';
import {notification} from '../reducers/notificationReducer'
import {logIn} from '../reducers/userReducer'
import {setUser} from '../reducers/userReducer'
import {TextField} from '@material-ui/core';
import { Button } from "@material-ui/core";
import './AuthForm.style.css';

const SignIn = (props) =>{

    
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')


    const handleLogin = async (event) => {
      console.log(props)
        event.preventDefault()  
        props.logIn(username,password)
        props.setOpenSignIn(false)
        
      }

    const setSignUpFunc = () => {
      props.setOpenSignUp(true);
      props.setOpenSignIn(false)
    }
    
    return(
        <div>
            <div className='blog_auth'>
                <div>
                    <form onSubmit={handleLogin}>
                      <h2>Login</h2>
                        <div>
                            <TextField
                            id='username'
                            type="text"
                            value={username}
                            label="Username"
                            variant="outlined"
                            style={{marginBottom:10}}
                            onChange={({ target }) => setUsername(target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                            id='password'
                            type="password"
                            value={password}
                            label="Password"
                            variant="outlined"
                            style={{marginBottom:10}}
                            onChange={({ target }) => setPassword(target.value)}
                            />
                        </div>
                        <Button style={{width: 210, margin:10}} variant="contained" color="primary" id="login-button" type="submit">Login</Button>
                        <div style={{color: "red"}} onClick={setSignUpFunc} className='blog-btn'> Not a member? <strong>Sign Up</strong></div>
                    </form> 
                </div>

            </div>
        
        
        </div>
        )
}

const mapDispatchToProps = {
    notification, setUser, logIn
  }

  export default connect(null,mapDispatchToProps)(SignIn)