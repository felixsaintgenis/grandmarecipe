import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeById } from '../../actions/recipesAction';

class Recipe extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getRecipeById(this.props.match.params.id);

    }
  }

  render() {
console.log(this.props.recipe)
    return (
      <div class="container">
        <h1 class="my-4">{this.props.recipe.name}</h1>
        <div class="row">

        <div class="col-md-8">
          <img class="img-fluid" src={this.props.recipe.image_url} alt=""/>
        </div>

      </div>
      <div class="row">
        <div class="col-md-12">
          <h3>Description</h3>
          <p>{this.props.recipe.product_description}</p>
        </div>
      <div class="col-md-12">
        <h3 class="">Recipe</h3>
        <p>{this.props.recipe.product_recipe}</p>
      </div>
      </div>
      <div class="row">
      <div class="col-md-12">
      <h3 class="my-3">Ingredients</h3>
      <ul>
        {this.props.recipe.ingredients}
      </ul>

    </div>
    </div>
    </div>

    );
  }
}




const mapStateToProps = state => ({
  recipe: state.recipes.recipe
});

export default connect(mapStateToProps, { getRecipeById })(Recipe);
