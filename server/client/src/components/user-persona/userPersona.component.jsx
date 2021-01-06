
import React from 'react';

import {
    Avatar, 
    Grow, 
    Popper,
    Paper, 
    MenuItem, 
    MenuList,
    ClickAwayListener
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {withRouter} from 'react-router-dom';
// import {connect} from 'react-redux';
import {compose} from 'redux';


const usePersonaStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
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

const UserPersona =({userData, history}) =>{
    const classes = usePersonaStyles();
    const {display_name, profile_picture } = userData; //,email_id

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

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

    return(
        <div className={classes.root}>
            <Avatar title={display_name} alt ={display_name} src={profile_picture} 
                    className={classes.large} 
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
            />
            <Popper open={open} 
                    role='menu'
                    anchorEl={anchorRef.current} 
                    transition 
                    disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={onLogOut}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
         </div>
    ) 
}

export default compose(
    withRouter
)(UserPersona);