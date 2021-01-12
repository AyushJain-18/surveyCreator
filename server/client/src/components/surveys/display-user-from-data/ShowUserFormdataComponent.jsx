import React from 'react';
import './showUserFormData.styles.scss';
import {connect} from 'react-redux';

import {selectUserFormData} from '../../../store/authReducers/auth.selector';

const ShowUserData =({userFormData}) =>{
    const {title, subject, body, recipientList} = userFormData;
    return (
        <div className='formDataContainer'>
                <div className='userDataContainer'>
                    <div className='eachData'> <span style={{color: 'cornflowerblue'}}>Survey Title</span>    <span>{title}</span>            </div>
                    <div className='eachData'>< span style={{color: 'cornflowerblue'}}>Email Subject</span>   <span>{subject}</span>          </div>
                    <div className='eachData'> <span style={{color: 'cornflowerblue'}}>Email Body</span>      <span>{body}</span>             </div>
                    <div className='eachData'> <span style={{color: 'cornflowerblue'}}>Recipient List</span>  <span>{recipientList}</span>    </div>
                </div>
        </div>
    )
}
const mapStateToProps = state =>({
   userFormData:  selectUserFormData(state)
})
export default connect(mapStateToProps)(ShowUserData)
