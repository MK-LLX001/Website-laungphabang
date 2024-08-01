import { useContext, useState } from "react";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import { BlogContext } from "../pages/blog.page";
import { Insert} from '../function/comment-Api'
const CommentsField = ({ action,index =undefined , replyingTo = undefined,  setReplying }) => {

  const { userAuth: { access_token,user_id} } = useContext(UserContext)  

  const { DataUpload: { up_id,  up_name, category_id, user_name, user_lastname, score_count },fetchData,fetchComments,
  ReplyComment } = useContext(BlogContext);

//  console.log("status"+action)

 const parent_id = replyingTo;
 console.log("id-comment"+parent_id)

  const [comment, setComment] = useState("");
// console.log(up_id)

const handleComment = async () => {
  if (!access_token) {
    return toast.error("กรุณาเข้าสู่ระบบก่อนที่จะคอมเมนต์");
  }
  if (!comment.length) {
    return toast.error("กรุณาใส่ข้อมูลก่อน");
  }

  let data;

  if (action === "comment") {
    data = { comment, user_id, up_id };
  } else if (action === "reply") {
    data = { parent_id, comment, user_id, up_id };
  }

  console.log(data);

  await Insert(data)
    .then((res) => {

   


      console.log(res.data);
      toast.success("ຄອມເມັ້ນສຳເລັດ");
      fetchData();
      fetchComments();
    })
    .catch((err) => {
      console.log(err);
      toast.error("ເກີດຂໍ້ຜິດຜາດໃນການຄອມເມັ້ນ");
    });
};


  return (
    <>
    <Toaster/>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="ອອກຄຳເຫັນ..."
        className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"
      >
        {" "}
      </textarea>
      <button className="btn-dark mt-5 px-10" onClick={handleComment}> {action}</button>

      <div>

      </div>
    </>
  );
};

export default CommentsField;