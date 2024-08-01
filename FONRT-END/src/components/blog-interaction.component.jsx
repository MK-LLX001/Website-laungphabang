import React, { useContext } from "react";
import { BlogContext } from "../pages/blog.page";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Remove } from "../function/function.upload.API";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../App";
import { InsertLike } from "../function/function.upload.API";

const BlogIntercation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userAuth: { user_id: loggedInUserId, access_token } } = useContext(UserContext);
  const { DataUpload: { up_id, user_id, up_name, category_id, user_name, user_lastname, score_count }, setDataUpload, isLikeByUser, setIsLikeByUser, fetchData, commentsWrapper,
  setCommentsWrapper, DataComment,countComments} = useContext(BlogContext);

  console.log("count"+countComments)
  console.log("Logged-in user ID: " + loggedInUserId);
  console.log("Uploader user ID: " + user_id);

  const handleRemove = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'ທ່ານຕ້ອງການລົບຂໍ້ມູນແທ້ຫວາ',
        text: 'ທ່ານຈະບໍ່ສາມາດຍົກເລີກການນຳເນີນງານນີ້ໄດ້!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ໂດຍ, ລືບຂໍ້ມູນ!'
      });
      
      if (result.isConfirmed) {
        await Remove(id);
        toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
        console.log("Delete success");
        navigate(`/user/${loggedInUserId}`);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("ເກີດຂໍ້ຜິດຜາດໃນການລືບຂໍ້ມູນ");
    }
  };

  const handleLike = async () => {
    if (access_token) {
      const isCurrentlyLiked = isLikeByUser;

      // Update the local like state first
      setIsLikeByUser(!isCurrentlyLiked);

      if (isCurrentlyLiked) {
        console.log(isLikeByUser)
      }else {
        console.log(isLikeByUser)
      }

      // Prepare the data for the like/unlike request
      const data = {
        up_id: up_id,
        user_id: loggedInUserId,
        category_id: category_id,
        lk_score: isCurrentlyLiked ? -1 : 1 // Send -1 if unliking, 1 if liking
      };

      try {
        await InsertLike(data);
        toast.success("ຂໍຂອບໃຈ(¬‿¬)");
        // Fetch updated data
        await fetchData(); // Refresh the data by calling fetchData
      } catch (err) {
        console.error("Error liking/unliking post:", err);
        toast.error("ມີຂໍ້ຜິດຜາດໃນການຖືກໃຈ");
        // Revert the like state in case of error
        setIsLikeByUser(isCurrentlyLiked);
      }
    } else {
      console.error("User not logged in");
      toast.error("ທ່ານຕ້ອງການເຂົ້າສູ່ລະບົບເພື່ອໃຊ້ງານການນຳເນີນງານນີ້");
      navigate("/login");
    }
  };

  return (
    <>
      <Toaster/>
      <hr className="border-grey my-2" />
      <div className="flex gap-6 justify-between">
        <div className="flex gap-3 items-center">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80"
            onClick={handleLike}
          >
            <i className="fi fi-rr-social-network"></i>
          </button>
          <p className="text-xl text-dark-grey items-center">{score_count}</p>

          <button
          onClick={()=> setCommentsWrapper(preVal => !preVal)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
            <i className="fi fi-rr-comment-dots"></i>
          </button>

          <p className="text-xl text-dark-grey items-center">{countComments}</p>
        </div>

        {loggedInUserId === user_id && (
          <div className="flex gap-6 items-center">
            <Link 
              to={`/editor/${up_id}`}
              className="text-xl underline font-semibold"
            >
              Edit
            </Link>
            <button
              onClick={() => handleRemove(up_id)}
              className="text-xl underline font-semibold"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <hr className="border-grey my-2" />
    </>
  );
};

export default BlogIntercation;