import { DataRestaurants } from "../data/data.component.pupula";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom

const Restaurants_review_Othor = () => {
  const IsDataRestaurant = DataRestaurants();
  const navigate = useNavigate();

  const handleHotelClick = (rest_id) => {
    navigate(`/page_restaurants/${rest_id}`);
    window.location.reload(); // This line ensures the page reloads
  };

  return (
    <div className="Restaurants w-full h-full flex flex-col items-center">
      <div className="headertitle pt-4 flex items-center justify-center">
        <p className=" text-2xl md:text-3xl font-semibold">ເມນູອາຫານເພີ່ມເຕີມ</p>
      </div>
      <hr className="h-2 mt-4 rounded-lg bg-gradient-to-r from-pink-600 to-blue-500 w-full" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-4 w-full ">
        {IsDataRestaurant.map((items, index) => (
          <div
            onClick={() => handleHotelClick(items.rest_id)}
            key={index}
            className="card relative w-full h-auto rounded-xl overflow-hidden shadow-xl group mb-3 "
          >
            <img
              src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${items.rest_image}`}
              alt={items.rest_name}
              className="card-img w-full h-full object-cover rounded-xl"
            />
            <div className="card-body p-5 w-full h-full top-0 right-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1f3d4770] backdrop-blur-sm text-white rounded-xl">
              <p className="card-title line-clamp-1 text-xl uppercase md:text-2xl font-bold">
                {items.rest_name}
              </p>
              <p className="card-sub-title capitalize text-sm line-clamp-3 font-medium">
                {items.rest_description}
              </p>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants_review_Othor;
