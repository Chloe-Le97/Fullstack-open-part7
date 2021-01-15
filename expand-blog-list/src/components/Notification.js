import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const noti = useSelector(state => state.noti)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 15,
    color:'red'
  }
  return (
    noti?(<div style={style}>
      {noti}
    </div>):(null)
   
  )
}

export default Notification