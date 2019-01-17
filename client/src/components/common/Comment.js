import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    marginTop: "20px",
    minWidth: "40%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 5
  }
};

const Comment = ({
  classes,
  username,
  date,
  body,
  commentUserId,
  userId,
  commentId,
  deleteComment
}) => {
  date = new Date(date);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {date.toDateString()}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {username}
        </Typography>
        <Typography component="p">{body}</Typography>
      </CardContent>
      <CardActions>
        {userId === commentUserId ? (
          <Button
            size="small"
            onClick={() => deleteComment(commentId)}
            className="text-muted delete-span"
          >
            delete
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comment);
