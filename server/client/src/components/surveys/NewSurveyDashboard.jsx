import React from 'react';
import './newSurveys.styles.scss';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom'
import {selectIsUserLogedIn} from '../../store/authReducers/auth.selector';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const SurveyDashBoardCompoent = ({isUserLoggedIn})=>{
    console.log('isUserLoggedIn', isUserLoggedIn);
    if(!isUserLoggedIn){
        return <Redirect to='/'/>
    }
    return(
             <div className='survey-container'>
                  <div className='survey-display-container'> Surveys</div>  
                    <Link to='/surveys/create-new-surveys' className='add-new-survey-iocn'>
                    <AddCircleIcon   
                        style={{width: 100, height: 100}} 
                        color='secondary'/>
                    </Link>
            </div>
           
    )
}
const mapStateToProps =(state)=>({
    isUserLoggedIn : selectIsUserLogedIn(state)
})
export default  connect(mapStateToProps)(SurveyDashBoardCompoent)