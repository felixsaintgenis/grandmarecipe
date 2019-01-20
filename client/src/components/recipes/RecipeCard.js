import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import "../../css/Recipe.css";

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const RecipeCard = ({
  classes,
  name,
  image_url,
  product_description,
  id,
  tags
}) => {
  return (
    <Link to={`/recipe/${id}`} style={{ textDecoration: "none" }}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          title={name}
          subheader={tags}
        />
        <CardMedia className={classes.media} image={image_url} title={name} />
        <CardContent>
          <Typography className="card-text" component="p">
            {product_description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing />
      </Card>
    </Link>
  );
};
RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeCard);
