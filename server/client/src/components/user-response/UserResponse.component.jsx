import React from 'react';
import queryString from 'query-string';

import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

import {startAddingSurveyResponseAsync} from '../../store/authReducers/auth.action';
import RefreshIcon from '@material-ui/icons/Refresh';

import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import {
  selectIsLoadingForAddingSurveyResponse,
  selectIsAddingSurveyResponseError,
  selectIsAddingSurveyResponseSuccess,
  selectSurveyResponseMessage
} from '../../store/authReducers/auth.selector';

const useStyles = makeStyles(()=>(
  {
    container:{
      display         : 'flex',
      height          : '50vh',
      flexDirection   : 'column',
      justifyContent  : 'space-around',
      alignItems      : 'center',
      paddingTop      : '10vh',
      paddingBottom   : '29vh',
      backgroundColor: 'whitesmoke'
    },
    header:{
      fontSize: '2rem',
      color:'darkorchid'
    },
    subHeader: {
      fontSize: '1.75rem',
      color:'orange'
    },
    redirectMsg:{
      fontSize: '1.25rem',
      color:'darkorchid'
    },
    refreshIcon: {
      width: 70,
      height: 70,
      cursor:'pointer'
    }
  }
))

const UserResponse = ({location,history, isLoading, isError, isSuccess, addSurveyResponse, surveyResponse}) => {

  const classes = useStyles();


  React.useState(()=>{
    let {surveyGeneratorId, reciverMailId,response} =queryString.parse(location.search); 
    addSurveyResponse({surveyGeneratorId, reciverMailId,response})
  },[]);


  
  return (
    <div className={classes.container} style={{fontFamily: 'Yusei Magic'}}>
      <div className={classes.header}> Thanks for your response </div>
      { isLoading  &&   <CircularProgress color="secondary"/>}
      <div className={classes.subHeader}> 
        { isLoading && <>Please wait while we submit your response</>}
        { isError   && <>Error while submmiting your response please try again</>}
        { isSuccess && <>{surveyResponse}</>}
      </div>
      { !isLoading && isError && <RefreshIcon title ='try again'  className={classes.refreshIcon}
        onClick={()=>history.go(0)} 
      />}
      { isSuccess  &&  <> <span className={classes.redirectMsg}> Redirecting to home page </span>
        <CountdownCircleTimer isPlaying duration={10}
          colors={[['#004777', 0.33],['#F7B801', 0.33],['#A30000', 0.33]]}
          onComplete ={()=> {history.push('/')}}>
          {({ remainingTime }) => `${remainingTime}`}
        </CountdownCircleTimer>
      </>}
    </div>
  )
};
const mapStateToProps = state =>({
  isLoading :  selectIsLoadingForAddingSurveyResponse(state),
  isError   :  selectIsAddingSurveyResponseError(state),
  isSuccess :  selectIsAddingSurveyResponseSuccess(state),
  surveyResponse :selectSurveyResponseMessage(state)
});
const mapDispatchToProps = dispatch =>({
  addSurveyResponse: (data)=> dispatch(startAddingSurveyResponseAsync(data))
})
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(UserResponse);