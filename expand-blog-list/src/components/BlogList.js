import React,{useState} from 'react';
import './Blog.style.css';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import './Blog.style.css'

const BlogList = (props) => {

  return(
  <div className='blog-list'>
    {props.blogs.map(blog=>(
     <div className='blog'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
    ))}
  
  </div>
  )
}

const mapStateToProps =(state)=>{
  const sortBlogs = state.blogs.sort(function(a,b){
    return b.likes - a.likes
  })
  return {blogs: sortBlogs}
}


export default connect(mapStateToProps)(BlogList)
