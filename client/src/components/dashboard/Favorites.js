import React, {Component} from 'react';
import {connect} from 'react-redux';
import Comment from '../common/Comment';
import CommentModal from '../common/CommentModal';
import { getRecipeById, addLike } from '../../actions/recipesAction';
import { addToFavorites } from '../../actions/profileAction';
import {getCommentsByRecipeId} from '../../actions/commentsAction';
import Spinner from '../common/Spinner';
import '../../css/Recipe.css';

class Recipe extends Component {
  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.getRecipeById(this.props.match.params.id);
      this.props.getCommentsByRecipeId(this.props.match.params.id);

    }
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 mx-auto text-center">
              <h2 className="section-heading text-black">Commentaires</h2>
              <hr className="light my-4"/>
            </div>
          </div>
        </div>
      }
    </div>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipes.recipe,
  favorites: state.comments.comments,
  userId: state.auth.user.id
});

export default connect(mapStateToProps, { getRecipeById, getCommentsByRecipeId, addLike, addToFavorites })(Recipe);
