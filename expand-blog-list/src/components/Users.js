import React, {useState,useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"
import './Users.style.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Users = ({users}) =>{

    return(
        <div className='users-list'>
             
            <Table className='users-table' aria-label="simple table">
                <TableHead style={{backgroundColor:"#454444"}}>
                    <TableRow>
                        <TableCell style={{color:"white"}}><strong>Username</strong></TableCell>
                        <TableCell style={{color:"white"}}><strong>Blog(s) created</strong></TableCell>
                    </TableRow>
                </TableHead>
    
                <TableBody>
                {users.map(user=>( 
                    <TableRow className="user_row" key={user.id}>
                        <TableCell><Link to={`/users/${user.id}`}>{user.username}</Link></TableCell>
                        <TableCell>{user.blogs.length}</TableCell>
                    </TableRow>
                ))}  
                </TableBody>
                        
            </Table>
        </div>
    )
}

export default Users