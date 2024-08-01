import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { DataFoods } from "../data/data.component.pupula";
import { GetPopuraRestaurant } from "../function/Restaurants.api";
import Loader from "./loader.component";
import toast, { Toaster } from "react-hot-toast";

const Foods = () => {
  const [data, setData] = useState([]); // เปลี่ยนค่าเริ่มต้นเป็น array ว่าง
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await GetPopuraRestaurant();
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
      setLoading(false);
    }
  };

  // console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <div className="Restaurants w-full h-full">
        <div className="headertitle pt-4 flex items-center justify-center">
          <label className="md:text-3xl text-2xl font-semibold">ເມນູອາຫານເພີ່ມເຕີມ</label>
        </div>
        <hr className="h-2 mt-4 rounded-lg bg-gradient-to-r from-pink-600 to-blue-500" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-4 w-auto h-auto">
          {loading ? (
            <Loader />
          ) : (
            data.map((items, index) => (
              <div
                key={index}
                className="card relative w-full md:w-[calc(33.3333% - 1rem)] lg:w-[calc(25% - 1rem)] h-auto rounded-xl overflow-hidden shadow-xl group mb-3 md:mb-0"
              >
                <Link to={`/page_restaurants/${items.rest_id}`}>
                <img
                  src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${items.rest_image}`}
                  alt={items.rest_name}
                  className="card-img w-full h-full object-cover rounded-xl"
                />

                
                
                <div className="card-body p-10 w-full h-full top-0 right-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1f3d4770] backdrop-blur-sm text-white rounded-xl">
                  <h2 className="card-title textt uppercase text-2xl font-bold">
                    {items.rest_name}
                  </h2>
                  <p className="card-sub-title capitalize text-sm font-medium line-clamp-3">
                    {items.rest_description}
                  </p>

                  <div className="clasStar flex items-center space-x-1 rtl:space-x-reverse ">
                        {Array.from({ length: 5 }, (_, index) => (
                          <i
                            key={index}
                            className={`fi fi-ss-star text-2xl text-center  ${
                              index < items.avg_score
                                ? "text-yellow-300"
                                : "text-gray-200 dark:text-gray-600  "
                            }`}
                          ></i>
                        ))}
                      </div>
                </div>

                </Link>
              </div>
              
            ))
          )}
        </div>

     
      </div>
    </section>
  );
};

export default Foods;