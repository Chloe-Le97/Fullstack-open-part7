import React,{useState} from 'react';
import './Blog.style.css';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import {likeBlog} from '../reducers/blogReducer'
import {commentBlog} from '../reducers/blogReducer'
import {notification} from '../reducers/notificationReducer'
import {deleteBlog} from '../reducers/blogReducer'
import Blog from './Blog';

const BlogList = (props) => {

  return(
  <div className='blog-list'>
    {props.blogs.map(blog=>(
     <div className='blog'>
       <Blog blog={blog} likeBlog={props.likeBlog} user={props.user} notification={props.notification} deleteBlog={props.deleteBlog} commentBlog={props.commentBlog}/>
      </div>
    ))}
  
  </div>
  )
}

const mapStateToProps =(state)=>{

  return {user:state.blogUser}
}

const mapDispatchToProps ={
  likeBlog,notification,deleteBlog,commentBlog
}


export default connect(mapStateToProps,mapDispatchToProps)(BlogList)
