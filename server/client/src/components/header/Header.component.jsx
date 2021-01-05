import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'

// react material
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';

// custum componnsts 
import UserPersona from '../user-persona/userPersona.component'
// action creatot
import {startFetchingUserLoginDetailsAsync} from '../../store/authReducers/auth.action';
//  selectors
import {
    selectIsFetchingUserAuth, 
    selectIsUserLogedIn,
    selectIsUserAuthError,
    selectLogedInUserData
} from '../../store/authReducers/auth.selector'
import { red } from '@material-ui/core/colors';



// using react material UI with class based components
const useStyles = theme => ({
    root: {
         flexGrow: 1,
    },
    menuButton: {
            marginRight: theme.spacing(2),
    },
    title: {
            flexGrow: 1,
    },
    Error: {
        flexGrow: 1,
        backgroundColor: red
},
    circularSpinner: {
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
});
class HeaderCompoennt extends React.Component {
    componentDidMount(){
        this.props.startFetchingLoginDetails();
    }

    render(){
        const {classes, isLoading, isUserLoggedIn, isError, userData} =  this.props;//this.useStyles();
      
        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Survey Generator
                </Typography>
                { isLoading && <CircularProgress  className ={classes.circularSpinner} color="secondary"/>}
                { !isLoading && isError && <Typography variant="h6" className={classes.Error}> Error Ocuured while Fetching Details</Typography>} 
                { !isLoading && !isError && !isUserLoggedIn && <Button color="inherit">Login with google</Button>}
                { !isLoading && !isError && isUserLoggedIn && <UserPersona userData = {userData}/> }
              </Toolbar>
            </AppBar>
          </div>
        );
    }
}
const mapStateToProps = state => ({
    isLoading       : selectIsFetchingUserAuth(state),
    isUserLoggedIn  : selectIsUserLogedIn(state),
    isError         : selectIsUserAuthError(state),
    userData        : selectLogedInUserData(state)
})
const mapDispatchToProps = dispatch => ({
    startFetchingLoginDetails : () =>dispatch(startFetchingUserLoginDetailsAsync())
})

export default  compose( 
    withStyles(useStyles, { withTheme: true }),
    connect(mapStateToProps , mapDispatchToProps)
)(HeaderCompoennt);
