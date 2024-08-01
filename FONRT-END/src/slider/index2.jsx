import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import img1 from "../imgs/food/fd2.jpg";
import img2 from "../imgs/food/fd7.jpg";
import { DataRestaurants } from "../data/data.component.pupula";
import VeviewHotel from "../compunentAother/hotel.review.compunent";
// import Swiper core and required modules
import { ReadById } from "../function/Restaurants.api";
import { Reloadimg } from "../function/image.api";
import { useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  ReloadRating,
  Inserthotels,
  Rlod_detail_rating_hotels,
  LoadAvg_ratingHotels,
} from "../function/Rating.api";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../itemsMui/thomeMui";


const Page_restaurants = () => {
  const params = useParams();
  // console.log(params.id);
  const {
    userAuth: { user_id },
  } = useContext(UserContext);
  // console.log(user_name);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);
  const navigate = useNavigate();

  const [isData, setData] = useState({});
  const [isimg, setimg] = useState([]);
  const [matchingImgNames, setMatchingImgNames] = useState([]);
  const [selectpion, setSlectpion] = useState(null);
  const [isRating, setRating] = useState([]);
  const [AvgRating, setAvgRating] = useState([]);
  const [isDetailRating, setDetailRating] = useState([]);

  //todo หาคาจำนวนคนใหคะแนน
  const scoreColumnCount = isDetailRating.reduce((count, item) => {
    return count + (item.score !== undefined ? 1 : 0);
  }, 0);
  // console.log("จำนวนคอลัมน์ที่มีค่าในคอลัมน์ 'score':", scoreColumnCount);

 // todo score 5.4.3.2
 const scoreFive = isDetailRating.reduce((count, item) => {
  return count + (item.score === 5);
}, 0);
// todo score 5.4.3.2
const scoreFourth = isDetailRating.reduce((count, item) => {
  return count + (item.score === 4);
}, 0);
// todo score 5.4.3.2
const scoreThere = isDetailRating.reduce((count, item) => {
  return count + (item.score === 3);
}, 0);
// todo score 5.4.3.2
const scoreTwo = isDetailRating.reduce((count, item) => {
  return count + (item.score === 2);
}, 0);
// todo score 5.4.3.2
const scoreOne = isDetailRating.reduce((count, item) => {
  return count + (item.score === 1);
}, 0);



  const toggleInput = () => {
    if (!access_token) {
      // ถ้ายังไม่ได้ล็อกอิน ให้เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
      navigate("/signin");
    } else {
      setSlectpion(selectpion ? null : true);
    }
  };
// ดืงข้อมูน rating mashow 
  const loadRating = async () => {
    try {
      const response = await ReloadRating();
      setRating(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Datas = {
        ht_id: params.id,
        user_id: user_id,
        score: selectedRating,
        comment: comment,
      };

      const response = await Inserthotels(Datas);
      console.log(response.data);
      if (response.data === "insert successful") {
        toast.success("ບັນທືກຂໍ້ມູນສຳເລັດແລ້ວ");
      } else {
        toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
      }
      loadData();
      loadImg();
      loadRating();
      loadDetailRating();
      loadAvg_rating();
    } catch (error) {
      console.error(error);
      toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
    }
  };
  // todo loader avgrating 
  const loadAvg_rating = async () => {
    try {
      const avg_rating = await LoadAvg_ratingHotels(params.id);
      if (avg_rating.data && avg_rating.data.length > 0) {
        const { avg_score } = avg_rating.data[0];
        setAvgRating({
          total: avg_score,
        });
      } else {
        // Handle the case where avg_rating data is empty
        console.error("Average rating data is empty");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  

  const loadDetailRating = async () => {
    try {
      const detail_rating_place = await Rlod_detail_rating_hotels(params.id);
      setDetailRating(detail_rating_place.data); // Set entire array
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  // console.log("Rating:", JSON.stringify(isDetailRating));
  // ฟังก์ชันสำหรับโหลดข้อมูล
  const loadData = async () => {
    try {
      const Data = await ReadById(params.id);
      setData(Data.data[0]); // Set place data
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  // console.log(isData);

  // ฟังก์ชันสำหรับโหลดรายการรูปภาพ
  const loadImg = async () => {
    try {
      Reloadimg()
        .then((res) => setimg(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // console.log(isimg);
// เกัยข้อมูนไวตวแปว 
  const [selectedRating, setSelectedRating] = useState(""); // Define selectedRating state
  const [comment, setComment] = useState(""); // Comment
  // Function to handle rating change
  const handleChange = (e) => {
    setSelectedRating(e.target.value);
  };
  // Function to handle comment change
  const handleComment = (e) => {
    setComment(e.target.value);
  };


  // ใช้ useEffect เพื่อโหลดข้อมูลเมื่อ component โหลดเสร็จ
  useEffect(() => {
    loadData(params.id);
    loadImg();
    loadRating();
    loadAvg_rating();
    loadDetailRating();
  }, []);

  // console.log(isData);

  useEffect(() => {
    // ตรวจสอบว่าข้อมูลของ isData และ isimg ถูกโหลดเรียบร้อยแล้วหรือไม่
    if (Object.keys(isData).length !== 0 && isimg.length !== 0) {
      // ดึงชื่อรูปภาพทั้งหมดที่ตรงกันระหว่าง isData.pl_name และ isimg.img_name
      const matchingImgNames = isimg
        .filter((img) => isData.rest_name.includes(img.img_name))
        .map((img) => ({
          img_name: img.img_name,
          img_image: img.img_image,
        }));

      // เซ็ตรายการรูปภาพที่ตรงกันลงใน state
      setMatchingImgNames(matchingImgNames);

      // consolog ผลลัพธ์
      // console.log("Matching Image Names:", matchingImgNames);
    }
  }, [isData, isimg]);

  // slider images
  const [currentItem, setCurrentItem] = useState(0); // เริ่มต้น currentItem เป็น 0
  const images = [img1, img2]; // รายการภาพทั้งหมด

  const nextItem = () => {
    setCurrentItem((currentItem + 1) % images.length); // เปลี่ยน currentItem ไปยังรายการภาพถัดไป
  };

  const prevItem = () => {
    setCurrentItem((currentItem - 1 + images.length) % images.length); // เปลี่ยน currentItem ไปยังรายการภาพก่อนหน้า
  };

  // TODO AuthorMenu
  const IsDataRestaurant = DataRestaurants();
  return (
    <ThemeProvider theme={theme}>
   <Toaster />
    <AnimationWrapper>
      <section>
        {isData && (
          <>
            <div className="Main flex-col">
              {/* TODO: header Title  */}
              <div className="header pl-8">
                <div className="flex font-bold pt-4  items-center gap-4">
                  <i className="fi fi-sr-restaurant "></i>
                  <span className="text-3xl font-bold ">{isData.rest_name}</span>
                </div>
                <div className="icon flex items-center gap-4 p-6 text-2xl ">
                  <h1>ເບີງເພີມເຕີມ</h1>
                  <i className="fi fi-brands-tik-tok text-3xl rounded-full p-2"></i>
                  <i className="fi fi-brands-facebook text-3xl rounded-full  p-2 "></i>
                </div>
              </div>

              <hr className=" bg-Background " />
              {/* TODO: imagefood  */}

              <div className="chillen  flex-col md:flex-row lg:flex gap-6 mt-4 titles relative w-full rounded-xl overflow-hidden border shadow p-1 group ">
                <div className="images flex h-auto w-full ">
                  <img
                    src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                      isData.rest_image
                    }`}
                    alt={isData.rest_name}
                    className=" object-cover rounded-lg shadow-xl"
                  />
                </div>

                {/* TODO: price product  */}
                <div className="titles relative w-full flex-col rounded-xl overflow-hidden  group">
                  {/* TODO: price productDetail  */}
                  <div className="price  flex flex-col md:flex-row lg:flex w-full p-4 gap-4  ">
                    <div className="title-header  items-center w-1/2">
                      <p className="card-title  uppercase text-2xl lg:text-3xl font-bold p-3 md:my-4 ">
                        {isData.rest_name}
                      </p>

                      <p className="price capitalize w-full xl:w-[70%]  md:text-xl text-white bg-gradient-to-r from-purple to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple200  font-medium rounded-lg text-sm px-2  py-2.5 text-center me-2 mb-2">
                        {"ເລີ່ມຕົ້ນ:  " + 0 + "  ກີບ"}
                      </p>
                    </div>

                    <div className="DateOpen font-semibold flex-col md:flex justify-start    w-1/2">
                      <h1 className=" dateopen md:text-2xl  uppercase text-2xl lg:text-3xl font-bold p-3 md:my-4">
                        ເວລາເປີດ-ປິດ
                      </h1>
                      <hr className=" h-2 w-full " />
                      <h1 className="text-xl pl-8 md:text-2xl md:my-2">
                        {isData.rest_open + "AM"}
                      </h1>
                      <h1 className="text-xl pl-8  md:text-2xl ">
                        {isData.rest_close + "PM"}
                      </h1>
                    </div>
                  </div>

                  <hr className=" h-2 mt-2 rounded-lg bg-gradient-to-r  from-pink-600 to-blue-500 " />
                  <div className="price  flex-col w-full ">
                    <div className="font-semibold  items-center p-2 pl-6 flex gap-3">
                      <i className="fi fi-rs-comment-info "></i>
                      <h3 className="font-semibold">ຕິດຕໍ່ສອບຖາມເບີງເຕີມ</h3>
                    </div>
                    <hr className=" h-2 " />

                    <div className="dec p-1 pl-8 flex gap-3">
                      <i className="fi fi-br-link-alt text-xl font-semibold underline">
                        {" "}
                        www.wesitetoria.com
                      </i>
                    </div>
                    <div className="dec p-1 pl-8 flex gap-3">
                      <i className="fi fi-rr-phone-call text-xl font-semibold">
                        {isData.rest_connect}
                      </i>
                    </div>
                  </div>
                  {/* TODO:  desc  */}
                  <div className="price  flex-col w-full ">
                    <div className="font-semibold flex items-center justify-center p-2 pl-6">
                      <h3 className="font-semibold">ຄຳອທິບາຍເພີມເຕີມ</h3>
                    </div>
                    <hr className=" h-2 " />
                    <div className="dec p-2 pl-8">
                      <article>{isData.rest_description}</article>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* image slider vevieq  */}

            <div className="imagesreview ">
              <div
                id="controls-carousel"
                className="relative w-full"
                data-carousel="static"
              >
                {/* Carousel wrapper */}
                <div className="relative mt-4 h-[17rem] overflow-hidden rounded-lg md:h-[550px] ">
                  {/* ใช้ map เพื่อสร้าง <div> สำหรับแต่ละรายการภาพ */}
                  {matchingImgNames.map((items, index) => (
                    <div
                      key={index}
                      className={`duration-700 ease-in-out ${
                        currentItem === index ? "" : "opacity-0"
                      }`}
                      data-carousel-item={
                        currentItem === index ? "active" : null
                      }
                    >
                      <img
                        src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                          items.img_image
                        }`}
                        alt={`Image ${index + 1}`}
                        className="absolute object-cover h-auto block w-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      />
                    </div>
                  ))}
                </div>
                {/* Slider controls */}
                <button
                  type="button"
                  className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  onClick={prevItem}
                  data-carousel-prev
                >
                  {/* Icon and label */}
                  <i className="fi fi-rr-angle-left  text-white   font-bold text-3xl "></i>
                </button>
                <button
                  type="button"
                  className="absolute top-0 end-0 z-30 flex  items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  onClick={nextItem}
                  data-carousel-next
                >
                  {/* Icon and label */}
                  <i className="fi fi-rr-angle-right  text-white font-bold text-3xl "></i>
                </button>
              </div>
            </div>

            {/* // TODO map- locatrion   */}
            <div className="Container-map mt-4">
              <div className="titlemap flex p-4 justify-center items-center font-bold text-2xl ">
                <h1>ແຜນທີ່ນຳທາງ Googlemap</h1>
              </div>
              <div className=" ClassMap relative flex-col justify-center items-center p-1 bg-white border sm:h-[450px] h-[280px] border-gray-200 rounded-lg shadow">
                <iframe
                  src={isData.rest_address}
                  className="w-full mx-auto h-full"
                  width="1200"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Responsive googlemap"
                ></iframe>

                {/* <div className="p-3 absolute left-16 sm:h-min bottom-0"> 
                            <Button variant="contained">View on Google maps</Button>
                          </div> */}
              </div>
            </div>

            {/* //TODO Rating    */}

            <div className="container  rounded-xl border shadow p-2  ">
              <div className="Mainbox h-full w-full flex-col md:flex md:flex-row lg:flex gap-4  overflow-hidden p-2 ">
                <div className="ceatePoint flex-col text-white rounded-lg p-10 bg-Primary w-full h-auto items-center pt-3 md:pt-7 font-semibold text-2xl   ">
                   <div className="pointStar flex justify-center items-center p-2">
                    {/* // todo Avg_rating  */}
                    <p className="text-2xl">
                      {AvgRating && AvgRating.total !== undefined
                        ? Number(AvgRating.total).toFixed(1)
                        : "1"}
                    </p>
                  </div>

                   {/* Shoe star  */}
                  {AvgRating && (
                    <div className="Star flex gap-2 justify-center items-center p-2">
                      {[
                        ...Array(
                          Math.max(Math.floor(Number(AvgRating.total || 1)), 1)
                        ),
                      ].map((_, index) => (
                        <i key={index} className="fi fi-ss-star text-3xl"></i>
                      ))}
                    </div>
                  )}

                 {/*  // todo จำนวนคนใหคะแนน  */}
                  {scoreColumnCount && (
                    <div className="contPoint flex justify-center items-center  p-2">
                      <h4>{scoreColumnCount + ".00"}</h4>
                    </div>
                  )}
                </div>


                {/* // todo เบีงจำนวนกานให้คะแนดาวแต่ ละอัน  */}
                <div className="ceatePoint flex-col text-white pl-4 rounded-lg p-5 bg-Secondary w-full h-auto mt-4 md:mt-0  ">
                  {[5, 4, 3, 2, 1].map((score, index) => (
                    <div
                      key={index}
                      className="pointRange flex pl-4 gap-4 items-center pt-2 "
                    >
                      <span>{score}</span>
                      <i className="fi fi-ss-star"></i>
                      <input
                        type="range"
                        value={
                          (score === 5 && scoreFive) ||
                          (score === 4 && scoreFourth) ||
                          (score === 3 && scoreThere) ||
                          (score === 2 && scoreTwo) ||
                          (score === 1 && scoreOne) ||
                          0
                        }
                        className="w-1/2 "
                        readOnly
                      />
                      <span>
                        {/* นำจำนวนของแต่ละคะแนนมาแสดง */}
                        {(score === 5 && scoreFive && scoreFive + ".00") ||
                          (score === 4 && scoreFourth && scoreFourth + ".00") ||
                          (score === 3 && scoreThere && scoreThere + ".00") ||
                          (score === 2 && scoreTwo && scoreTwo + ".00") ||
                          (score === 1 && scoreOne && scoreOne + ".00") ||
                          "0.00"}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              <div className="flex justify-center rounded-xl w-1/2 h-1/2 bg-blue-gray-400"></div>
            </div>

          {/* // todo  ให้คะแนนดาว */}
          <div className="container-ratingflex flex mt-4 justify-center items-center rounded-xl w-full h-full ">
              <div className="flex mt-4 justify-center items-center rounded-xl w-full h-full font-bold  text-4xl  ">
                <div className="starrtRating w-auto h-auto">
                  <div className="rating">
                    <div className="rating-star  flex justify-center items-center">
                      <Button
                        color="amber"
                        className="font-noto_san_lao text-2xl"
                        onClick={toggleInput}
                      >
                        ໃຫ້ຄະແນນດາວ
                      </Button>
                    </div>

                    {selectpion && ( // Conditionally render components based on the state value
                      <div className="sub-rating  mt-4 justify-center items-center rounded-xl w-full md:w-[660px] h-full font-bold bg-grey text-4xl border shadow p-2">
                        <div className="score rating">
                          <TextField
                            className="w-full"
                            id="filled-select-rating"
                            select
                            label="Select Rating"
                            value={selectedRating} // Make sure this value is valid
                            onChange={(e) => handleChange(e)}
                            variant="filled"
                          >
                            {isRating.map((option, index) => (
                              <MenuItem key={index} value={option.score}>
                                {option.score}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>

                        <div className="comment w-full mt-4">
                          <TextField
                            className="w-full"
                            id="outlined-multiline-static"
                            label="ຄຳຄິດເຫັນ"
                            multiline
                            rows={3}
                            onChange={(e) => handleComment(e)}
                          />
                        </div>
                        <div className="rating-star my-3 flex justify-center items-center">
                          <Button color="green" onClick={handleSubmit}>
                            submit
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

         

                </div>
              </div>
            </div>
            {/* // TODO  ให้คะแนนดาวจบ */}
          {/* // todo user ให้คะแนนดาว  */}

          {isDetailRating.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="detail-rating flex flex-col   justify-start items-start my-2 px-7 rounded-xl p-2 w-full h-full line-clamp-2 border bg-grey"
            >
              <div className="img flex p-2 px-3 mt-2 gap-2">
                <img
                  src={item.user_profile_img}
                  alt=""
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <span className="font-semibold text-xl">{`${item.user_name} ${item.user_lastname}`}</span>
              </div>

              <div className="scroe flex gap-4 font-semibold text-2xl pl-10 ">
                <span>
                  {[...Array(item.score)].map((_, index) => (
                    <i
                      key={index}
                      className="fi fi-ss-star text-xl text-yellow-600 "
                    ></i>
                  ))}
                </span>
                <p>
                  {new Date(item.time).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>

              <div className="coment pl-12">
                <p>{item.commented}</p>
              </div>
            </div>
          ))}
          <div className="btn-mor flex justify-center items-center">
            <button className="btn-dark"> more</button>
          </div>
            {/* // TODO Author hotels  */}

            <VeviewHotel />

            {/* //TODO Athor menu  */}

            <div className="Restaurants w-full h-full">
              <div className="headertitle pt-4 flex items-center justify-center">
                <h2>ເມນູອາຫານເພີ້ມເຕີມ</h2>
              </div>
              <hr className="h-2 mt-4 rounded-lg bg-gradient-to-r from-pink-600 to-blue-500" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-3 pt-4 w-auto h-auto  ">
                {IsDataRestaurant.map((items, index) => (
                  <div
                    key={index}
                    className="card relative w-full md:w-[calc(33.3333% - 1rem)] lg:w-[calc(25% - 1rem)] h-auto rounded-xl overflow-hidden shadow-xl group mb-3 md:mb-0"
                  >
                    <img
                      src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                        items.rest_image
                      }`}
                      alt={items.rest_name}
                      className="card-img w-full h-full object-cover rounded-xl"
                    />
                    <div className="card-body p-10 w-full h-full top-0 right-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1f3d4770] backdrop-blur-sm text-white rounded-xl">
                      <h2 className="card-title textt uppercase text-2xl font-bold ">
                        {items.rest_name}
                      </h2>
                      <p className="card-sub-title capitalize text-sm font-medium">
                        {items.rest_description}
                      </p>
                      <p className="card-ifo text-xl leading-6 my-10">
                        {items.rest_description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </AnimationWrapper>

    </ThemeProvider>
  );
};
export default Page_restaurants ;