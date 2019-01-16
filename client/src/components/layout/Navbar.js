import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { logoutUser } from "../../actions/authAction";
import { clearCurrentProfile } from "../../actions/profileAction";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: "relative"
  },
  appButtons: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  toolbarTitle: {
    flex: 1
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

function Navbar(props) {
  const { classes } = props;
  const { isAuthenticated } = props.auth;

  const onLogoutClick = e => {
    e.preventDefault();
    props.clearCurrentProfile();
    props.logoutUser(props.history);
  };

  const authLinks = (
    <Toolbar>
      <Typography
        component={Link}
        to="/"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.toolbarTitle}
      >
        Grandma remedies
      </Typography>
      <Button component={Link} to="/recipes">
        Find remedies
      </Button>
      <Button component={Link} to="/favorites" className="nav-link">
        Favorites
      </Button>
      <Button component={Link} to="/dashboard" className="nav-link">
        Profile
      </Button>
      <Button
        onClick={e => onLogoutClick(e)}
        className={classes.appButtons}
        color="primary"
        variant="outlined"
      >
        Logout
      </Button>
    </Toolbar>
  );
  const guestLinks = (
    <Toolbar>
      <Typography
        component={Link}
        to="/"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.toolbarTitle}
      >
        Grandma remedies
      </Typography>
      <Button component={Link} to="/recipes">
        Find remedies
      </Button>
      <Button
        component={Link}
        to="/Login"
        className={classes.appButtons}
        color="primary"
        variant="outlined"
      >
        Login
      </Button>
      <Button
        component={Link}
        to="/register"
        className={classes.appButtons}
        color="primary"
        variant="outlined"
      >
        Sign up
      </Button>
    </Toolbar>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        {isAuthenticated ? authLinks : guestLinks}
      </AppBar>
    </React.Fragment>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser, clearCurrentProfile }
  )(withStyles(styles)(Navbar))
);
