import { Link } from "react-router-dom";
import { getDay, getDayOfWeek } from "../common/date";

const NotificationCard = ({ data, index, notificationState }) => {
  const {
    up_id,
    user_id,
    user_profile_img,
    user_name,
    user_lastname,
    up_name,
    up_description,
    img_image,
    time_created,
    lk_time,
    notification_type,
  } = data;
  
  console.log(user_id)

  const upIdString = up_id ? String(up_id).trim() : '';  // Ensure up_id is a string and not null/undefined

  return (
    <div className="p-6 border-b border-grey border-l-black border-l-2 border-opacity-50">
      <div className="flex gap-5 mb-2">
        <img
         src={
            user_profile_img.startsWith("http")
              ? user_profile_img
              : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${user_profile_img}`
          }
          alt={"user_profile_img"}
          className="w-14 h-14 flex-none rounded-full"
        />
        <div className="names w-full ">
          <h1 className="font-medium text-xl text-dark-grey">
            {/* <span className="lg:inline-block hidden capitalize">
              {user_name.trim()} {user_lastname.trim()}
            </span> */}
            <Link to={`/user/${user_id}`} className="mx-1 text-black text-xl font-semibold hover:underline hover:opacity-70"> {user_name.trim() +" "+ user_lastname.trim()} </Link>
            <span className="font-normal"> 
              Like your post
            </span>
          </h1>
          <p className="">
            {getDayOfWeek(lk_time)} {getDay(lk_time)}
          </p>

          <div className="">
            <Link to={`/blog/${upIdString}`} className="flex gap-3 items-center">
              <img src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${img_image}`} 
                alt="image" className="w-12 h-12 rounded-full flex-none" />
              <span className="md:text-xl font-medium hover:underline ">{up_name}</span>
            </Link>
            <p className=" line-clamp-2 pl-4">{up_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
