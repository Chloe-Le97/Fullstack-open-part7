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
        <div>
            <h2>
                {user.username}
            </h2>
            <h3>Added blogs</h3>
             {
                 user.blogs.map(blog=>(
                     <li>{blog.title}</li>
                 ))
             }
        </div>
    )
}

export default User