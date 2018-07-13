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
      <div className="recipes-page">
        <div class="container">
            <div class="row">
        {this.props.recipes && this.props.recipes.recipes.map((recipe, index) => {
          return(
            <div class="col-4">
            <RecipeCard
            key={index}
            name={recipe.name}
            image_url={recipe.image_url}
            product_description={recipe.product_description}
            />
          </div>
          )
        })};
        </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

export default connect(mapStateToProps, { getAllRecipes })(RecipesList);
