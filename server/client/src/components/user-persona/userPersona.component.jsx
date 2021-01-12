
import React from 'react';
import {connect} from 'react-redux';

import {
    Avatar, 
    Grow, 
    Popper,
    Paper, 
    MenuItem, 
    MenuList,
    Typography,
    ClickAwayListener
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {withRouter} from 'react-router-dom';
// import {connect} from 'react-redux';
import {compose} from 'redux';

// icons
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import StripeCheckoutComponent from '../stripe-checkout/Stripe-checkout.component';
import {selectUserCredits} from '../../store/authReducers/auth.selector';
import {startUserLogoutAsync} from '../../store/authReducers/auth.action';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';




const usePersonaStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '50%',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    credit:{
      display: 'flex',
      fontWeight: 'bold',
      height: 'inherit',
      alignItems: 'center', 
      visibility: 'hidden',
      [theme.breakpoints.up('md')]: {
        visibility: 'visible'
      }
    },
    avatar: {
      display: 'flex'
    },
    icon:{
      marginRight: theme.spacing(1)
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      cursor: 'Pointer'
    },
  }));

const UserPersona =({userData, history, userCredit}) =>{
    const classes = usePersonaStyles();
    const {display_name, profile_picture } = userData; //,email_id

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const stripeRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
        setOpen(false);
      };
      function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
      }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const onLogOut = (event) =>{
        handleClose(event);
        window.open('/api/logout',"_self");
    }

    const onCompleteStripePayement =() => handleToggle(stripeRef.current); 

    return(
        <div className={classes.root}>
          <div className={classes.credit}><Typography variant="h6" >Your total Credit are</Typography> 
            <AttachMoneySharpIcon/>  <Typography variant="h6" >{userCredit}</Typography>
          </div>
          <div className={classes.avatar}>
          <Avatar title={display_name} alt ={display_name} src={profile_picture} 
                    className={classes.large} 
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
            />
             <IconButton color="inherit"  aria-label="menu"  onClick={handleToggle} >
                <ExpandMoreIcon/>
            </IconButton>
          </div>
         
            <Popper open={open} 
                    role='menu'
                    anchorEl={anchorRef.current} 
                    style={{zIndex: 100}}
                    transition 
                    disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}> <AccountCircleSharpIcon className={classes.icon}/>      Profile                 </MenuItem>
                    <MenuItem ref={stripeRef}>       <AddCircleOutlineSharpIcon className={classes.icon}/>   <StripeCheckoutComponent onClose={onCompleteStripePayement}> Add Credit</StripeCheckoutComponent> </MenuItem>
                    <MenuItem onClick={handleClose}> <AttachMoneySharpIcon className={classes.icon}/>        You have {userCredit} Credits      </MenuItem>
                    <MenuItem onClick={onLogOut}>    <CloseSharpIcon className={classes.icon}/>              Logout                  </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
         </div>
    )
}
const mapStateToProps = state =>({userCredit :selectUserCredits(state) })
const mapDispatchToProps = dispatch => ({startUserLogout: ()=>dispatch(startUserLogoutAsync())})
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(UserPersona);