import React,{useState} from 'react';
import signUpService from '../services/signup';
import blogService from '../services/blogs'
import { connect } from 'react-redux';
import {notification} from '../reducers/notificationReducer'
import {logIn} from '../reducers/userReducer'
import {setUser} from '../reducers/userReducer'

const SignUp = (props) =>{

    
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [signUpVisible, setSignUpVisible] = useState(false)

    const signIn = { display: signUpVisible ? '' : 'none' }
    const signUp = { display: signUpVisible ? 'none' : '' }

    const handleLogin = async (event) => {
      console.log(props)
        event.preventDefault()  
        try {
          props.logIn(username,password)
          // props.notification(`Sign In successfully`,5000)
          setUsername('')
          setPassword('')
          setRepeatPassword('')
          props.setOpenSignUp(false)
        } catch (error) {
          // props.notification('Wrong credentials',5000)
        }
      }
    
      const handleSignUp = async (event) => {
        event.preventDefault()
        
        if(repeatPassword != password){
            alert('Repeat password is not the same with password, please type again')
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
            props.notification(`Sign Up successfully`,5000)
            setUsername('')
            setPassword('')
            setRepeatPassword('')
            props.setOpenSignUp(false)
          } catch (exception) {
            props.notification('Wrong credentials',5000)
          }
        }
      }

    return(
        <div>
            <div className='blog_auth'>
                <div style={signIn}>
                    <form onSubmit={handleLogin}>
                      <h2>Login</h2>
                        <div>
                            Username &nbsp;
                            <input
                            id='username'
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                            />
                        </div>
                        <div>
                            Password &nbsp;
                            <input
                            id='password'
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                            />
                        </div>
                        <button id="login-button" type="submit">Login</button>
                        <div style={{color: "red"}} onClick={() => setSignUpVisible(!signUpVisible)} className='blog-btn'> Not a member? <strong>Sign Up</strong></div>
                    </form> 
                </div>
          <div style={signUp}>
           <form onSubmit={handleSignUp}>
             <h2>Sign Up</h2>
            <div>
                Username &nbsp;
                <input
                id='username'
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                Password &nbsp;
                <input
                id='password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <div>
                Repeat password &nbsp;
                <input
                id='password'
                type="password"
                value={repeatPassword}
                name="Password"
                onChange={({ target }) => setRepeatPassword(target.value)}
                />
            </div>
            <button id="login-button" type="submit">Sign Up</button>
            <div style={{color: "red"}} onClick={() => setSignUpVisible(!signUpVisible)} className='blog-btn'> Already a member? <strong>Login</strong></div>
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