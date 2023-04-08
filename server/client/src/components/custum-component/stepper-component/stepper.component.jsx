
import React from 'react';
import './stepper.styles.scss';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import { CountdownCircleTimer } from 'react-countdown-circle-timer'



import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {clearSurveyFormDataFromReducer, startGeneratingSurveyAsync, resetSurveyStatus} from '../../../store/authReducers/auth.action';
import {selectUserFormData, selectLogedInUserData, 
  selectErrorGeneratingSurvey, selectSurveyGeneratorSuccess,
  selectIsLoadingSurvey as selectIsGeneratingSurvey} from '../../../store/authReducers/auth.selector'




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '89vh',
    backgroundColor:'whitesmoke'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  generationSurveyContainer:{
    display: 'flex',
    padding: '50px 0px',
    height  : '30vh', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  generatingMsg: {
    fontSize: '2rem',
    color: 'cornflowerblue',
    fontWeight: 'bold'
  },
  timmer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around', 
    alignItems: 'center',
    fontSize: '1rem',
    color: 'red',
    fontWeight: 'bold',
    height: '60vh'

  }
}));

const Alert = (props)=> {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const  StepperComponent =({components, headerTitle, history, userFormData, resetSurveyStatus,
  isErrorGeneratingSurvey, isSuccessGeneratinSurvey,
  clearFormData, startGenerateForm,userData, isGeneratingSurvey}) => {
  const classes = useStyles();

  const [openSnackBar, setOpenSnackBar]           = React.useState(false);
  const [SnackbarServity, setSnackbarServity]     = React.useState('');
  const [SnackbarMessage, setSnackBarMessage]     = React.useState('');
  const [activeStep, setActiveStep]               = React.useState(0);

  const steps = headerTitle;

  const handleNext = () => {
    if(activeStep === steps.length - 1){
      startGenerateForm({surveyData: userFormData, user_profile_id: userData.profile_id});
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const resetStepper =()=>{
    setActiveStep(0);
    setOpenSnackBar(false);
    resetSurveyStatus();
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };
  React.useEffect(()=>{
    if(userFormData){
      setOpenSnackBar(true);
      setSnackbarServity('success')
      setSnackBarMessage('Form value successfully store, click next to proceed');
    }
    if(isErrorGeneratingSurvey){
      setOpenSnackBar(true);
      setSnackbarServity('error')
      setSnackBarMessage('Error generating survey');
    }
    if(isSuccessGeneratinSurvey){
      setOpenSnackBar(true);
      setSnackbarServity('success')
      setSnackBarMessage('Success generating Survey');
    }
  },[userFormData, isErrorGeneratingSurvey, isSuccessGeneratinSurvey]);

  return (
    <div className={classes.root}>
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}
        anchorOrigin={{vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackBar} severity={SnackbarServity}>
          {SnackbarMessage}
        </Alert>
      </Snackbar>
      <Stepper style={{backgroundColor: 'whitesmoke'}} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <>
            { !isSuccessGeneratinSurvey && <div  className={classes.generationSurveyContainer} >
              <Typography  className={classes.generatingMsg}>
                {!isSuccessGeneratinSurvey && !isErrorGeneratingSurvey && <> Generating Survey please wait</> }
                {isErrorGeneratingSurvey   && <div aria-hidden className='final-button' onClick={resetStepper}> Error Occured Try Again</div> }
              </Typography>
              {isGeneratingSurvey && <CircularProgress color="secondary"/>}
            </div>
            }
            { isSuccessGeneratinSurvey  && 
                        <div className ={classes.timmer}>   
                          <div style={{fontSize: '3rem', color: 'blue'}} > Survey generated successfully!!</div>
                          <div> redirecting back to Survey dashboard page</div>
                          <CountdownCircleTimer isPlaying duration={10}
                            colors={[
                              ['#004777', 0.33],
                              ['#F7B801', 0.33],
                              ['#A30000', 0.33],
                            ]}
                            onComplete ={()=> {resetStepper(); history.push('/surveys')}}
                          >
                            {({ remainingTime }) => `${remainingTime}`}
                          </CountdownCircleTimer>
                        </div>
            }
          </>
              
        ) : (
          <div>
            <Typography className={classes.instructions}>
              { components[activeStep]}
            </Typography>
            <div className='form-button-container'>
              <button  className='stepper-button' onClick={ 
                (activeStep === 0)? 
                  ()=>{clearFormData();history.push('/surveys')} 
                  :handleBack }
              >Back
              </button>
              <button  className='stepper-button'  style={!userFormData?{cursor: 'not-allowed'}:{}}
                onClick={handleNext} disabled={!userFormData} title={!userFormData ? 'please submit form first': 'click next to proceed'}>
                {/* */}
                {activeStep === steps.length - 1 ? 'Generate Survey' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = state =>({
  userFormData                : selectUserFormData(state),
  userData                    : selectLogedInUserData(state),
  isGeneratingSurvey          : selectIsGeneratingSurvey(state),
  isErrorGeneratingSurvey     : selectErrorGeneratingSurvey(state),
  isSuccessGeneratinSurvey    : selectSurveyGeneratorSuccess(state)
})
const mapDispatchToProps = dispatch =>({
  clearFormData     : ()=> dispatch(clearSurveyFormDataFromReducer()),
  resetSurveyStatus : ()=> dispatch(resetSurveyStatus()),
  startGenerateForm : (surveyData)=> dispatch(startGeneratingSurveyAsync(surveyData))

});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(StepperComponent)

