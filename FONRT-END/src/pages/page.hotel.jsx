import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

import VeviewHotel from "../compunentAother/hotel.review.compunent";
// import Swiper core and required modules
import { ReadById } from "../function/hotel.function.api";
import { Reloadimg } from "../function/image.api";
import { Link, useParams } from "react-router-dom";
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
  GetRatingHotelsById,
  Remove,
} from "../function/Rating.api";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../itemsMui/thomeMui";
import { Carousel } from "@material-tailwind/react";

import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Restaurants_review_Othor from "../compunentAother/Restaurants-review";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';



const DetaiFood_Hotel = () => {
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


  // ดืงข้อมูน rating mashow
  const loadRating = async () => {
    try {
      const response = await ReloadRating();
      setRating(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
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
      const hotelData = await ReadById(params.id);
      setData(hotelData.data[0]); // Set place data
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



  // ใช้ useEffect เพื่อโหลดข้อมูลเมื่อ component โหลดเสร็จ
  useEffect(() => {
    window.scrollTo(0, 0);
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
        .filter((img) => isData.ht_name.includes(img.img_name))
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




  
// todo submitrating 
const [ratingValue, setRatingValue] = useState(0);
const [showCommentBox, setShowCommentBox] = useState(false);
const [comments, setComments] = useState("");

const handleRatingChange = (event, newValue) => {
  if (!access_token) {
 return  toast.error("ກະຮຸນາລ໊ອກອີນເຂົ້າສູ່ລະບົບກ່ອນ");
  //  return navigate("/signin");
  }

  setRatingValue(newValue);
  setShowCommentBox(true); // แสดงกล่องคอมเมนต์เมื่อให้คะแนนเสร็จ
};

const handleSubmitRating = async () => {
  if (!ratingValue) {
    return toast.error("ກະຮຸນາໃຫ້ຄະແນນກ່ອນ");
  }

  

  console.log(ratingValue + comments)

  try {
    const Datas = {
      ht_id: params.id,
      user_id: user_id,
      score: ratingValue,
      comment: comments,
    };

    const response = await Inserthotels(Datas)

    if (response.status === 200) {
      toast.success("ໃຫ້ຄະແນນດາວສຳເລັດແລ້ວ");
      setComments(""); // เคลียร์กล่องคอมเมนต์
      setRatingValue(0); // รีเซ็ตคะแนน
      setShowCommentBox(false); // ซ่อนกล่องคอมเมนต์
      loadImg();
      loadRating();
      loadAvg_rating();
      loadDetailRating();
    } else {
      toast.error("ເກີດຄວາມຜິດພາດໃຫ້ຄະແນນ ແລະ ຄຳເຫັນ.");
    }
  } catch (error) {
    console.error(error);
    toast.error("ເກີດຄວາມຜິດພາດໃຫ້ຄະແນນ ແລະ ຄຳເຫັນ.");
  }
};




 
    const [open_rating, setOpen_rating] = useState(false);
    const handleOpen_rating = () => setOpen_rating(!open_rating);


// console.log("idrest:"+JSON.stringify(IsDataRestaurant));

 // todo: edit rating and delete star

//  console.log("detailRatingByUser"+JSON.stringify(DetailRatingUserById)) 
const RatingbyUser = isDetailRating.filter(item => item.user_id === user_id || item.ht_id === params.id);
// console.log("rating by id "+JSON.stringify(RatingbyUser));


 const [OpenEdit, setOpenEdit] = useState(false);
 const handleOpenEdit = () => setOpenEdit(!OpenEdit);

 // todo check user_id has in the tb__detailrating from varible isDeatailRating

 const handleRemove = async (id) => {
   Swal.fire({
     title: "ທ່ານຕ້ອງການຈະລົບຂໍ້ມູນແທ້ຫວາ",
     text: "ທ່ານຈະບໍ່ສາມາດຍົກເລີກການນຳເນີນງານນີ້ໄດ້!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#d33",
     cancelButtonColor: "#3085d6",
     confirmButtonText: "ໂດຍ, ລືບຂໍ້ມູນ!",
   }).then((result) => {
     if (result.isConfirmed) {
       Remove(id)
         .then((res) => {
          //  console.log(res);
           loadImg();
           loadRating();
          
           loadAvg_rating();
           loadDetailRating();
         
           toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
         })
         .catch((err) => {
           console.log(err);
           toast.error("ເກີດຂໍ້ຜິດຜາດໃນການລືບຂໍ້ມູນ");
         });
     }
   });
 };

 // todo: edit rating and delete end

 const renderRatings = () => {
   if (access_token === null) {
     return isDetailRating.map((item, index) => (
       <div
         key={index}
         className="detail-rating flex flex-col justify-start items-start my-2 px-7 rounded-xl p-2 w-full h-full line-clamp-2 border bg-grey"
       >
         <div className="img flex p-2 px-3 mt-2 gap-2">
           <img
             src={
               item.user_profile_img.startsWith("http")
                 ? item.user_profile_img
                 : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                     item.user_profile_img
                   }`
             }
             alt={item.user_name}
             className="w-16 h-16 object-cover rounded-xl"
           />
           <span className="font-semibold text-xl">{`${item.user_name} ${item.user_lastname}`}</span>
         </div>
         <div className="scroe flex gap-4 font-semibold text-2xl pl-10 ">
           <span>
             {[...Array(item.score)].map((_, index) => (
               <i
                 key={index}
                 className="fi fi-ss-star text-xl text-yellow-600"
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
     ));
   } else {
     return RatingbyUser.slice(0, 3).map((item, index) => (
       <div
         key={index}
         className="detail-rating flex flex-col justify-start items-start my-3 rounded-xl p-2 w-full h-full line-clamp-2 border bg-grey"
       >
         <div className="boxDetailrating flex justify-between w-full relative">
           <div className="rating flex">
             <div className="img flex">
               <img
                 src={
                   item.user_profile_img.startsWith("http")
                     ? item.user_profile_img
                     : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                         item.user_profile_img
                       }`
                 }
                 alt={item.user_name}
                 className="w-16 h-16 aspect-square rounded-xl"
               />
             </div>
             <div className="img flex-col p-2 px-3 mt-2 gap-4">
               <div className="flex gap-3">
                 <span className="font-semibold text-xl">{`${item.user_name} @${item.user_lastname}`}</span>
                 <p className="font-semibold text-xl">
                   {new Date(item.time).toLocaleDateString("en-US", {
                     year: "numeric",
                     month: "2-digit",
                     day: "2-digit",
                   })}
                 </p>
               </div>
               <div className="scroe flex gap-4 font-semibold text-2xl">
                 <span>
                   {[...Array(item.score)].map((_, index) => (
                     <i
                       key={index}
                       className="fi fi-ss-star text-xl text-yellow-600"
                     ></i>
                   ))}
                 </span>
               </div>
               <div className="coment">
                 <p>{item.commented}</p>
               </div>
             </div>
           </div>
           <div className="boxdeleteand update flex items-center pr-3">
             <Link onClick={handleOpenEdit}>
               <i className="fi fi-br-menu-dots-vertical text-2xl"></i>
             </Link>
             {OpenEdit && (
               <AnimationWrapper transition={{ duration: 1, delay: 0.2 }}>
                 <div className="absolute right-7 bottom-0 top-0 flex items-center justify-center">
                   <div className="p-3 text-center items-center">
                     <button
                       onClick={() => handleRemove(item.detail_id)}
                       className="flex justify-center items-center text-center bg-red p-1 rounded-md gap-2 w-20"
                     >
                       <i className="fi fi-br-cross-small"></i> Delete
                     </button>
                     <button className="flex justify-center items-center text-center bg-blue-500 p-1 rounded-md mt-2 gap-2 w-20">
                       <i className="fi fi-rr-edit"></i> Edit
                     </button>
                   </div>
                 </div>
               </AnimationWrapper>
             )}
           </div>
         </div>
       </div>
     ));
   }
 };




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
                    <span className="text-3xl font-bold ">
                      {isData.ht_name}
                    </span>
                  </div>
                  <div className="icon flex items-center gap-4 p-6 text-2xl ">
                    <h1>ເບີ່ງເພີ່ມເຕີມ</h1>
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
                        isData.img_image
                      }`}
                      alt={isData.ht_name}
                      className=" object-cover rounded-lg shadow-xl"
                    />
                  </div>

                  {/* TODO: price product  */}
                  <div className="titles relative w-full flex-col rounded-xl overflow-hidden  group">
                    {/* TODO: price productDetail  */}
                    <div className="price  flex flex-col md:flex-row lg:flex w-full p-4 gap-4  ">
                      <div className="title-header  items-center md:w-1/2 w-full">
                        <p className="card-title  uppercase text-xl md:text-3xl font-bold p-3 md:my-4 ">
                          {isData.ht_name}
                        </p>

                        <p className="price capitalize w-full xl:w-[70%]  md:text-xl text-white bg-gradient-to-r from-purple to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple200  font-medium rounded-lg text-sm px-2  py-2.5 text-center me-2 mb-2">
                          {"ເລີ່ມຕົ້ນ: " + Number(isData.ht_price).toLocaleString()+ "  ກີບ"}
                        </p>
                      </div>

                      <div className="DateOpen font-semibold flex-col md:flex justify-start w-full md:w-1/2">
                        <h1 className=" dateopen md:text-2xl   text-2xl lg:text-3xl font-bold p-3 md:my-4">                     
                        ເວລາ check in - out
                        </h1>
                        <hr className=" h-2 w-full " />
                        <h1 className="text-xl pl-8 md:text-2xl md:my-2">
                          {" ເວລາເຊັກອິນ: "+isData.ht_open }
                        </h1>
                        <h1 className="text-xl pl-8  md:text-2xl ">
                          {"ເວລາເຊັກເອົ້າ: "+isData.ht_close }
                        </h1>
                      </div>
                    </div>

                    <hr className=" h-2 mt-2 rounded-lg bg-gradient-to-r  from-pink-600 to-blue-500 " />
                    <div className="price  flex-col w-full ">
                      <div className="font-semibold  items-center p-2 pl-6 flex gap-3">
                        <i className="fi fi-rs-comment-info "></i>
                        <h3 className="font-semibold">ຕິດຕໍ່ສອບຖາມເບີ່ງເຕີ່ມ</h3>
                      </div>
                      <hr className=" h-2 " />

                      <div className="dec p-1 pl-8 flex gap-3">
                        <i className="fi fi-br-link-alt text-xl font-semibold underline">
                        <Link to={ isData.ht_website } target="_blank"  >
                            {" " + isData.ht_website}
                          </Link>

                         
                        </i>
                      </div>
                      <div className="dec p-1 pl-8 flex gap-3">
                        <i className="fi fi-rr-phone-call text-xl font-semibold">
                          {" "+isData.ht_connection}
                        </i>
                      </div>
                    </div>
                    {/* TODO:  desc  */}
                    <div className="price  flex-col w-full ">
                      <div className="font-semibold flex items-center justify-center p-2 pl-6">
                        <h3 className="font-semibold">ສີ່ງອຳນວຍຄວາມສະດວກ</h3>
                      </div>
                      <hr className=" h-2 " />
                      <div className="dec p-2 pl-8">
                        <article>{isData.ht_convenience}</article>
                      </div>
                    </div>
                  </div>

                 
                </div>
              </div>

              <div className="price  flex-col w-full ">
                      <div className="font-semibold flex items-center justify-center p-2 pl-6">
                        <h3 className="font-semibold mt-4">ຄຳອະທິບາຍເພີ່ມເຕີມ</h3>
                      </div>
                      <hr className=" h-2 " />
                      <div className="dec p-2 pl-8 ">
                        <article className="text-xl md:text-2xl">{isData.ht_description}</article>
                      </div>
                    </div>

              {/* image slider vevieq  */}

              <Carousel className="rounded-xl mt-8  overflow-hidden h-[45rem] ">
                    {matchingImgNames.length === 0 ? (
                      <div className="empty-gallery flex justify-center items-center h-full">
                        <p className="text-center text-2xl opacity-50">Gallerys</p>
                      </div>
                    ) : (
                      matchingImgNames.map((item, index) => (
                        <img
                          key={index}
                          src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.img_image}`}
                          alt={`Image ${index + 1}`}
                          className="h-full w-full aspect-video"
                        />
                      ))
                    )}
                    
               </Carousel>
             

              {/* // TODO map- locatrion   */}
              <div className="Container-map mt-10 ">
              <hr className=" h-2 " />
              <h1 className="pl-7 md:text-2xl font-semibold opacity-80 mt-4  ">{"ທີ່ຕັ້ງ :"+" " +isData.ht_location}</h1>
                <div className="titlemap flex p-4 justify-center items-center font-bold text-2xl ">
                  <h1>ແຜນທີ່ນຳທາງ Google map</h1>
                </div>
                <div className=" ClassMap relative flex-col justify-center items-center p-1 bg-white border sm:h-[450px] h-[280px] border-gray-200 rounded-lg shadow">
                  <iframe
                    src={isData.ht_address ||""}
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

              <div className="container mt-4 rounded-xl border shadow p-2  ">
                <div className="Mainbox h-full w-full flex-col md:flex md:flex-row lg:flex gap-4  overflow-hidden p-2 ">
                
                <div className="ceatePoint flex-col text-white rounded-lg p-10 bg-Primary w-full h-auto items-center pt-3 md:pt-7 font-semibold text-2xl   ">
                
                {/* // todo ให้คะแนนดาว  */}
                <div className="input-rating">
                <Stack spacing={1}>
                   <div className="w-full flex justify-center items-center h-auto text-3xl">
                      <Rating
                    
                     className="text-6xl " // ปรับขนาดไอคอนดาว
                     size="large"
                     icon={<span style={{ fontSize: "40px" }}>★</span>} // ขนาดไอคอนดาว
                     emptyIcon={<span style={{ fontSize: "40px",  }}>☆</span>} // ขนาดไอคอนดาวที่ว่าง
                          name="user-rating"
                          value={ratingValue}
                          onChange={handleRatingChange}
                        />
                       
                   </div>

                    {showCommentBox && (
                      <div className="mt-4">
                        <textarea
                          defaultValue={comments}
                          onChange={(e) => setComments(e.target.value)}
                          placeholder="ຂຽນຄຳເຫັນ..."
                          className="input-box pl-5 placeholder:text-dark-grey resize-none h-auto overflow-auto bg-dark-grey/30"
                        />
                        <button className="btn-dark mt-5 px-10" onClick={handleSubmitRating}>
                          submit
                        </button>
                      </div>
                    )}
                  </Stack>

                </div>

          {/* // todo ຈະນວນໃຫ້ຄະແນນ ແລະ ຄ່າສະເລ່ຍສະເພາະສະຖານທີ  */}
                <div className="pointStar flex justify-center items-center p-2">
                  {/* // todo Avg_rating  */}
                  <p className="text-2xl text-yellow-700 font-bold">
                    {AvgRating && AvgRating.total !== undefined
                      ? "Rating: "+ Number(AvgRating.total).toFixed(1)
                      : "1"}
                  </p>
                </div>

               
                {/* todo จำนวนคนใหคะแนน  */}
                {scoreColumnCount && (
                  <div className="contPoint flex justify-center items-center  p-2">
                    <h4>{ "ຄົນໃຫ້ຄະແນນ: "+ scoreColumnCount + ".00"}</h4>
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
                            (score === 4 &&
                              scoreFourth &&
                              scoreFourth + ".00") ||
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
              {/* // TODO: input star rating  */}

          

              {/* // TODO  ให้คะแนนดาวจบ */}
              {/* // todo user ให้คะแนนดาว  */}

              {renderRatings()}

                {/* // todo เบีงลายชื่อคนใหดาว  */}
           <div className="input-rating flex justify-center mt-4">
                <Button className="font-noto_san_lao bg-yellow-800" onClick={handleOpen_rating} variant="gradient">
                ເບີ່ງການໃຫ້ຄະແນນເພີ່ມເຕີມ
                </Button>
                <Dialog
                  open={open_rating}
                  handler={handleOpen_rating}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                  }}
                >
                  {isDetailRating.map((item, index) => (
                    <div
                      key={index}
                      className="detail-rating flex flex-col   justify-start items-start my-2 px-7 rounded-xl p-2 w-full h-full line-clamp-2 border bg-grey"
                    >
                      <div className="img flex p-2 px-3 mt-2 gap-2">
                        <img
                           src={
                            item.user_profile_img.startsWith("http")
                              ? item.user_profile_img
                              : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.user_profile_img}`
                          }
                          alt={item.user_name}
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

                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      onClick={handleOpen_rating}
                      className="mr-1"
                    >
                      <span>Cancel</span>
                    </Button>
                    
                  </DialogFooter>
                </Dialog>
              </div>
            

          
          
            </>
          )}
          
  {/* // TODO Author hotels  */}
<div className=" bg-grey/50 border mt-5 rounded-xl p-2 "> <VeviewHotel /></div>
           
           {/* //TODO Athor menu  */}

       <div className="bg-grey/50 border rounded-xl p-2 mt-5"> <Restaurants_review_Othor/> </div>

        </section>
      </AnimationWrapper>
    </ThemeProvider>
  );
};
export default DetaiFood_Hotel;
