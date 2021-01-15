import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {createBlog} from '../reducers/blogReducer'
import { connect } from 'react-redux' 
import {notification} from '../reducers/notificationReducer'

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) =>{
        console.log('hello')
        event.preventDefault()
        if(title&&author){
          props.createBlog({title:title,author:author,url:url})
          props.notification('New blog added',5000)
          setTitle('');
          setUrl('');
          setAuthor('');
        }else{
            alert('Please type title and author of the blog')
        }
      }

    // BlogForm.propTypes={
    //     addBlog: PropTypes.func.isRequired,
    //     createBlog: PropTypes.func.isRequired,
    // }
      
    return (
      <div className="formDiv">
        <h2>Save new blog</h2>
        <form onSubmit={addBlog}>
        <div>Title 
          <input
            id='title'
            value={title}
            onChange={({target})=>setTitle(target.value)}
          />
        </div>
        <div>Author 
          <input
             id='author'
            value={author}
            onChange={({target})=>setAuthor(target.value)}
          />
        </div>
        <div>Url 
          <input
            value={url}
            onChange={({target})=>setUrl(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
        </div>
    )
 }

 const mapDispatchToProps = {
  createBlog,notification
}


export default connect(null,mapDispatchToProps)(BlogForm);