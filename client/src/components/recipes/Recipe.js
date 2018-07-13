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

    return (
      <div className="recipe-individual-page">
        <div className="container">
          <div className="row">
            <div className="col-6">{this.props.recipe.recipe.image_url}</div>
            <div className="col-6">{this.props.recipe.recipe.product_description}</div>
          </div>
        </div>
      </div>
    );
  }
}




const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(mapStateToProps, { getRecipeById })(Recipe);
