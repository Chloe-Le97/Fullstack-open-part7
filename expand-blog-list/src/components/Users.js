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
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Username</strong></TableCell>
                        <TableCell><strong>Blog(s) created</strong></TableCell>
                    </TableRow>
                </TableHead>
                {users.map(user=>( 
                <TableBody>
                    <TableRow key={user.id}>
                        <TableCell><Link to={`/users/${user.id}`}>{user.username}</Link></TableCell>
                        <TableCell>{user.blogs.length}</TableCell>
                    </TableRow>
                </TableBody>
                ))}          
            </Table>
        </div>
    )
}

export default Users