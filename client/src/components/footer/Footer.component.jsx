import React from 'react';

// react material
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';




// list component for drawer


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
class FooterComponent extends React.Component {
  //  list for drawer
  render(){
    const {classes} =  this.props; 
      
    return (
      <div className={classes.root}>
        <AppBar position="static" color= "secondary">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
                  Survey Generator Contact 
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


export default  withStyles(useStyles, { withTheme: true })(FooterComponent);
