import React, { Component } from "react";
import { connect } from "react-redux";
import RecipeList from "./RecipesList";
import SearchBar from "../common/SearchBar";
import { getAllRecipes } from "../../actions/recipesAction";
import "../../css/Recipe.css";

class RecipesList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getAllRecipes();
  }

  render() {
    return (
      <div className="recipes-page">
        <div className="header-background-profile">
          <div className="landing-inner-profile text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-5 mb-1">All the remedies</h1>
                  <p className="lead">Everything you need is here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5">
            <SearchBar />
          </div>
          <h2 className="category-title mt-4">Toutes les recettes</h2>
          <RecipeList recipes={this.props.recipes} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes
});

export default connect(
  mapStateToProps,
  { getAllRecipes }
)(RecipesList);
