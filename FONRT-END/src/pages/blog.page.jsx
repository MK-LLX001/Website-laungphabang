import React, { useState, useEffect, createContext } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ReadById } from "../function/function.upload.API";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import { getDay } from "../common/date";
import BlogIntercation from "../components/blog-interaction.component";
import BlogPostCard from "../components/blog-Card-post.component";
import CommentsContainer from "../components/comments.component";
import { Getcomments, GetReplycomments } from "../function/comment-Api";

// Create Context
export const BlogContext = createContext();

const BlogPage = () => {
  const params = useParams();

  const [DataUpload, setDataUpload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLikeByUser, setIsLikeByUser] = useState(false);

  const [commentsWrapper, setCommentsWrapper] = useState(false);
  const [totalParentCommentsLoaded, setTotalCommentsLoaded] = useState(0);

  const fetchData = async () => {
    try {
      const response = await ReadById(params.id);
      setDataUpload(response.data[0]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("ຂໍອະໄພເກີດຂໍ້ຜິດຜາດ");
      setLoading(false);
    }
  };

  const [DataComment, setDataComment] = useState([]); // Ensure initial state is an array
  const countComments = DataComment.length;
  const [ReplyComment, setReplyComment] = useState({});
  

  const fetchComments = async () => {
    try {
      const id = params.id;
      const res = await Getcomments(id);
      setDataComment(res.data);
      console.log(res.data)
      // Fetch replies for each comment
      res.data.forEach(async (comment) => {
        const replyRes = await GetReplycomments(comment.cm_id);
        setReplyComment((prev) => ({
          ...prev,
          [comment.cm_id]: replyRes.data,
        }));
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch comments");
    }
  };

  useEffect(() => {
    fetchComments();
    fetchData();
  }, []);

  return (
   <section>
       <AnimationWrapper>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <BlogContext.Provider
            value={{
              DataUpload,
              setDataUpload,
              isLikeByUser,
              setIsLikeByUser,
              fetchData,
              commentsWrapper,
              setCommentsWrapper,
              totalParentCommentsLoaded,
              setTotalCommentsLoaded,
              fetchComments,
              DataComment,
              setDataComment,
              countComments,
              ReplyComment,
              setReplyComment
            }}
          >
            <CommentsContainer />
            <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
              <img
                src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${DataUpload.img_image}`}
                alt={DataUpload.up_name}
                className="aspect-video"
              />
              <div className="titles mt-12">
                <div>
                  <p>{DataUpload.up_name}</p>
                  <p>{DataUpload.category_name}</p>
                </div>
                <div className="img- flex max-sm:flex-col justify-between my-8">
                  <div className="profiles flex gap-5 items-start">
                    <img
                      src={
                        DataUpload.user_profile_img.startsWith("http")
                          ? DataUpload.user_profile_img
                          : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${DataUpload.user_profile_img}`
                      }
                      alt={DataUpload.user_name}
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="capitalize">
                      {DataUpload.user_name + " " + DataUpload.user_lastname}
                      <br />@
                      <Link
                        to={`/user/${DataUpload.user_id}`}
                        className="underline"
                      >
                        {DataUpload.user_name}
                      </Link>
                    </p>
                  </div>
                  <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
                    ອັບໂຫລດເມື່ອ {getDay(DataUpload.time_created)}
                  </p>
                </div>
              </div>
              <BlogIntercation />
              <div className="desc md:pl-10 ">
                <p>{DataUpload.up_description}</p>
              </div>
            </div>
          </BlogContext.Provider>
        )}
      </div>
    </AnimationWrapper>
   </section>
  );
};

export default BlogPage;
