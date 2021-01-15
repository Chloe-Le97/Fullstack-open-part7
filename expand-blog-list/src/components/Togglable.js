import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from "@material-ui/core";

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
      <div>
        <div style={hideWhenVisible}>
          <Button style={{backgroundColor: "white"}} variant="outlined" color="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
})
  
    Togglable.displayName = 'Togglable'
    export default Togglable