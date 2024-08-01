import { Link } from "react-router-dom";
import { getDay } from "../common/date";


//TODO: ไฟท่กงวคอง homePage,bblog-upload,blogmini,blogpost ใชแทนนีง teeding
const MinimalBlogPost =({ items , index })=> {

    let { up_id,category_id,user_id,up_name, category_name, user_name,user_lastname,user_profile_img, up_description,img_image, time_created,lk_score } = items;
    return (

        <Link to={`/blog/${up_id}`}  className="flex gap-5 mb-8" >
            <h1 className="blog-index ">{index < 10 ? "0" + (index + 1) : index }</h1>

            <div>
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
                    {/* TODO: for date ยังบ่แล้วไปทำfunction mai if you have valable date 1:12:0 ep3 */}
                    <p className="">{getDay(time_created)}</p>
                </div>
                <h1 className="blog-title">{up_name}</h1>
            </div>
        </Link>
    );
}
export default MinimalBlogPost;