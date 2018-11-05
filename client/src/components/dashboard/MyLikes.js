import React, {Component} from 'react';
import {connect} from 'react-redux';
import RecipesList from '../recipes/RecipesList';
import SearchBar from '../common/SearchBar';
import { getCurrentProfile } from '../../actions/profileAction';
import { getAllRecipes } from '../../actions/recipesAction';
import getUserRecipesLiked from '../../helpers/getUserRecipesLiked';
import '../../css/Recipe.css';

class MyLikes extends Component {
  async componentDidMount() {
    await this.props.getCurrentProfile();
    await this.props.getAllRecipes();
  }

  render() {
    let userLikesArray = [];
    let lastThreeRecipesLiked = [];
    getUserRecipesLiked(this.props.recipes, userLikesArray, lastThreeRecipesLiked, this.props.auth.user.id)
    return (
      <div className="recipes-page-individual">
        <div className="header-background-profile">
          <div className="landing-inner-profile text-light">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-5 mb-1">My likes</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5">
            <SearchBar />
            </div>
            <RecipesList recipes={lastThreeRecipesLiked ? lastThreeRecipesLiked : null} />
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, getAllRecipes })(MyLikes);
