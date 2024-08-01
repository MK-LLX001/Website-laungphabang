import React from 'react';
import CommentProvider from '../compunentAother/Comment-context';
import CommentList from '../compunentAother/comment-list';
import CommentForm from '../compunentAother/comment-from';

const CommentBlog = () => {
  return (
    <CommentProvider>
      <div className="blog-page">
        {/* เนื้อหาของบล็อก */}
        <h1>Blog Title</h1>
        <p>Blog content...</p>
        {/* ฟอร์มการแสดงความคิดเห็น */}
        <CommentForm />
        {/* แสดงความคิดเห็น */}
        <CommentList />
      </div>
    </CommentProvider>
  );
};

export default CommentBlog;
