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
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';


import {Link} from 'react-router-dom';

// custum componnsts 
import UserPersona from '../user-persona/userPersona.component'
// action creator
import {startFetchingUserLoginDetailsAsync, startLoginWithGoogle} from '../../store/authReducers/auth.action';
//  selectors
import {
    selectIsFetchingUserAuth, 
    selectIsUserLogedIn,
    selectIsUserAuthError,
    selectLogedInUserData
} from '../../store/authReducers/auth.selector';


// list component for drawer
const getIcons = (index) =>{
  if(index ===0){return <AccountCircleSharpIcon/>}
  if(index ===1){return <PostAddOutlinedIcon />}
}
const DrawerList = ({classes, toggleDrawer}) => (
  <div className={classes.list} role="presentation"
    onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
    <List>
      {['Profile', 'Surveys'].map((text, index) => (
        <Link to={index === 0? '/Profile': index === 1? '/surveys': ''}>
            <ListItem  button key={text}>
              <ListItemIcon> {getIcons(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
        </Link>
      ))}
    </List>
  </div>
);

// using react material UI with class based components
const useStyles = theme => ({
    root: {
         flexGrow: 1,
    },
    appbar:{
      minHeight: '72px'
    },
    menuButton: {
            marginRight: theme.spacing(2),
            
    },
    title: {
            flexGrow: 1,
            cursor: 'pointer'
    },
    Error: {
        color: 'red'
    },
    list: {
      width: 250,
    },
    circularSpinner: {
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
});
class HeaderCompoennt extends React.Component {
    state={showDrowser: false}
    componentDidMount(){  this.props.startFetchingLoginDetails();}
    toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      this.setState({showDrowser: open });
    };
    //  list for drawer
    render(){
        const {classes, isLoading, isUserLoggedIn, isError, //this.useStyles(); 
                userData} =  this.props; 
      
        return (
          <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
              <Toolbar>
              {isUserLoggedIn &&
              <IconButton edge="start" className={classes.menuButton} color="inherit" 
                            aria-label="menu" onClick={this.toggleDrawer(true)} >
                    <MenuIcon />
                </IconButton> }
                <Typography variant="h6" className={classes.title}>
                  <Link to='/'>Survey Generator</Link> 
                </Typography>
                { isLoading && <CircularProgress  className ={classes.circularSpinner} color="secondary"/>}
                { !isLoading && isError && <Typography variant="h6"  color="secondary"> Error Ocuured</Typography>} 
                { !isLoading && !isError && !isUserLoggedIn && <Button href='/auth/google' color="inherit">Login with google</Button>}
                { !isLoading && !isError && isUserLoggedIn  && <UserPersona userData = {userData}/> }
              </Toolbar>
            </AppBar>
           {isUserLoggedIn && <Drawer anchor='left' open={this.state.showDrowser} onClose={this.toggleDrawer(false)}>
            <DrawerList  classes={classes} toggleDrawer={this.toggleDrawer}/>
          </Drawer>}
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


// let google={
//   callbackUrl : 'ds',
//   scope       : 'eamil & profile'
// }
// https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?
// let queryParams =[]
// `response_type=code`,
// `redirect_uri=${google.callbackUrl}`
// `scope=${google.scope}`
// client_id=637912965377-f1md8uulfcmlr2cdstbrct49pdvesn56.apps.googleusercontent.com&
// flowName=GeneralOAuthFlow
// const url ='https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=email%20profile&client_id=637912965377-f1md8uulfcmlr2cdstbrct49pdvesn56.apps.googleusercontent.com&flowName=GeneralOAuthFlow'
