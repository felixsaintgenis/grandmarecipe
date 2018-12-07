import React, { Component } from "react";
import { connect } from "react-redux";
import RecipesList from "../recipes/RecipesList";
import SearchBar from "../common/SearchBar";
import { getCurrentProfile } from "../../actions/profileAction";
import "../../css/Recipe.css";

class Favorites extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div className="recipes-page-individual">
        <div className="header-background-profile">
          <div className="landing-inner-profile text-light">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-5 mb-1">My favorites</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5">
            <SearchBar />
          </div>
          <RecipesList
            recipes={this.props.profile ? this.props.profile.favorites : null}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.currentUser.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Favorites);
