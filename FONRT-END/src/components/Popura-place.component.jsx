import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import AnimationWrapper from "../common/page-animation";
import { GetplaceAvg_Score5_4 } from "../function/place.function.Api";
import Loader from "./loader.component";



const PlacePopula = () => {
  const [dataPopula, setDataPopula] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log(dataPopula);

  const fetchData = async () => {
    try {
      const response = await GetplaceAvg_Score5_4();
      setDataPopula(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      // Assuming toast is imported and configured for error notifications
      toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

// const GsapTo = () => {
           
//   useGSAP (() =>{
//     gsap.to('box-cards',{
//       x:250,
//     })
//   })

// }


  return (
    <AnimationWrapper>
      <div className="pt-10 py-4 px-[5vw] md:px-[7vw] lg:px-[10vw]">
        <div className="flex-col justify-center text-center">
          <p className="font-bold md:text-3xl text-2xl  my-4">
            ແຫ່ງທອງທຽວທີ່
            <span className="text-red font-bold md:text-3xl text-2xl">ຍອດນິຍົມ</span>
            ທີ່ສຸດໃນຕອນນີ້
          </p>
          <p className="font-bold mb-3 md:text-xl text-sm">
           ຫ້າມພາດທີ່ຈະມາທ່ຽວຊົມເມື່ອທ່ານໄດ້ມາຍຽມຍາມ "ຫຼວງພະບາງ" 
          </p>
          {/* <h1>{GsapTo}</h1> */}
        </div>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={15}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            0: {
              slidesPerView: 2,
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
          {loading ? (
            <Loader />
          ) : (
            dataPopula &&
            dataPopula.map((item,index) => (
              <SwiperSlide key={index}>
                <div id="box-cards" className="Maincard h-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Link to={`/detailplace/${item.pl_id}`}>
                    <div className="classImg h-auto">
                      <img
                        className="rounded-t-lg aspect-auto md:h-52"
                        src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                          item.pl_img_image
                        }`}
                        alt={item.pl_name}
                      />
                    </div>
                    <div className="className mt-2">
                      <h5 className="mb-2 text-xl md:text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.pl_name}
                      </h5>
                    </div>
                    <div className="classDesc md:line-clamp-4 line-clamp-3 ">
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm md:text-xl">
                        {item.pl_description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2.5 mb-2">
                      <Link
                        to={`/detailplace/${item.pl_id}`}
                        className="inline-flex items-center md:px-3 px-2 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                      >
                        ລາຍລະອຽດ
                      
                      </Link>
                      <div className="clasStar flex items-center md:space-x-1 space-x-[2px] rtl:space-x-reverse ">
                        {Array.from({ length: 5 }, (_, index) => (
                          <i
                            key={index}
                            className={`fi fi-ss-star w-4 h-4  ${
                              index < item.avg_score
                                ? "text-yellow-300"
                                : "text-gray-200 dark:text-gray-600 "
                            }`}
                          ></i>
                        ))}
                      </div>
                     
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>

        <div className="relative w-full mt-4 flex items-center gap-2 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <Link
            to="/product/review-allproducts"
            className="w-full md:w-[20%] text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            ເບີງເພີ້ມເຕີມ
          </Link>
          <hr className="w-1/2 border-black" />
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default PlacePopula;
