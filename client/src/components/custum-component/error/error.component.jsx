import React from 'react';
import './error.styles.scss'
const ErrorCompoennt = ({message,height}) =>{
  return (
    <div className='error' style={height? {height: height, backgroundColor: 'rgba(226, 226, 226, 0.8)'}: {}} >
      <span style={{fontSize: '3rem'}}> OOPS !!</span>   
      <span> {message} </span>  
    </div>
  )
}
export default  ErrorCompoennt;

// You dont have enough credit to generate new survey