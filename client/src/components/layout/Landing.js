import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllRecipes,
  getLastThreeRecipes
} from "../../actions/recipesAction";
import RecipesList from "../recipes/RecipesList";
import "../../css/App.css";

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
    let accountButtons;
    return (
      <div className="landing">
        <div className="header-background">
          <div className="landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-4 mb-1">Grandma Remedies</h1>
                  <p className="lead">
                    {" "}
                    Find or share new and magical Grandma remedies for your
                    pain.
                  </p>
                  <hr />
                  {!this.props.auth.isAuthenticated ? (
                    (accountButtons = (
                      <div>
                        <Link
                          to="/register"
                          className="btn btn-lg btn-info mr-2"
                        >
                          Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-lg btn-light">
                          Login
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>Bienvenue {this.props.auth.user.name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <h3 className="category-title mt-4">Les dernières recettes</h3>
          <RecipesList recipes={this.props.lastThreeRecipes} />
          <div className="mt-4">
            <h3 className="category-title mt-4">Toutes les recettes</h3>
            <RecipesList recipes={this.props.recipes} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  lastThreeRecipes: state.recipes.lastThreeRecipes,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllRecipes, getLastThreeRecipes }
)(Landing);
