import React, { useState, useEffect } from "react";
import { Reload } from "../function/function.upload.API";
import AnimationWrapper from "../common/page-animation";
import Loader from "./loader.component";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const PopuraReviewUpload = () => {
  const [isimg, setimg] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await Reload();
      setimg(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(isimg);

  return (
    <section>
      <AnimationWrapper>
        <div className="Restaurants w-full h-full">
          <div className="headertitle pt-4 flex items-center justify-center">
            <label className="md:text-3xl text-2xl font-semibold">ຮູບພາບທີ່ຄົນມາຍຽມຊົມລີວິວ</label>
          </div>
          <hr className="h-1 mt-4 rounded-lg bg-gradient-to-r from-pink-600 to-blue-500" />

          <div>
            <div className="boxmenu grid grid-cols-2 md:grid-cols-4  gap-4 mt-4 ">
              {isimg.slice(0,4).map((item, index) => (
                <div
                  key={index}
                  className="Maincard h-auto max-w-lg  p-2 bg-grey/50 border border-gray-300 rounded-lg shadow-md "
                >
                  <div className="container-places">
                    <Link to={"/blog/" + item.up_id}>
                      <div className="className flex items-center justify-between">
                      <div className="flex gap-3 p-2">
                      <img
                         src={
                          item.user_profile_img && item.user_profile_img.startsWith("http")
                            ? item.user_profile_img
                            : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.user_profile_img}`
                        }
                          alt={item.user_name}
                          className="w-14 h-14 rounded-full"
                        />

                        <h5 className="mb-2 uppercase md:text-2xl text-sm  mt-2 font-bold tracking-tight text-gray-900 dark:text-white">
                          {item.up_name}
                        </h5>
                      </div>
                          <div>
                           <h1><i className="fi fi-rr-menu-dots-vertical font-bold text-xl"></i></h1>
                          </div>

                      </div>

                      <img
                        className="  aspect-auto"
                        src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                          item.img_image
                        }`}
                        alt={item.up_name}
                      />

                      <div className="classDesc h-fit mt-2">
                        <p className="mb-3 line-clamp-3 md:line-clamp-3 font-normal text-gray-700 ">
                          {item.up_description}
                        </p>
                      </div>
                      <div className="flex items-center  w-full mt-2.5 mb-1 gap-1">
                        <div className="classBtnReadMro w-full">
                          <h5 className="flex pl-2 md:pl-4  gap-3 ">
                          <i className="fi fi-ss-heart text-xl"></i> {item.score_count}
                          </h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full mt-4 flex items-center gap-2 uppercase text-black font-bold">
            <hr className="w-1/2 border-black/50" />
            <Link
              to="/homepageupload"
              className="w-full md:w-[20%] text-dark-grey  hover:underline md:text-2xl font-medium  text-sm text-center "
            >
              ເບີງເພີ້ມເຕີມ
            </Link>
            <hr className="w-1/2 border-black/50" />
          </div>
        </div>
      </AnimationWrapper>
    </section>
  );
};

export default PopuraReviewUpload;
