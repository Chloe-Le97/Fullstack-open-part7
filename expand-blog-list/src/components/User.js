import React, {useState,useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch, Route, Link,useParams
  } from "react-router-dom"

const User = ({users}) =>{

    const id = useParams().id
    const user = users.find(n => n.id == id) 
   
    if (!user) {
        return null
      }

    return(
        <div style={{textAlign:'center'}}>
            <h2>User Profile</h2>
            <h1 style={{color:'#33408d'}}>
                {user.username}
            </h1>
            <h3>Added blogs</h3>
             {
                 user.blogs.map(blog=>(
                     <li style={{padding:5}}>{blog.title}</li>
                 ))
             }
        </div>
    )
}

export default User