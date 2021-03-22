import React,{useState} from 'react';
import './Blog.style.css';
import {
  BrowserRouter as Router,
  Switch, Route, Link,useParams,useHistory
} from "react-router-dom";
import { Button } from "@material-ui/core";
import background from '../assets/back.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

import { connect } from 'react-redux';


const Blog = (props) => {
  const history = useHistory()

  const [comment,setComment] = useState('');
  const [seeMore,setSeeMore] = useState(false)

  const hideWhenVisible = { display: seeMore ? 'none' : '' }
  const showWhenVisible = { display: seeMore ? '' : 'none' }


  const blog = props.blog;

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

    props.notification(`You have voted for '${blog.title}'`,'success',5000)
}

  const commentAction = (event) =>{
    event.preventDefault()
    
    if(comment==''){
     return alert('Please type the comment')
    }

    const comments = blog.comments
    const newComments = [comment,...comments]

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

  const toBlog = (url) => {
    if(window.confirm(`You are directing to page ${url}. Continue?`)){
      window.open(url, "_blank")
    }
  }

  return(
  <div className='blog-details-container'>

    <div onClick={()=>toBlog(blog.url)} className="blog_link">
      <div className="blog_title">
        {blog.title} - {blog.author}
      </div>
      <img src={background} className="blog_title_background"></img>    
    </div>

    <div className='blog-details'>
      <div> <strong> Added by </strong> {blog.user.username}  &nbsp;
        {props.user&&props.user.username==blog.user.username?(<FontAwesomeIcon icon={faTrashAlt} onClick={() => remove(blog)} color="red" className="remove"/>):(null)}
        </div>
        <div> <strong>Likes: </strong> {blog.likes} <FontAwesomeIcon icon={faThumbsUp}  onClick={()=>onLike(blog)} className='like' color="green"/></div>
    </div>  
    
    <div style={hideWhenVisible}>
      <div style={{margin:'auto',width:'fit-content',paddingBottom:15}}>
        <Button variant="outlined" color="primary" className='hidden_show_btn' onClick={()=>setSeeMore(true)}>See More</Button>
      </div> 
      
    </div>
      <div style={showWhenVisible}>
        <Button style={{marginLeft:15, marginBottom: 15, height:25}} variant="outlined" color="primary" onClick={()=>setSeeMore(false)}>See Less</Button>
        <div className='comment-section'>
          {blog.comments.length>0?(<div >
          <div><strong>Comments</strong></div>
          <div className='comment_container'>
          {blog.comments.map(cmt =>(
          <li className='comment'>
            {cmt}
            </li>
          ))}</div></div>):(null)}
        </div>

        <form className='comment-input' onSubmit={commentAction}>
          <input
                className='comment_input_field'
                placeholder="Add a comment"
                value={comment}
                onChange={({target})=>setComment(target.value)}
          />
          <button className="submit_comment" type="submit">Comment</button>
        </form>
      </div>

      
    
    </div>
  )
}

// const mapStateToProps =(state)=>{
//   const sortBlogs = state.blogs.sort(function(a,b){
//     return b.likes - a.likes
//   })
//   return {blogs: sortBlogs,user:state.blogUser}
// }



export default Blog