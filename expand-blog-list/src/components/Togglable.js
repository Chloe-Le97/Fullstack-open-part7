import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from "@material-ui/core";
import './Togglable.style.css';

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
  
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
      })
    
      Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
      }

    return (
      <div style={{marginTop: 30}} className="togglable_container">
        <div style={hideWhenVisible}>
          <Button style={{backgroundColor: "white",fontSize:18, fontWeight:700, borderWidth:3}} variant="outlined" color="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
        </div>
        <div className="togglable_div" style={showWhenVisible}>
          {props.children}
          <Button style={{marginTop: 15, width: 100}} variant="contained" color="primary" onClick={toggleVisibility}>Cancel</Button>
        </div>
      </div>
    )
})
  
    Togglable.displayName = 'Togglable'
    export default Togglable