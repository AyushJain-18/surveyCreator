import React from 'react';
import './newSurveys.styles.scss';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

import {startFetchingUserSurveyDataAsync} from '../../store/authReducers/auth.action';
import {
        selectUserSurveyData,
        selectUserSurveyDataError,
        selectIsFetchingUserSurveyData,
        selectIsUserLogedIn,
        selectLogedInUserData
    }from '../../store/authReducers/auth.selector';


const SurveyDashBoardCompoent = ({isUserLoggedIn, userSurveyData, startFetchingUserSurveyData,
                                 userSurveyDataError, isLoadingUserSurveyData,userData})=>{
    console.log('isUserLoggedIn', isUserLoggedIn);
    React.useEffect(()=>{
        if(isUserLoggedIn){
            startFetchingUserSurveyData(userData._id)
        }
    },[isUserLoggedIn,userData, startFetchingUserSurveyData ])
    if(!isUserLoggedIn){
        return <Redirect to='/'/>
    }
    return(
            <div style={{position: 'relative', backgroundlColor:' rgba(226, 226, 226, 0.8)'}}>
                   {!isLoadingUserSurveyData && !userSurveyDataError &&  
                <Link to='/surveys/create-new-surveys' className='add-new-survey-iocn'>
                    <AddCircleIcon   
                        style={{width: 100, height: 100}} 
                        color='secondary'/>
                </Link>}
             <div className='survey-container'>
              {isLoadingUserSurveyData  && <CircularProgress style={{width: '100px', height: '100px'}} color='secondary'/>}
              {userSurveyDataError      && <div className='survey-data-error'> Error while Fetching data, please chech your internet connection and try again  </div>}
              {!isLoadingUserSurveyData && !userSurveyDataError && <> 
                        {(!userSurveyData || userSurveyData.length === 0) && <div className='survey-no-data'> No Survey Found  </div>}
                        {userSurveyData && userSurveyData.map((survey,index) => {
                            return <div  key={index}className ='survey-response-container'>
                                       <div className='eachSurveyHeader'> Survey response</div>
                                        <div className='eachSurvey'> <span >Survey title</span>    <span className='eachSurveyResponse'>{survey.title}</span></div>
                                  
                                        <div className='eachSurvey'> <span>Total responses</span> <span className='eachSurveyResponse'>{survey.TotalYes + survey.TotalNo}</span></div>
                                        <div className='eachSurvey'> <span>Total yes</span>       <span className='eachSurveyResponse'>{survey.TotalYes}</span></div>
                                        <div className='eachSurvey'> <span>Total no</span>        <span className='eachSurveyResponse'>{survey.TotalNo}</span></div>

                                    </div>
                        })}  
                </>}
            </div>
            </div>
           
    )
}
const mapStateToProps =(state)=>({
    isUserLoggedIn          : selectIsUserLogedIn(state),
    userData                : selectLogedInUserData(state),
    userSurveyData          : selectUserSurveyData(state),
    userSurveyDataError     : selectUserSurveyDataError(state),
    isLoadingUserSurveyData : selectIsFetchingUserSurveyData(state)
});

const mapStateToDispatch = dispatch => ({
    startFetchingUserSurveyData: (user_id) => dispatch(startFetchingUserSurveyDataAsync(user_id))
})
export default  connect(mapStateToProps, mapStateToDispatch)(SurveyDashBoardCompoent)