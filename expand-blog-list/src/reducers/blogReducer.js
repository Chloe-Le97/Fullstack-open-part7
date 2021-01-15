import blogService from '../services/blogs'

import axios from 'axios'
const baseUrl = '/api/blogs'


const user = localStorage.getItem('loggedBlogappUser')
const userToken = user && JSON.parse(user).token

const token = `bearer ${userToken}`

const baseApi = axios.create({
  headers: {
    Authorization: token
  }
})

const blogReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch(action.type){
      case 'LIKE':{
        return state.map(n => n.id !== action.data.id ? n : action.data)
      }
      case 'DELETE':{
        return state.filter(n => n.id !== action.data.id)
      }
      case 'ADD':{
        return action.data
      }
      case 'COMMENT':{
        return state.map(n => n.id !== action.data.id ? n : action.data)
      }
      case 'INIT_BLOG':
        return action.data
      default:
    return state
    }
  }
  
  export const initializeBlog = () => {
    return async dispatch => {
      const items = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOG',
        data: items,
      })
    }
  }
  
  export const likeBlog = (id,blog) => {
    return async dispatch => {
      // const likedBlog = await blogService.updateBlog(id,blog)
      // const items = await blogService.getAll()
      const response = await axios.put(`${baseUrl}/${id}`, blog)
      const allItem = await axios.get(baseUrl)
      const updatedBlog = allItem.data.find(n => n.id == id)
      dispatch({
        type: 'LIKE',
        data: updatedBlog,
      })
    }
  }

    
  export const commentBlog = (id,blog) => {
    return async dispatch => {
      // const likedBlog = await blogService.updateBlog(id,blog)
      // const items = await blogService.getAll()
      const response = await axios.put(`${baseUrl}/${id}/comments`, blog)
      const allItem = await axios.get(baseUrl)
      const updatedBlog = allItem.data.find(n => n.id == id)
      dispatch({
        type: 'COMMENT',
        data: updatedBlog,
      })
    }
  }

  
  export const createBlog = (content) =>{
    return async dispatch =>{
      await blogService.create(content)  
      const item = await blogService.getAll()
      dispatch({
        type: 'ADD',
        data: item,
      })
    }
  }

  export const deleteBlog = (blog) =>{
      return async dispatch =>{
       const deletedBlog = await baseApi.delete(`${baseUrl}/${blog.id}`)
       const items = await blogService.getAll()
        dispatch({
          type: 'INIT_BLOG',
          data: items
        })
      }
  }
  
  export default blogReducer