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
    <div className="col-sm-5">
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
<div className="thumbnail">
<img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
</div>
</div>
</div>
  );
};

export default Comment;
