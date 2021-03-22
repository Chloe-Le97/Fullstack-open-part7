import React,{useState} from 'react';
import signUpService from '../services/signup';
import blogService from '../services/blogs'
import { connect } from 'react-redux';
import {notification} from '../reducers/notificationReducer'
import {logIn} from '../reducers/userReducer';
import {setUser} from '../reducers/userReducer';
import {TextField} from '@material-ui/core';
import { Button } from "@material-ui/core";
import './AuthForm.style.css';

const SignUp = (props) =>{

    
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    
      const handleSignUp = async (event) => {
        event.preventDefault()
        
        if(repeatPassword != password){
          return alert('Repeat password is not the same with password, please type again')
        }
        else{
          try {
            const user = await signUpService.signUp({
              username, password,
            })
      
            window.localStorage.setItem(
              'loggedBlogappUser', JSON.stringify(user)
            ) 
            blogService.setToken(user.token)
            props.logIn(username,password)
            props.notification('Sign Up successfully',"success",5000)
            setUsername('')
            setPassword('')
            setRepeatPassword('')
            props.setOpenSignUp(false)
          } catch (exception) {
            props.notification('Wrong credentials',"fail",5000)
          }
        }
      }

    const openSignInFunc = () => {
      props.setOpenSignUp(false);
      props.setOpenSignIn(true)
    }

    return(
        <div>
          <div className='blog_auth'>
            <div>
              <form onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
                <div>
                    <TextField
                    id='username'
                    type="text"
                    value={username}
                    variant="outlined"
                    label="Username"
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
                <div>
                    <TextField
                    id='repeatPassword'
                    type="password"
                    value={repeatPassword}
                    variant="outlined"
                    label="Repeat Password"
                    style={{marginBottom:10}}
                    onChange={({ target }) => setRepeatPassword(target.value)}
                    />
                </div>
                <Button style={{width: 210, margin:10}} variant="contained" color="primary" id="login-button" type="submit">Sign Up</Button>
                <div style={{color: "red"}} onClick={openSignInFunc} className='blog-btn'> Already a member? <strong>Login</strong></div>
            </form> 
          </div>
        </div>
        
        
        </div>
        )
}

const mapDispatchToProps = {
    notification, setUser, logIn
  }

  export default connect(null,mapDispatchToProps)(SignUp)