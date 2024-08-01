import React from "react";
import { Link } from "react-router-dom";
import { InsertLike ,Reload} from "../function/function.upload.API";
import { getDay } from "../common/date";

//TODO: ไฟท่กงวคอง homePage,bblog-upload,blogmini,blogpost 
const CardAll_Palecs = ({ content }) => {
    let { id,name, price, start_time, end_time,category_name, address, connection, description, image, location, website, convenience, warning, datetime, session, type } =
    content;

    const getLink = (id, type) => {
        switch(type) {
            case 'hotel':
                return `/detailhotel/${id}`;
            case 'restaurant':
                return `/page_restaurants/${id}`;
            case 'activity':
                return `/page_activitys/${id}`;
            case 'place':
                return `/detailplace/${id}`;
            default:
                return `/unknown/${id}`;
        }
    }


  return (
    <div className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
    <Link to={getLink(id, type)} className="flex gap-10 border-b mb-6 md:px-4 border-grey pb-6 items-center">
        <img
            src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${image}`}
            alt="Image"
            className="w-28 h-28 object-cover  flex-none bg-grey"
        />
        <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
            <div>
            <p className=" m-2  rounded-full px-2 font-semibold">
                    {category_name}
                </p>
                <h1 className="blog-title mb-4 hover:underline text-xl md:text-2xl font-medium">
                    {name}
                </h1>
              
                <p className="line-clamp-2">
                    {description}
                </p>
              
            </div>
            <div className="flex gap-6 mt-3 items-center">
                <p className="font-medium">{price}</p>
            </div>
        </div>
    </Link>
</div>
);

};
export default CardAll_Palecs;
