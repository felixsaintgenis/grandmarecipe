import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard'
import SearchBar from '../common/SearchBar'
import { getMyRecipes } from '../../actions/recipesAction';
import '../../css/Recipe.css';

class RecipesList extends Component {
  constructor() {
    super();
    this.state = {
    };

  };


  componentDidMount() {
    this.props.getMyRecipes();
  };

  render() {

    return (
      <div className="recipes-page">
        <div className="container">
            <div className="row">
        {this.props.recipes && this.props.recipes.recipes.map((recipe, index) => {
          return(
            <div className="col-4">
            <RecipeCard
            name={recipe.name}
            key={index}
            image_url={recipe.image_url}
            product_description={recipe.product_description}
            id={recipe._id}
            tags={recipe.tags}
            />
          </div>
          )
        })}
        </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

export default connect(mapStateToProps, { getMyRecipes })(RecipesList);
