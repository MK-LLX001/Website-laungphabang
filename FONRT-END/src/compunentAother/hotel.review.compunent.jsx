import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { DataHotels, DataSliderDetail } from "../data/data.component.pupula";
import AnimationWrapper from "../common/page-animation";

const VeviewHotel = () => {
  const isGetData = DataHotels();
  const navigate = useNavigate();

  if (!isGetData) {
    return <Loader />;
  }

  const handleHotelClick = (ht_id) => {
    navigate(`/detailhotel/${ht_id}`);
    window.location.reload(); // This line ensures the page reloads
  };

  return (
    <AnimationWrapper>
      <div className="Mainbox-review pt-7 mb-7">
        <div className="mt-7 flex-col justify-center text-center">
          <h1 className="font-bold md:text-4xl text-2xl my-4 line-clamp-2">
            ໂຮງແຮມທີ່ຫນ້າສົນໃຈ
            <span className="text-red font-bold md:text-4xl text-2xl"> ຍອດນິຍົມ </span>
            ທີ່ສຸດໃນຕອນນີ້
          </h1>
        </div>

        <Swiper
          spaceBetween={7}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1127: {
              slidesPerView: 3,
            },
          }}
        >
          {isGetData.map((items, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleHotelClick(items.ht_id)}
                className="Mainbox h-auto w-[100%]  flex-col mt-5 md:flex-row lg:flex gap-4 rounded-xl overflow-hidden border shadow p-2 cursor-pointer"
              >
                <div className="ceatePoint w-auto">
                 
                    <img
                      className=" object-cover "
                      src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${items.img_image}`}
                      alt={items.ht_name}
                    />
                  
                </div>

                <div className="ceatePoint flex justify-center items-center rounded-lg w-auto  pt-7">
                  <div className="className flex-col justify-center items-center ">
                    <h5 className="md:text-2xl text-xl line-clamp-1 flex justify-center items-center font-bold tracking-tight text-gray-900">
                      {items.ht_name}
                    </h5>
                    <p className="line-clamp-3 mb-3 font-normal">
                      {items.ht_description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </AnimationWrapper>
  );
};

export default VeviewHotel;
