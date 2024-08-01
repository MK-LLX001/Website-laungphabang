import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom if needed
import { Datahotel } from "../data/data.component.pupula";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Reload_hotelWithAvg_Score } from "../function/hotel.function.api";

import Loader from "./loader.component";


const Hotel = () => {
  
  const [dataPopula, setDataPopula] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await Reload_hotelWithAvg_Score();
      setDataPopula(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      // Assuming toast is imported and configured for error notifications
      toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
      setLoading(false);
    }
  };

  // console.log("data hotel", JSON.stringify(dataPopula));

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <section>
            <div className="flex-col justify-center text-center">
        <p className="font-bold md:text-3xl text-2xl  my-4">
        ໂຮງແຮມທີ່ສະບາຍປອດໄພລະດັບ Top 
          <span className="text-red font-bold text-2xl md:text-3xl"> ຍອດນິຍົມ </span>
          ທີ່ສຸດໃນຕອນນີ້
        </p>
        <p className="font-bold mb-4 md:text-xl ">
          ຖ້າວ່າທ່ານໄດ້ມາທ່ຽວຫຼວງພະບາງມາພັກເຊົ່ານຳໂຮງແຮມຂອງພວກເຮົາໄດ້
        </p>
      </div>


      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
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
            slidesPerView:4 ,
          },
        }}
      >
        {
        loading ? (
          <Loader />
        ):
        dataPopula.map((items, index) => (
          <SwiperSlide key={index}>
            <div className=" p-4 Maincard max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/detailhotel/${items.ht_id}`}>
              <div className="classImg ">
               
                  <img 
                  className="rounded-t-lg aspect-video" 
                  src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                    items.img_image
                  }`}
                  alt={items.ht_name} />
               
              </div>

              <div className="className pt-3 flex justify-between">
                <Link href="#">
                  <h5 className="mb-2 md:text-2xl text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {items.ht_name}
                  </h5>
                </Link>
                <span >
                <i className="fi fi-sr-parking"></i>
                <span className="backspace"> Packing</span>

                </span>
               
              </div>

              <div className="connect pt-1 flex justify-between font-bold">
                    <h1>{items.ht_connection}</h1>
                    <span>
                    <i className="fi fi-br-wifi"></i>
                    <span className="backspace"> Freewifi</span>
                    </span>
                   

                </div>

              <div className="classDesc line-clamp-4">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {items.ht_description}
                </p>
              </div>


              {/* //  TODO rating avg_score  */}
              <div className="clasStar flex items-center space-x-1 rtl:space-x-reverse ">
                        {Array.from({ length: 5 }, (_, index) => (
                          <i
                            key={index}
                            className={`fi fi-ss-star w-4 h-4  ${
                              index < items.avg_score
                                ? "text-yellow-300"
                                : "text-gray-200 dark:text-gray-600 "
                            }`}
                          ></i>
                        ))}
                      </div>

              <div className="flex items-center justify-between mt-2.5 mb-1">
                <div className="classBtnReadMro">
                  <button
                    
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {Number(items.ht_price).toLocaleString() +" ກີບ"}
                   
                  </button>
                </div>

               
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  ເບີງເພີມເຕີມ
                </span>
              </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative w-full mt-4 flex items-center gap-2 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <Link
              to="/product/review-hotels"
              className="w-full md:w-[20%] text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              ເບີງເພີ້ມເຕີມ
            </Link>
            <hr className="w-1/2 border-black" />
          </div>
    </section>
  );
};
export default Hotel;
