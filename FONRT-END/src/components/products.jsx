import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";


const Places_components = () => {
  return (
    <AnimationWrapper>
      <section>
        <div className="sticky top-[80px] z-30 flex-col">
          <div className="flex-col w-full">
           
            <hr className="border-gray-300 -ml-6 mb-8 mr-6" />
            <div className="flex gap-3 w-full items-center justify-center">
              <Link to="/product/review-allproducts" className="flex md:text-xl text-sm font-semibold border-b py-2 rounded-md">
                ທັງໝົດ
              </Link>
              <Link to="/product/review-places" className="flex md:text-xl text-sm font-semibold border-b py-2 rounded-md">
                ສະຖານທີ່
              </Link>
              <Link to="/product/review-activitys" className="flex md:text-xl text-sm font-semibold border-b py-2 rounded-md">
                ກີດຈະກຳ
              </Link>
              <Link to="/product/review-hotels" className="flex md:text-xl text-sm font-semibold border-b py-2 rounded-md ">
                ໂຮມແຮມ
              </Link>
              <Link to="/product/review-restaurants" className="flex md:text-xl text-sm font-semibold border-b py-2 rounded-md ">
                ຮ້ານອາຫານ
              </Link>
              <Link to="/product/review-watanatham" className="flex md:text-xl text-sm font-semibold border-b py-2 rounded-md ">
                ວັດທະນາທຳ
              </Link>
            </div>
            <hr className="mt-3"/>
          </div>
          <div className="max-md:-mt-8 mt-5 w-full h-cover">
            <Outlet />
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Places_components;





