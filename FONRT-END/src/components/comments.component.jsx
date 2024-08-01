import React, { useContext } from "react";
import { BlogContext } from "../pages/blog.page";
import CommentsField from "./comment-field.component";
import AnimationWrapper from "../common/page-animation";
import CommentCard from "./comment-card.component";

const CommentsContainer = () => {
  const { DataUpload : {up_name}, commentsWrapper, setCommentsWrapper, DataComment, ReplyComment } = useContext(BlogContext);

  // Ensure DataUpload is not undefined and has the property 'up_name'
  // const up_name = DataUpload?.up_name || '';

  // Log the state values to debug
  // console.log("DataUpload:", DataUpload);
  // console.log("commentsWrapper:", commentsWrapper);
  // console.log("DataComment:", DataComment);
  // console.log("ReplyComment:",  JSON.stringify(DataComment));


  return (
    <div className={"boxpopwarpp max-sm:w-full fixed " + (commentsWrapper ? "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]") + " duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[400px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden"}>
      <div className="relative">
        <h1 className="text-xl font-medium">Comments</h1>
        <p className="text-3xl mt-2 w-[70%] text-dark-grey line-clamp-1"> {up_name}</p>
        <button onClick={() => setCommentsWrapper(preVal => !preVal)} className="absolute top-0 right-0 flex justify-center items-center w-12 h-12 rounded-full bg-grey">
          <i className="fi fi-br-cross text-xl mt-1"></i>
        </button>
      </div>
      <hr className="border-grey my-8 w-[120%] -ml-10" />
      <CommentsField action="comment" />
      {Array.isArray(DataComment) && DataComment.length > 0 ? (
        DataComment.map((comment, i) => (
          <AnimationWrapper key={i}>
            <CommentCard index={i} datas={comment} replies={ReplyComment[comment.cm_id] || []} />
          </AnimationWrapper>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentsContainer;
