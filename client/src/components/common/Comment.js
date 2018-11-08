import React from 'react';
import '../../css/Comment.css';

const Comment = ({
  username,
  profilePicture,
  date,
  body,
  commentUserId,
  userId,
  commentId,
  deleteComment
  
}) => {
  date =  new Date(date)
  return (
<div>
<div className="col-md-12">
<div className="panel panel-default">
<div className="panel-heading">
<strong>{username}</strong>
<span className="text-muted">{date.toDateString()}</span>
{userId == commentUserId ? <span onClick={() => deleteComment(commentId)} className="text-muted delete-span">x</span> : null}
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
