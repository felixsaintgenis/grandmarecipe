import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "./Select";
import makeAnimated from "react-select/lib/animated";
import TextInput from "../common/TextInput";
import RecipeCard from "../recipes/RecipeCard";
import { getAllRecipes } from "../../actions/recipesAction";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import "../../css/SearchBar.css";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchContent: null,
      tagContent: null,
      recipeArray: []
    };
    this.displaySearchMatches = this.displaySearchMatches.bind(this);
    this.displayTagMatches = this.displayTagMatches.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  componentDidMount() {
    this.props.getAllRecipes();
  }

  findMatches(wordToMatch, recipes) {
    return recipes.filter(recipe => {
      const regex = new RegExp(wordToMatch, "gi");
      if (wordToMatch) return recipe.name.match(regex);
      return null;
    });
  }

  searchWithTag(wordToMatch, recipes) {
    return recipes.filter(recipe => {
      const regex = new RegExp(wordToMatch, "gi");
      if (wordToMatch) return recipe.tags.toString().match(regex);
    });
  }

  async displaySearchMatches(e) {
    await this.setState({
      searchContent: e.target.value
    });
    const recipeArray = await this.findMatches(
      this.state.searchContent,
      this.props.recipes.recipes
    );
    this.setState({
      recipeArray: recipeArray
    });
  }

  async handleTagChange(tagContent) {
    await this.setState({
      tagContent: tagContent
    });
    this.displayTagMatches();
  }

  async displayTagMatches() {
    const newRecipeArray = await this.searchWithTag(
      this.state.tagContent,
      this.props.recipes.recipes
    );
    this.setState({
      recipeArray: newRecipeArray
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="row" justify="left" alignItems="left">
        <Grid xs={6}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onKeyUp={this.displaySearchMatches}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <Grid xs={6}>
            <Select
              onKeyUp={this.displayTagMatches}
              handleTagChange={this.handleTagChange}
            />
          </Grid>
        </Grid>
        <Grid>
          {this.state.recipeArray.length !== 0 ? (
            <h3>Search results {this.state.tagContent}</h3>
          ) : null}
        </Grid>
        <Grid container direction="row" md={12}>
          {this.state.recipeArray &&
            this.state.recipeArray.map((recipe, index) => {
              return (
                <Grid item key={recipe} sm={12} md={4} lg={4}>
                  <RecipeCard
                    key={recipe._id}
                    name={recipe.name}
                    image_url={recipe.image_url}
                    product_description={recipe.product_description}
                    id={recipe._id}
                    tags={recipe.tags}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllRecipes }
  )(withStyles(styles)(SearchBar))
);
