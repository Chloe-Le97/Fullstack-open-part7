import React,{useState} from 'react';
import './Blog.style.css';
import {
  BrowserRouter as Router,
  Switch, Route, Link,useParams,useHistory
} from "react-router-dom"
import {likeBlog} from '../reducers/blogReducer'
import {commentBlog} from '../reducers/blogReducer'
import {notification} from '../reducers/notificationReducer'
import {deleteBlog} from '../reducers/blogReducer'
import { connect } from 'react-redux';


const Blog = (props) => {
  const history = useHistory()

  const [comment,setComment] = useState('');


  const id = useParams().id;
  const blog = props.blogs.find(n => n.id == id);

  if(!blog){return null}

  const remove = async (blog) =>{
    if(window.confirm(`Do you want to delete blog post ${blog.title}?`)){
      props.deleteBlog(blog).then(history.push('/'))
    }
  }

  const onLike = (blog) => {
    
    const newLike = blog.likes + 1;

    const updateBlog = {
      likes: newLike,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments
    }

    props.likeBlog(blog.id,updateBlog)

    props.notification(`You have voted for '${blog.title}' `,5000)
}

  const commentAction = (event) =>{
    event.preventDefault()
    
    const comments = blog.comments
    const newComments = [...comments,comment]

    console.log(newComments)

    const updateBlog = {
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: newComments
    }

    props.commentBlog(blog.id,updateBlog)

    setComment('')

  }

  return(
  <div className='blog-details'>
    
      <div >
        <h2>{blog.title} - {blog.author} &nbsp; </h2>
      </div>
      <div className='blog-url'>
        <a href={blog.url} target="_blank" rel='noopener noreferrer'>{blog.url}</a> 
        <div>Likes: {blog.likes} <button type='button' onClick={()=>onLike(blog)} className='like'>like</button></div>
        <div> Added by <strong>{blog.user.username}</strong>  &nbsp;
        {props.user&&props.user.username==blog.user.username?(<button onClick={() => remove(blog)}>Remove</button>):(null)}
        </div>
      </div>
 
      <h3>Comments</h3>
      <div className='comment-section'>
      {blog.comments?(  <div>{blog.comments.map(cmt =>(
        <li className='comment'>
          {cmt}
        </li>
      ))}</div>):(null)}

      <form className='comment-input' onSubmit={commentAction}>
        <input
              id='comment'
              value={comment}
              onChange={({target})=>setComment(target.value)}
            />
        <button type="submit">Comment</button>
      </form>
      </div>

    </div>
  )
}

const mapStateToProps =(state)=>{
  const sortBlogs = state.blogs.sort(function(a,b){
    return b.likes - a.likes
  })
  return {blogs: sortBlogs,user:state.blogUser}
}

const mapDispatchToProps ={
  likeBlog,notification,deleteBlog,commentBlog
}

export default connect(mapStateToProps,mapDispatchToProps)(Blog)