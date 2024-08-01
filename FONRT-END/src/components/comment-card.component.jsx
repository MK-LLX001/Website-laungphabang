import { getDay } from "../common/date";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import CommentsField from "./comment-field.component";
import { Link } from "react-router-dom";

const CommentCard = ({ index, datas, replies }) => {
  const { userAuth: { access_token } } = useContext(UserContext);
  const { user_profile_img, user_id, user_name, user_lastname, time, comments, cm_id } = datas;

  const [isReplying, setReplying] = useState(false);
  const handleReplyCilck = () => {
    if (!access_token) {
      return toast.error("ກະຮຸນາ login ກ່ອນຈື່ງສາມາດຕອບໄດ້");
    }
    setReplying(preVal => !preVal);
  };

  const [showReplies, setShowReplies] = useState(false);
  const handleHideReply = () => {
    setShowReplies(prevVal => !prevVal);
  };

  // console.log("replyingCard"+JSON.stringify(replies))

  return (
    <div className="w-full ">
      <div className="my-5 p-6 rounded-md border border-grey">
        <Link to={`/user/${user_id}`} className="flex gap-3 items-center mb-8">
          <img 
             src={
              user_profile_img.startsWith("http")
                ? user_profile_img
                : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${user_profile_img}`
            }
          
          className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1" >{user_name}@{user_lastname}</p>
          <p className="min-w-fit">{getDay(time)}</p>
        </Link>
        <p className="text-xl ml-3">{comments}</p>
        <div className="flex gap-5 items-center mt-5">
          <button className="hover:underline" onClick={handleReplyCilck}> <i className="fi fi-bs-comment-dots"></i> Reply</button>
        </div>
        {isReplying && (
          <div className="mt-8">
            <CommentsField action="reply" index={index} replyingTo={cm_id} setReplying={setReplying} />
          </div>
        )}
        {replies.length > 0 && (
          <>
            <button
              onClick={handleHideReply}
              className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2 mt-5"
            >
              {showReplies ? 'Hide Replies' : 'Show Replies'} {replies.length}
            </button>
            {showReplies && (
              <div className="mt-4 ml-8">
                <p className="text-dark-grey/60">ຄໍາເຫັນນີ້ມີ {replies.length} replies:</p>
                {replies.map((reply, i) => (
                  <CommentCard key={i} index={i} datas={reply} replies={[]} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
