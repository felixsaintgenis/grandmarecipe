import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard'
import { getAllRecipes } from '../../actions/recipesAction';
import '../../css/Recipe.css';

class RecipesList extends Component {
  constructor() {
    super();
    this.state = {
    };

  };


  componentDidMount() {
    this.props.getAllRecipes()
  };

  render() {

    return (
      <div className="recipes-list">
        {this.props.recipes.recipes.map((recipe) => {
          console.log(recipe.name)
        })};
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

export default connect(mapStateToProps, { getAllRecipes })(RecipesList);
