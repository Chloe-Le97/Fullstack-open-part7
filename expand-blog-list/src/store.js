import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notiReducer from './reducers/notificationReducer.js'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer.js'

const reducer = combineReducers({
    noti: notiReducer,
    blogs: blogReducer,
    blogUser: userReducer
  })

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store