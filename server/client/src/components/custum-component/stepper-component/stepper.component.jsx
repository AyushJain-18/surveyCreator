
import React from 'react';
import './stepper.styles.scss';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';



import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {clearSurveyFormDataFromReducer} from '../../../store/authReducers/auth.action';
import {selectUserFormData} from '../../../store/authReducers/auth.selector'




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
}));

const Alert = (props)=> {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const  StepperComponent =({components, headerTitle, history, userFormData, clearFormData}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(()=>{
    if(userFormData){
      setOpen(true);
    }
  },[userFormData])

  const steps = headerTitle;

  const handleNext = () => {
    if(activeStep === steps.length - 1){
      clearFormData();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity="success">
              Form value successfully store, click next to proceed
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
          <div>
            <Typography className={classes.instructions}>
                Generating Survey please wait !!
              </Typography>
              <CircularProgress   color="secondary"/>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{ components[activeStep]}</Typography>
            <div className='form-button-container'>
              <button  className='stepper-button' onClick={ 
                      (activeStep === 0)? 
                            ()=>{clearFormData();history.push('/surveys')} 
                              :handleBack }
                >Back
              </button>
              <button  className='stepper-button'  style={!userFormData?{cursor: 'not-allowed'}:{}}
              onClick={handleNext} disabled={!userFormData}>
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
    userFormData : selectUserFormData(state)
})
const mapDispatchToProps = dispatch =>({
  clearFormData: (()=> dispatch(clearSurveyFormDataFromReducer()))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
  )(StepperComponent)

