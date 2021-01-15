import loginService from '../services/login';
import blogService from '../services/blogs';

const userReducer = (state='',action) =>{
    switch(action.type){
        case 'SET_USER':
            return action.data
        case 'REMOVE_USER':
            return null
        default:
            return state
    }


}


export const setUser = (user) =>{
        return ({
            type:'SET_USER',
            data: user
        })
    } 


export const logIn = (username,password) => {

    return async dispatch =>{
        try{
            const user = await loginService.login({
                username, password,
              })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
              ) 
            blogService.setToken(user.token)
            dispatch({
                type:'SET_USER',
                data: user
            })
            dispatch({
                type:'SET_NOTI',
                data: 'Sign in successfully'
            })
            setTimeout(()=>{
                dispatch({
                    type:'REMOVE_NOTI'
                })
            },5000)
        }catch(error){
            dispatch({
                type:'SET_NOTI',
                data: 'Wrong credential'
            })
            setTimeout(()=>{
                dispatch({
                    type:'REMOVE_NOTI'
                })
            },5000)
        }

    }

}

export const removeUser = () =>{
   return ({
        type:'REMOVE_USER'
    })
}

export default userReducer