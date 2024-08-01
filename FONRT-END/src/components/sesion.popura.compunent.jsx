import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom if needed
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import AnimationWrapper from "../common/page-animation";
import { Reload_placeWithAvg_Score } from "../function/place.function.Api";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { theme } from "../itemsMui/thomeMui";
import { createTheme, ThemeProvider } from "@mui/material/styles";




const Sesion = () => {
  const [isGetData, setGetdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // state สำหรับเก็บคำค้นหา
  const [filteredData, setFilteredData] = useState([]); // state สำหรับเก็บข้อมูลที่ถูกกรอง

  const FetchData = async () => {
    try {
      const res = await Reload_placeWithAvg_Score();
      setGetdata(res.data);
      setFilteredData(res.data); // ตั้งค่า filteredData เป็นข้อมูลที่ดึงมา
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(isGetData);
  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    const results = isGetData.filter(place =>
      place.sesion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, isGetData]); // อัปเดตผลลัพธ์เมื่อ searchTerm หรือ isGetData เปลี่ยนแปลง

  return (
   <ThemeProvider theme={theme}>

    <AnimationWrapper>

      <div className="py-4 px-[5vw] md:px-[7vw] lg:px-[10vw]">
        <div className="flex-col justify-center text-center">
          <h1 className="font-bold md:text-3x text-2xl my-4 line-clamp-2">
            The best time to visit Louang Prabang
            <span className="text-red font-bold text-3xl"> ຍອດນິຍົມ</span>
            ທີ່ສຸດໃນຕອນນີ້
          </h1>
          <p className="font-bold mb-4 line-clamp-3">
            ລະດູການຫນ້າທ່ຽວໃນຫຼວງພະບາງ 
          </p>
        </div>

        <InputLabel id="search-label" className="text-sm" >ເລືອກSesion</InputLabel>
        <Select
          className="w-1/2"
          labelId="search-label"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <MenuItem value="">
            <em>ທັງໝົດ</em>
          </MenuItem>
          <MenuItem value="ລະດູຝົນ">ລະດູຝົນ</MenuItem>
          <MenuItem value="ລະດູແລ້ງ">ລະດູແລ້ງ</MenuItem>
          <MenuItem value="ໄດ້ທູກລະດູການ">ໄດ້ທູກລະດູການ</MenuItem>
          
          {/* เพิ่มตัวเลือกเพิ่มเติมตามที่ต้องการ */}
        </Select>

        {filteredData.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
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
            {filteredData.map((items, index) => (
              <SwiperSlide key={index}>
                <div className="BoxActy py-4 gap-4">
                  <div className="chilenActy p-4 max-w-sm bg-white h-auto border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/detailplace/${items.pl_id}`}>
                      <div className="classImg">
                        <img
                          className="rounded-t-lg w-full aspect-video md:h-52"
                          src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${items.pl_img_image}`}
                          alt={items.pl_name}
                        />
                      </div>

                      <div className="className">
                        <h5 className="mb-2 mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {items.pl_name}
                        </h5>
                      </div>

                      <div className="classDesc">
                        <p className="line-clamp-3 mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {items.pl_description}
                        </p>
                      </div>

                      <div className="clasStar flex items-center space-x-1 rtl:space-x-reverse">
                        {Array.from({ length: 5 }, (_, index) => (
                          <i
                            key={index}
                            className={`fi fi-ss-star w-4 h-4 ${
                              index < items.avg_score
                                ? "text-yellow-300"
                                : "text-gray-200 dark:text-gray-600"
                            }`}
                          ></i>
                        ))}
                      </div>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <h2 className="text-center text-red-500 mt-4">ຂໍອະໄພບໍ່ມີໃນລະບົບ</h2>
        )}
      </div>
    </AnimationWrapper>

    </ThemeProvider>
  );
};

export default Sesion;
