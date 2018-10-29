import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllRecipes } from '../../actions/recipesAction';
import RecipesList from '../recipes/RecipesList'
import '../../css/App.css'

class Landing extends Component {
  constructor() {
    super();
    this.state = {
    };

  };

  componentDidMount() {
    this.props.getAllRecipes();
  };

  render() {
    return (
      <div className="landing">
      <div className="header-background">
        <div className="landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-4 mb-1">Grandma Remedies</h1>
                <p className="lead">
                  {' '}
                  Find or share new and magical Grandma remedies for your pain.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
      <RecipesList recipes={this.props.recipes} />
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes
});

export default connect(mapStateToProps, { getAllRecipes })(Landing);
