import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipeById } from '../../actions/recipesAction';

class Recipe extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getRecipeById(this.props.match.params.id);

    }
  }

  render() {
    return (
      <div className="recipes-page-individual">
        <div className="header-background-profile">
        <div className="landing-inner-profile text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-5 mb-1">{this.props.recipe.name}</h1>
                <p className="lead">
                  {this.props.recipe.tags}
                </p>

            </div>
          </div>

        </div>
          </div>
          </div>
      <div class="container">
        <div class="row mt-5">

        <div class="col-md-8 mx-auto">
          <img class="img-fluid mb-4" src={this.props.recipe.image_url} alt=""/>
        </div>

      </div>
      <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="section-heading text-black">Description</h2>
            <hr class="light my-4" />
            <p class="text-faded mb-4">{this.props.recipe.product_description}</p>
            </div>
            </div>

            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                  <h2 class="section-heading text-black">Recipe</h2>
                  <hr class="light my-4" />
                  <p class="text-faded mb-4">{this.props.recipe.product_recipe}</p>
                  </div>
                  </div>

                  <div class="row">
                      <div class="col-lg-8 mx-auto text-center">
                        <h2 class="section-heading text-black">Ingredients</h2>
                        <hr class="light my-4" />
                        <p class="text-faded mb-4">{this.props.recipe.ingredients}</p>
                        </div>
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
