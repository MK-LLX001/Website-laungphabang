import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// Activity 
import yoga from "../imgs/Logo/yoga.png";
import rice from "../imgs/Logo/rice.png";
import horse from "../imgs/Logo/horse.png";
import cycling from "../imgs/Logo/cycling.png";
import chef from "../imgs/Logo/chef.png";

import AnimationWrapper from "../common/page-animation";

export const DataActivity = [
  {
    A_image: yoga,
    A_name: "ໂຢຄະ",
  },
  {
    A_image: rice,
    A_name: "ປູກເຂົ້າ",
  },
  {
    A_image: horse,
    A_name: "ຂີ່ມ້າ",
  },
  {
    A_image: cycling,
    A_name: "ຂີ່ລົດຖີບທົວພູເຂົາ",
  },
  {
    A_image: chef, 
    A_name: "ຮຽນເຮັດອາຫານ",
  },
];

const Activity = () => {
  const navigate = useNavigate();

  const handleImageClick = (searchQuery) => {
    navigate(`/Btn-search/${searchQuery}`);
  };

  return (
    <AnimationWrapper>
      <div className="py-4 px-[4vw] md:px-[7vw] lg:px-[10vw]">
        <div className="relative w-full mt-10 flex items-center gap-2 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p className="w-full md:w-[20%] text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            ACTIVITY POPULA
          </p>
          <hr className="w-1/2 border-black" />
        </div>

        <Swiper spaceBetween={4} slidesPerView={5}>
          {DataActivity.map((items, index) => (
            <SwiperSlide key={index}>
              <div className="BoxActy py-4">
                <div className="chilenActy gap-2 h-auto w-auto p-1 lg:w-[90%] bg-grey border border-gray-200 rounded-lg shadow">
                  <div className="classImg flex justify-center items-center mt-1">
                    <img
                      className=" md:w-32 md:h-32  w-10 h-10 cursor-pointer"
                      src={items.A_image}
                      alt={items.A_name}
                      onClick={() => handleImageClick(items.A_name)}
                    />
                  </div>
                  <div className="flex justify-center items-center ">
                    <p className="mt-2 text-[10px] font-medium md:text-2xl tracking-tight">
                      {items.A_name}
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

export default Activity;
