import React from 'react';
import '../../css/Comment.css';

const Comment = ({
  username,
  profilePicture,
  date,
  body
}) => {
  return (
    <div>
    <div className="col-md-12">
<div className="panel panel-default">
<div className="panel-heading">
<strong>{username}</strong> <span className="text-muted">{date}</span>
</div>
<div className="panel-body">
{body}
</div>
</div>
</div>
<div className="col-sm-1">
</div>
</div>
  );
};

export default Comment;
