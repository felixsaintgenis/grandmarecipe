import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount } from '../../actions/profileAction';
import RecipesList from '../recipes/RecipesList';
import SearchBar from '../common/SearchBar';
import Spinner from '../common/Spinner'
import Profile from './Profile'
import '../../css/Profile.css';
import '../../css/Recipe.css';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if(profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      if(Object.keys(profile).length > 0) {
        dashboardContent =
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
          <div className="mx-auto mt-5">
            <Profile />
          </div>
      </div>
      <div className="row">
      <h3 className="category-title mt-4">Mes derniers favoris</h3>
      <RecipesList recipes={this.props.profile ? this.props.profile.profile.favorites.slice(Math.max(this.props.profile.profile.favorites.length - 3, 1)) : null}/>
      </div>   
      </div>  
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Add informations
            </Link>
          </div>
        )
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
              <p className="lead">
                {' '}
                Welcome {user.name}.
              </p>

          </div>
        </div>

      </div>
        </div>
        </div>
        <div className="container">
        <div className="row mt-4">
          {dashboardContent}
          </div>
          </div>

          </div>

    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
