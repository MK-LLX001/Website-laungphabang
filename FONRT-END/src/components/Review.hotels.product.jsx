import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataHotels } from "../data/data.component.pupula";
import Loader from "./loader.component";
import AnimationWrapper from "../common/page-animation";

const Hotel_products = () => {
  const isGetData = DataHotels();

  // ตรวจสอบว่าข้อมูลได้ถูกโหลดแล้วหรือยัง
  if (!isGetData) {
    return <Loader />; // แสดง Loader ถ้ายังไม่มีข้อมูล
  }

  useEffect(() =>{

    window.scroll(0,0);
    
     },[])
     

  return (
    <AnimationWrapper>
      <section>
        <div>
          <div className="boxmenu grid grid-cols-2 md:grid-cols-3  gap-4">
            {isGetData.map((item, index) => (
              <div
                key={index}
                className="Maincard h-auto max-w-lg p-2 bg-white border border-gray-200 rounded-lg shadow"
              >
                <AnimationWrapper transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="container-Hotels_products">
                  <Link to={"/detailhotel/" + item.ht_id}>
                    <img
                      className="rounded-t-lg"
                      src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.img_image}`}
                      alt={item.ht_name}
                    />
                    <div className="className flex justify-between p-1 items-center">
                      <h5 className=" line-clamp-1 md:text-xl text-sm mt-2 font-bold tracking-tight text-gray-900 ">
                        {item.ht_name}
                      </h5>
                      <p className=" flex justify-center text-center items-center gap-1 bg-Primary w-auto px-2 rounded-tl-xl text-sm md:text-xl text-white font-semibold">
                         {Number(item.avg_score).toFixed(1) } <i className="fi fi-ss-star   "></i>
                      </p>
                    </div>
                    <div className="classDesc h-auto">
                      <p className="mb-3 text-sm md:text-xl line-clamp-3 md:line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.ht_description}
                      </p>
                    </div>
                    <div className="classDesc h-auto flex justify-around items-center gap-3 text-xl">
                   
                  <p className="  ">
                  <i className="fi fi-bs-wifi md:text-xl text-sm w-14  "></i>
                  </p>
                  <p className="">
                  <i className="fi fi-bs-circle-p md:text-xl text-sm"></i>
                  </p>
                  <p className=" ">
                  <i className="fi fi-bs-swimmer md:text-xl text-sm"></i>
                  </p>

                    </div>


                    <div className="flex items-center w-full mt-2.5 mb-1 gap-1">
                      <div className="classBtnReadMro w-full">
                        <h5
                          
                          className="inline-flex w-full items-center justify-center md:px-3 md:py-1 px-2 py-1 text-sm md:text-xl font-medium text-center text-white bg-Primary rounded-xl hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-blue-300"
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

export default Hotel_products;
