import React, { createContext, useState } from 'react';

export const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  const addReply = (commentId, reply) => {
    setComments(comments.map(comment => 
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, addReply }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
