import React, { useState, useEffect,useRef } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import {notification} from './reducers/notificationReducer'
import blogService from './services/blogs'
import {setUser} from './reducers/userReducer'
import {removeUser} from './reducers/userReducer'
import {initializeBlog} from './reducers/blogReducer'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import './App.css'
import Users from './components/Users';
import getUsersService from './services/users';
import User from './components/User';
import Blog from './components/Blog'
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = (props) => {
  const link = {
    padding: 5,
    textDecoration:'none',
    color: 'white',
  }

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const classes = useStyles();

  const [users,setUsers] = useState([])
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
      // Create an scoped async function in the hook
      async function getAllUsers() {
       getUsersService.getUsers().then(users=>{setUsers(users)})
      }
      // Execute the created function directly
      getAllUsers();
  },[])

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () =>{
    props.removeUser();
    window.localStorage.setItem(
      'loggedBlogappUser', ''
    ) 
  }



  
  return (
    <div className="App">
          <Modal className="modal" open={openSignUp} onClose={() => setOpenSignUp(false)}>
            <div style={modalStyle} className={classes.paper}>
              <SignUp setOpenSignUp={setOpenSignUp}/>
            </div>
          </Modal>

          <Modal className="modal" open={openSignIn} onClose={() => setOpenSignIn(false)}>
            <div style={modalStyle} className={classes.paper}>
              <SignIn setOpenSignIn={setOpenSignIn}/>
            </div>
          </Modal>
      <Router>
          <div className='header'>
            <div className='app_btn'>
              <Button className='app_btn_header' variant="contained" color="primary"><Link style={link} to="/">Blogs</Link></Button>
              <Button className='app_btn_header' variant="contained" color="primary"><Link style={link} to="/users">Users</Link></Button>
            </div>
           
            <div>
            {props.user === null || props.user =='' ?
          (
            <div className='app_btn_auth'>
            <Button
            className="app_login_btn"
            variant="contained"
            color="primary"
            onClick={() => setOpenSignUp(true)}
          >
            Sign Up
          </Button>

          <Button
          className="app_login_btn"
          variant="contained"
          color="primary"
          onClick={() => setOpenSignIn(true)}
          >
          Sign In
          </Button>
          </div>
          ) 
          :(
          <div>
            <div className='app_user'>
              <h4>{props.user.username} logged-in &nbsp;&nbsp;</h4>
              <Button variant="contained" color="secondary" type='button' onClick={logout} className='logout_button'>Log out</Button>
            </div>


            
          </div>)
          }
          </div>
        </div>
      <Switch>
        <div>
          <h1 className='title_app'>Have you seen these Blogs?</h1>

          <Notification/>
          
          {props.user?            
          (<Route exact path="/">
              <Togglable className='addNewBlog' buttonLabel='Add new blog' ref={blogFormRef}>
                <BlogForm></BlogForm>
              </Togglable>
            </Route>):null}
          <Route exact path="/">
            <BlogList/>
          </Route>

          <Route exact path="/users">
            <Users users={users}/>
          </Route>

          <Route path="/users/:id">
            <User users={users} />
          </Route>

          <Route path='/blogs/:id'>
            <Blog />
          </Route>
          </div>
      </Switch>

    </Router>
    </div>
  )
}

const mapStateToProps =(state)=>{
  return {user:state.blogUser}
}

const mapDispatchToProps = {
  notification, removeUser,setUser
}

const ConnectApp = connect(mapStateToProps,mapDispatchToProps)(App)
export default ConnectApp