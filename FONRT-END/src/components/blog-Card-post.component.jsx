import React from "react";
import { Link } from "react-router-dom";
import { InsertLike ,Reload} from "../function/function.upload.API";
import { getDay } from "../common/date";

//TODO: ไฟท่กงวคอง homePage,bblog-upload,blogmini,blogpost 
const BlogPostCard = ({ content }) => {
  let {up_id,category_id,user_id,up_name, category_name, user_name,user_lastname,user_profile_img, up_description,img_image, time_created,score_count } =
    content;

// TODO: fonction like 
  

  return (
   <section>
     <Link to={`/blog/${up_id}`} className="flex gap-8 items-center border-b border-grey pb-5 mb-4" >
        <div className="blog-post-card w-full">
         
            <div className="card flex gap-2 , items-center mb-7">

            <img 

              src={
                user_profile_img && user_profile_img.startsWith("http")
                  ? user_profile_img
                  : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${user_profile_img}`
              }
              alt={user_name}
            
            className="w-6 h-6 rounded-full" />
            
            <p className=" line-clamp-1">
                {user_name} @{user_lastname}
            </p>
            {/* TODO: for date ไปปง่นรุบแบบ ใน file date.jsx ก่อนจื่งดืงออกมาใช้ */}
            <p className="">{getDay(time_created) }</p>
            </div>

            <p className="blog-title text-xl md:text-2xl">{up_name}</p>

            <p className=" my-3 text-xl leading max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
            {up_description}
            </p>
    {/* FIXME: กดหวใจ  */}
            <div className="like-cate flex gap-2 mt-7">
            <span className="btn-light py-1 px-4">{category_name}</span>
            <span className=" flex ml-4 items-center text-dark-grey"
            //  onClick={handleSubmit}
            >
                 <i className="fi fi-rr-social-network text-xl "></i> 
            </span>
            <span className="  flex items-center gap-2 text-dark-grey">  {score_count} </span>
            </div>
        </div>

        <div className="h-28 aspect-square bg-grey ">
                <img src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${img_image}`} alt="" className="w-full rounded h-full aspect-square object-cover" />
        </div>
    </Link>
   </section>
  );
};
export default BlogPostCard;
