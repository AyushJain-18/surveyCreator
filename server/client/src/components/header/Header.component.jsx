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
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const DrawerList = ({classes, toggleDrawer}) => (
  <div className={classes.list} role="presentation"
    onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon> <InboxIcon /></ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon><MailIcon/></ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>
);

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
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" 
                            aria-label="menu" onClick={this.toggleDrawer(true)} >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  <Link to='/'>Survey Generator</Link> 
                </Typography>
                { isLoading && <CircularProgress  className ={classes.circularSpinner} color="secondary"/>}
                { !isLoading && isError && <Typography variant="h6"  color="secondary"> Error Ocuured</Typography>} 
                { !isLoading && !isError && !isUserLoggedIn && <Button href='/auth/google' color="inherit">Login with google</Button>}
                { !isLoading && !isError && isUserLoggedIn  && <UserPersona userData = {userData}/> }
              </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={this.state.showDrowser} onClose={this.toggleDrawer(false)}>
            <DrawerList classes={classes} toggleDrawer={this.toggleDrawer}/>
          </Drawer>
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
