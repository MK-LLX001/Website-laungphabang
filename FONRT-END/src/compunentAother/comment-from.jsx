import React, { useContext, useState } from 'react';
import { CommentContext } from '../compunentAother/Comment-context';

const CommentForm = ({ parentId = null }) => {
  const { addComment, addReply } = useContext(CommentContext);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: Date.now(),
      text,
      replies: [],
      parentId,
    };

    if (parentId) {
      addReply(parentId, newComment);
    } else {
      addComment(newComment);
    }

    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button type="submit">Comment</button>
    </form>
  );
};

export default CommentForm;
