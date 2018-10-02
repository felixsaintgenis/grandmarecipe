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
    let likeCount;
    let likeButton;
    if (this.props.recipe.likes) {
      likeCount = <span className="like-count">{this.props.recipe.likes.length}</span>
    }
    if ( this.props.recipe.likes && this.props.recipe.likes.filter( item => item.toString() === this.props.userId).length) {
       likeButton = <button className="btn btn-primary" onClick={ () => this.props.addLike(this.props.userId,this.props.recipe._id) }>Je n'aime plus la recette</button>;
     } else {
        likeButton = <button className="btn btn-primary" onClick={ () => this.props.addLike(this.props.userId,this.props.recipe._id) }>J'aime la recette</button>;
      }
  let recipeContent;
  if(this.props.recipe === null || this.props.recipe.loading) {
      recipeContent = <Spinner />
    } else {
      recipeContent =
      <div className="container-fluid">
        <div className="row mt-4">
          <div className ="col-md-12 text-center">
            <button className="btn btn-success mr-4" onClick={ () => this.props.addToFavorites(this.props.userId,this.props.recipe._id) }>Ajouter en favori</button>
          {likeButton}
          <i class="fas fa-heart"></i>
          {likeCount}
        </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4 mx-auto">
            <img className="img-fluid mb-4" src={this.props.recipe.image_url} alt=""/>
          </div>

        </div>
        <div className="row">
          <div className="col-lg-12 mx-auto text-center">
            <h2 className="section-heading text-black">Description</h2>
            <hr className="light my-4"/>
            <p className="text-faded mb-4">{this.props.recipe.product_description}</p>
          </div>
        </div>
        <div className="col-lg-12 mx-auto text-center">
          <h2 className="section-heading text-black">Recipe</h2>
          <hr className="light my-4"/>
          <p className="text-faded mb-4">{this.props.recipe.product_recipe}</p>
        </div>

        <div className="row">
          <div className="col-lg-12 mx-auto text-center">
            <h2 className="section-heading text-black">Ingredients</h2>
            <hr className="light my-4"/>
            <p className="text-faded mb-4">{this.props.recipe.ingredients}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mx-auto text-center">
            <h2 className="section-heading text-black">Commentaires</h2>
            <hr className="light my-4"/>
            <CommentModal />
            {this.props.comments && this.props.comments.map((comment, index) => {
              return(
                <Comment key={index} body={comment.body} username={comment.user ? comment.user.name : undefined} date={comment.created_at} />
              )
            })}
          </div>
        </div>
      </div>
    }

    return (
      <div className="recipes-page-individual">
        <div className="header-background-profile">
          <div className="landing-inner-profile text-light">
            <div className="container-fluid">
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
        {recipeContent}
    </div>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipes.recipe,
  comments: state.comments.comments,
  userId: state.auth.user.id
});

export default connect(mapStateToProps, { getRecipeById, getCommentsByRecipeId, addLike, addToFavorites })(Recipe);
