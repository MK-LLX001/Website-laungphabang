import React from 'react'
import { Link,useNavigate } from "react-router-dom"; // Import Link from react-router-dom if needed
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { DataPlaces } from "../data/data.component.pupula";
import AnimationWrapper from "../common/page-animation";
import Loader from "./loader.component";

export default function AuthorplaceFood() {

  const isGetDatas = DataPlaces();

  // ตรวจสอบว่าข้อมูลได้ถูกโหลดแล้วหรือยัง
  if (!isGetDatas) {
    return <Loader />; // แสดง Loader ถ้ายังไม่มีข้อมูล
  }

  const navigate = useNavigate();


  const handleHotelClick = (pl_id) => {
    navigate(`/detailplace/${pl_id}`);
    window.location.reload(); // This line ensures the page reloads
  };

  return (

    <AnimationWrapper>
    <div className="py-4 px-[5vw] md:px-[7vw] lg:px-[10vw]">
      

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        
      >
        { isGetDatas.slice(1, 8).map((items, index) => (
          <SwiperSlide key={index}>
            <div className="BoxActy max-w-sm bg-white  h-auto w-auto border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
              <div className="chilenActy p-2  h-auto w-auto ">
            
              <Link  onClick={() => handleHotelClick(items.pl_id)} >
                <div className="classImg">
                 
                <img
                        className="rounded-2xl p-1 aspect-auto  "
                        src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                          items.pl_img_image
                        }`}
                        alt={items.pl_name}
                      />
                 
                </div>

                <div className="className">
                  <Link to="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {items.pl_name}
                    </h5>
                  </Link>
                </div>

                <div className="classDesc">
                  <p className="line-clamp-3 mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {items.pl_description}
                  </p>
                </div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </AnimationWrapper>
    
  )
}
