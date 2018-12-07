import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileById } from "../../actions/profileAction";
import { getAllRecipes } from "../../actions/recipesAction";
import RecipesList from "../recipes/RecipesList";
import Spinner from "../common/Spinner";
import Profile from "./Profile";
import getUserRecipesLiked from "../../helpers/getUserRecipesLiked";
import "../../css/Profile.css";

class PublicProfile extends Component {
  async componentDidMount() {
    if (this.props.match.params.id) {
      await this.props.getProfileById(this.props.match.params.id);
      await this.props.getAllRecipes();
    }
  }
  render() {
    let userLikesArray = [];
    let lastThreeRecipesLiked = [];
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    getUserRecipesLiked(
      this.props.recipes,
      userLikesArray,
      lastThreeRecipesLiked,
      this.props.auth.user.id
    );

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <div className="row">
            <div className="mx-auto mt-5">
              <Profile />
            </div>
          </div>
          <div className="row">
            <Link to="/favorites" className="category-title mt-4">
              Ses derniers favoris
            </Link>
            <RecipesList
              recipes={
                this.props.profile
                  ? this.props.profile.profile.favorites.slice(
                      Math.max(
                        this.props.profile.profile.favorites.length - 3,
                        1
                      )
                    )
                  : null
              }
            />
          </div>
          <div className="row">
            <Link to="/likes" className="category-title mt-4">
              Ses likes
            </Link>

            <RecipesList
              recipes={
                lastThreeRecipesLiked
                  ? lastThreeRecipesLiked.slice(
                      Math.max(lastThreeRecipesLiked.length - 3, 1)
                    )
                  : null
              }
            />
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="header-background-profile">
          <div className="landing-inner-profile text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-5 mb-1">Profile</h1>
                  <p className="lead"> {user.name} profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-4">{dashboardContent}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  recipes: state.recipes.recipes
});
export default connect(
  mapStateToProps,
  { getAllRecipes, getProfileById }
)(PublicProfile);
