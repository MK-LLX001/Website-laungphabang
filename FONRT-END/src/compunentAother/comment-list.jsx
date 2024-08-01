import React, { useContext } from 'react';
import { CommentContext } from '../compunentAother/Comment-context';
import CommentForm from '../compunentAother/comment-from';

const Comment = ({ comment }) => {
  const { comments } = useContext(CommentContext);

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <CommentForm parentId={comment.id} />
      {comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentList = () => {
  const { comments } = useContext(CommentContext);

  return (
    <div className="comment-list">
      {comments.filter(comment => !comment.parentId).map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
