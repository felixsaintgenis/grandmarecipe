/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "../common/Comment";
import CommentModal from "../common/CommentModal";
import { Link } from "react-router-dom";
import { getRecipeById, addLike } from "../../actions/recipesAction";
import { addToFavorites, getProfiles } from "../../actions/profileAction";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router";
import backgroundImage from "../../img/landingpage4.jpg";
import {
  getCommentsByRecipeId,
  deleteComment
} from "../../actions/commentsAction";
import { getCurrentProfile } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import "../../css/Recipe.css";

const styles = theme => ({
  pageContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "30px",
    paddingBottom: "30px"
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  commentContainer: {
    marginTop: "50px"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  typo: {
    marginLeft: "40px",
    paddingTop: "40px",
    paddingBottom: "40px"
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
});

class Recipe extends Component {
  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.getRecipeById(this.props.match.params.id);
      this.props.getCommentsByRecipeId(this.props.match.params.id);
      this.props.getCurrentProfile();
      this.props.getProfiles();
    }
  }

  render() {
    const { classes } = this.props;
    const likes = this.props.recipe.likes || [];
    const profile = this.props.currentUser || [];
    const comments = this.props.comments || [];
    let likeCount;
    let likeButton;
    let favoriteButton;
    let recipeContent;
    <Button component={Link} to="/login" variant="contained" color="primary">
      Add to favorites
    </Button>;
    this.props.isAuthenticated !== false
      ? this.props.recipe &&
        likes.filter(item => item.toString() === this.props.userId).length
        ? (likeButton = (
            <Button
              variant="outlined"
              color="primary"
              className="btn btn-primary"
              onClick={() =>
                this.props.addLike(this.props.userId, this.props.recipe._id)
              }
            >
              unlike remedie
            </Button>
          ))
        : (likeButton = (
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                this.props.addLike(this.props.userId, this.props.recipe._id)
              }
            >
              like remedie
            </Button>
          ))
      : null;
    likeCount = <span className="like-count">{likes.length}</span>;

    this.props.isAuthenticated !== false
      ? this.props.currentUser &&
        profile.favorites.filter(
          item =>
            item === this.props.recipe._id || item._id === this.props.recipe._id
        ).length
        ? (favoriteButton = (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.props.addToFavorites(
                  this.props.userId,
                  this.props.recipe._id
                )
              }
            >
              Delete from favorites
            </Button>
          ))
        : (favoriteButton = (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.props.addToFavorites(
                  this.props.userId,
                  this.props.recipe._id
                )
              }
            >
              Add to favorites
            </Button>
          ))
      : (favoriteButton = (
          <Link to="/login" className="nav-link">
            Connectez vous pour accéder aux likes et favoris
          </Link>
        ));

    if (this.props.recipe === null || this.props.recipe.loading) {
      recipeContent = <Spinner />;
    } else {
      recipeContent = (
        <React.Fragment>
          <CssBaseline />
          <div className={classes.layout}>
            <main>
              <Grid container spacing={40} className={classes.mainGrid}>
                {/* Main content */}
                <Grid item xs={12} md={4}>
                  <img src={this.props.recipe.image_url} alt="" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Product description
                  </Typography>
                  <Typography>
                    {this.props.recipe.product_description}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Product recipe
                  </Typography>
                  <Typography>{this.props.recipe.product_recipe}</Typography>
                </Grid>
                {/* End main content */}
                {/* Sidebar */}
                <Grid item xs={12} md={2}>
                  <Paper elevation={0} className={classes.sidebarAboutBox}>
                    <Typography variant="h6" gutterBottom>
                      ingredients
                    </Typography>
                    <Typography>{this.props.recipe.ingredients}</Typography>
                    <Typography variant="h6" gutterBottom>
                      tags
                    </Typography>
                    <Typography>{this.props.recipe.tags}</Typography>
                  </Paper>
                </Grid>
                {/* End sidebar */}
              </Grid>
            </main>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className="recipes-page-individual">
        <main className={classes.pageContainer}>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {this.props.recipe.name}
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                {this.props.recipe.tags}
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>{favoriteButton}</Grid>
                  <Grid item>{likeButton}</Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
          </div>
        </main>
        {recipeContent}
        <Grid
          container
          className={classes.commentContainer}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography
            component="h3"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            Commentaires
          </Typography>
          {this.props.isAuthenticated !== false ? <CommentModal /> : null}
          {this.props.isAuthenticated !== false ? (
            this.props.comments &&
            comments.map((comment, index) => {
              return (
                <Comment
                  key={index}
                  userId={this.props.userId}
                  commentUserId={comment.user ? comment.user._id : null}
                  commentId={comment._id}
                  body={comment.body}
                  username={
                    comment.user
                      ? comment.user.name
                        ? comment.user.name
                        : this.props.userName
                      : null
                  }
                  date={comment.created_at ? comment.created_at : "à l'instant"}
                  deleteComment={this.props.deleteComment}
                />
              );
            })
          ) : (
            <Link to="/login" className="nav-link">
              Connectez vous pour voir les commentaires
            </Link>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipes.recipe,
  comments: state.comments.comments,
  userId: state.auth.user.id,
  userName: state.auth.user.name,
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.currentUser.profile,
  profiles: state.usersList
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getCurrentProfile,
      getRecipeById,
      getCommentsByRecipeId,
      addLike,
      addToFavorites,
      getProfiles,
      deleteComment
    }
  )(withStyles(styles)(Recipe))
);
