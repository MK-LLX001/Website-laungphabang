import React from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import { DataPlaces  } from "../data/data.component.pupula";
import AnimationWrapper from "../common/page-animation";
import Loader from "./loader.component";
import {LoadAvg_rating} from "../function/Rating.api";

const Reviewphetsakan = () => {
  const Watanatham = DataPlaces();

  const isGetDatas = Watanatham.filter(item => item.category_name === 'ເທດສະການ');

  console.log(isGetDatas);
  // ตรวจสอบว่าข้อมูลได้ถูกโหลดแล้วหรือยัง
  if (!isGetDatas) {
    return <Loader />; // แสดง Loader ถ้ายังไม่มีข้อมูล
  }


  return (
    <AnimationWrapper>
      <section>
        <div>
          <div className="boxmenu grid grid-cols-2 md:grid-cols-3  gap-4">
            {isGetDatas.map((item, index) => (
              <div
                key={index}
                className="Maincard h-auto max-w-lg  p-2 bg-white border border-gray-200 rounded-lg shadow "
              >
                <div className="container-places">
                  <Link to={"/detailplace/" + item.pl_id}>
                    <img
                      className="rounded-t-lg "
                      src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.pl_img_image}`}
                      alt={item.pl_name}
                    />
                    <div className="className">
                      <h5 className="mb-2 md:text-2xl text-sm  mt-2 font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.pl_name}
                      </h5>
                    </div>
                    <div className="classDesc h-fit">
                      <p className="mb-3 line-clamp-3 md:line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.pl_description}
                      </p>
                    </div>
                    <div className="flex items-center  w-full mt-2.5 mb-1 gap-1">
                      <div className="classBtnReadMro w-full">
                        <Link
                          to={"/detailplace/" + item.pl_id}
                          className="inline-flex w-full items-center justify-center  md:px-3 md:py-1 px-2 py-1   text-sm md:text-xl font-medium text-center text-white bg-blue-700  rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                        >
                          ເບີງເພີມ
                        </Link>
                      </div>
                      <div className="clasStar flex w-full items-center space-x-1 rtl:space-x-reverse ">
                        <span 
                          className="inline-flex gap-1  w-full items-center justify-center  md:px-3 md:py-1 px-2 py-1   text-sm md:text-xl font-medium text-center text-white bg-dark-grey  rounded-tl-2xl rounded-br-2xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                          <i className="fi fi-ss-star w-4 h-4 pr-1 text-yellow-300 "></i>{" "}
                          4.5
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Reviewphetsakan;
