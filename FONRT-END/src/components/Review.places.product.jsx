import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import { DataPlaces  } from "../data/data.component.pupula";
import AnimationWrapper from "../common/page-animation";
import Loader from "./loader.component";
import {LoadAvg_rating} from "../function/Rating.api";
const Places = () => {
  const isGetDatas = DataPlaces();

  // ตรวจสอบว่าข้อมูลได้ถูกโหลดแล้วหรือยัง
  if (!isGetDatas) {
    return <Loader />; // แสดง Loader ถ้ายังไม่มีข้อมูล
  }
 useEffect(() =>{

window.scroll(0,0);

 },[])

  return (
    <AnimationWrapper  >
      <section>
        <div>
          <div className="boxmenu grid grid-cols-2 md:grid-cols-3  gap-4">
            {isGetDatas.map((item, index) => (
              <div
                key={index}
                className="Maincard h-auto max-w-lg  p-2 bg-white border border-gray-200 rounded-lg shadow "
              >
                <AnimationWrapper transition={{ duration: 1, delay: index * 0.1 }} >
                <div className="container-places">
                  <Link to={"/detailplace/" + item.pl_id}>
                    <img
                      className="rounded-2xl p-2 "
                      src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.pl_img_image}`}
                      alt={item.pl_name}
                    />
                    <div className="className flex justify-between items-center">
                      <h5 className="mb-2 line-clamp-1 md:text-2xl text-sm  mt-2 font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.pl_name}
                      </h5>
                      <h5 className=" flex justify-center text-center gap-3 mb-2 md:text-xl text-sm mt-2 font-bold tracking-tight text-white bg-Primary rounded-tl-xl ml-3 w-16">
                        {Number(item.avg_score).toFixed(1)} <i className="fi fi-ss-star w-4 h-4  "></i>
                      </h5>
                    </div>
                    <div className="classDesc h-fit">
                      <p className=" text-sm md:text-xl mb-3 line-clamp-3 md:line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.pl_description}
                      </p>
                    </div>
                    <div className="flex items-center  w-full mt-2.5 mb-1 gap-1">
                      <div className="classBtnReadMro w-full">
                        <h5
                          to={"/detailplace/" + item.pl_id}className="inline-flex w-full items-center justify-center  md:px-3 md:py-1 px-2 py-1   text-sm md:text-xl font-medium text-center text-white bg-blue-700  rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                        >
                          ເບີງເພີມ
                        </h5>
                      </div>
                    
                    </div>
                  </Link>
                </div>
                </AnimationWrapper>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Places;
