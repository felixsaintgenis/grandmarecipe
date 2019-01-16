import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import backgroundImage from "../../img/landingpage4.jpg";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { connect } from "react-redux";
import {
  getAllRecipes,
  getLastThreeRecipes
} from "../../actions/recipesAction";
import RecipesList from "../recipes/RecipesList";

const styles = theme => ({
  pageContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "100px",
    paddingBottom: "100px"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  typo: {
    marginLeft: "40px",
    paddingTop: "40px",
    paddingBottom: "40px"
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
});

class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getAllRecipes();
    this.props.getLastThreeRecipes();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.pageContainer}>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Grandma Remedies
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                Find or share new and magical Grandma remedies for your pain.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button
                      component={Link}
                      to="/login"
                      variant="contained"
                      color="primary"
                    >
                      login
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      component={Link}
                      to="/register"
                      variant="outlined"
                      color="primary"
                    >
                      find remedies
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
          </div>
        </main>
        <div>
          <Typography
            className={classes.typo}
            component="h3"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            Les dernières recettes
          </Typography>
          <RecipesList recipes={this.props.lastThreeRecipes} />
          <div className="mt-4">
            <Typography
              className={classes.typo}
              component="h3"
              variant="h4"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Toutes les recettes
            </Typography>
            <RecipesList recipes={this.props.recipes} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  lastThreeRecipes: state.recipes.lastThreeRecipes,
  auth: state.auth
});
Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { getAllRecipes, getLastThreeRecipes }
  )(withStyles(styles)(Landing))
);
