const notiReducer = (state='',action) =>{

    switch(action.type){
        case 'SET_NOTI':
            return action.data
        case 'REMOVE_NOTI':
            return null
        default:
            return state
    }

}

export const notification = (message,status,time) =>{
    let timeOutId 
    return async dispatch=>{
        await dispatch({
            type:'SET_NOTI',
            data:{
                message:message,
                status:status
            }
        })
        
        if(timeOutId){
            clearTimeout(timeOutId)
        }
        timeOutId = setTimeout(()=>{
            dispatch({
                type:'REMOVE_NOTI'
            })
        },time)
    } 
}


export default notiReducer