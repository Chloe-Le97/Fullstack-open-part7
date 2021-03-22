import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {createBlog} from '../reducers/blogReducer'
import { connect } from 'react-redux' 
import {notification} from '../reducers/notificationReducer'
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import './BlogForm.style.css';

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [formError, setFormError] = useState(false)
    const [formErrorMessage, setFormErrorMessage] = useState('')

    const addBlog = (event) =>{
        event.preventDefault()
        if(title&&author){
          props.createBlog({title:title,author:author,url:url})
          props.notification('New blog added','success',5000)
          setTitle('');
          setUrl('');
          setAuthor('');
        }else{
            setFormError(true);
            setFormErrorMessage('Please type title and author of the blog');
            setTimeout(()=>{
              setFormError(false);
              setFormErrorMessage('')
            },5000)
        }
      }

      
    return (
      <div className="formDiv">
        <h2>Add new blog</h2>
        <form onSubmit={addBlog}>
        <div className='blog_form_input'>
          <TextField
            className='blog_form_textfield'
            label="Title"
            value={title}
            onChange={({target})=>setTitle(target.value)} 
            inputProps={{maxLength : 70}}
          />
        </div>
        <div className='blog_form_input'>
          <TextField
            className='blog_form_textfield'
            label="Author"
            value={author}
            onChange={({target})=>setAuthor(target.value)}
            inputProps={{maxLength : 20}}
          />
        </div>
        <div className='blog_form_input'>
          <TextField
            className='blog_form_textfield'
            label="Url"
            placeholder="https:// URL"
            value={url}
            onChange={({target})=>setUrl(target.value)}
            inputProps={{pattern:"https://.*"}}
          />
        </div>
        {formError?(<div style={{color:'red', marginBottom: 10}}>{formErrorMessage}</div>):(null)}
        <Button style={{width: 100}} variant="contained" color="primary" type="submit">Save</Button>
      </form>
        </div>
    )
 }

 const mapDispatchToProps = {
  createBlog,notification
}


export default connect(null,mapDispatchToProps)(BlogForm);