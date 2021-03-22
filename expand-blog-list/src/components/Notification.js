import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const noti = useSelector(state => state.noti)
  const style = {
    position: 'fixed',
    bottom: 10,
    right: 10,
    zIndex: 5,
    minWidth: 100,
    maxWidth: 350, 
    borderWidth: 1,
    marginBottom: 15,
    color:'white',
    fontWeight:500,
    fontSize: 18,
  }
  console.log(noti)
  return (
    noti?(<div style={style}>
      {noti.status=='fail'?(<div style={{backgroundColor:'red',padding:15}}>{noti.message}</div>):(<div style={{backgroundColor:'green',padding:15}}>{noti.message}</div>)}
    </div>):(null)
   
  )
}

export default Notification