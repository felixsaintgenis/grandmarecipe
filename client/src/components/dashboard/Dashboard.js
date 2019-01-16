import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profileAction";
import { getAllRecipes } from "../../actions/recipesAction";
import RecipesList from "../recipes/RecipesList";
import Spinner from "../common/Spinner";
import ProfileTable from "./ProfileTable";
import getUserRecipesLiked from "../../helpers/getUserRecipesLiked";
import "../../css/Profile.css";
import "../../css/Recipe.css";

class Dashboard extends Component {
  async componentDidMount() {
    await this.props.getCurrentProfile();
    await this.props.getAllRecipes();
  }

  render() {
    let userLikesArray = [];
    let lastThreeRecipesLiked = [];
    const { user } = this.props.auth;
    const { profile, loading } = this.props.currentUser;
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
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <div className="row">
              <div>
                <button
                  onClick={this.props.deleteAccount}
                  className="btn btn-danger mt-4"
                >
                  Supprimer mon compte
                </button>
                <Link to="/create-recipe" className="btn btn-primary ml-4 mt-4">
                  Ajouter une recette
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="mt-5">
                <ProfileTable
                  handle={profile.handle}
                  country={profile.country}
                  status={profile.status}
                  skills={profile.skills}
                  date={profile.date}
                  bio={profile.bio}
                />
              </div>
            </div>

            <div className="row">
              <Link to="/favorites" className="category-title mt-4">
                Mes derniers favoris
              </Link>
              <RecipesList
                recipes={
                  this.props.currentUser
                    ? this.props.currentUser.profile.favorites.slice(
                        Math.max(
                          this.props.currentUser.profile.favorites.length - 3,
                          1
                        )
                      )
                    : null
                }
              />
            </div>
            <div className="row">
              <Link to="/likes" className="category-title mt-4">
                Mes likes
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
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Add informations
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="header-background-profile">
          <div className="landing-inner-profile text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-5 mb-1">Profile</h1>
                  <p className="lead"> Welcome {user.name}.</p>
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
  currentUser: state.currentUser,
  auth: state.auth,
  recipes: state.recipes.recipes
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getAllRecipes }
)(Dashboard);
