import React, { useState, useEffect, useContext } from "react";
import "../styecss/styleslider.css";
import TextField from "@mui/material/TextField";
import AuthorplaceFood from "../components/place.foodlender.conpunent";
import { ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { ReadById } from "../function/Activity.function.api";
import { Reloadimg } from "../function/image.api";
import {
   ReloadDetailRating,
  ReloadRating,
  Insertactivitys,
  Rlod_detail_rating_activitys,
  LoadAvg_ratingActivitys,
  GetRatingActivityById,
  Remove
} from "../function/Rating.api";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,

} from "@material-tailwind/react";

import { useParams,Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@material-tailwind/react";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Foods from "../components/Popura-Food.conponent";



// Install the Swiper modules

const Page_Activitys = () => {
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
  const [isRating, setRating] = useState([]);
  const [isDetailRating, setDetailRating] = useState([]);
  const [AvgRating, setAvgRating] = useState([]);
  const [matchingImgNames, setMatchingImgNames] = useState([]);
  // Define value state using useState hook

  // ฟังก์ชันสำหรับโหลดข้อมูล
  const loadData = async () => {
    try {
      const placeData = await ReadById(params.id);
      setData(placeData.data[0]); // Set place data
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // console.log(isData)

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

  const loadRating = async () => {
    try {
      const response = await ReloadRating();
      setRating(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const loadDetail_rating = async () => {
    try {
      const detail_rating_place = await Rlod_detail_rating_activitys(params.id);
      setDetailRating(detail_rating_place.data); // Set entire array
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const loadAvg_rating = async () => {
    try {
      const avg_rating = await LoadAvg_ratingActivitys(params.id);
      const { avg_score } = avg_rating.data[0];
      setAvgRating({
        total: avg_score,
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
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

  // console.log("จำนวนคอลัมน์ที่มีค่า5 'score':", scoreFive);

  // console.log("Avg_rating: "+AvgRating);
  // console.log("Rating:", JSON.stringify(isDetailRating));
  // ใช้ useEffect เพื่อโหลดข้อมูลเมื่อ component โหลดเสร็จ
  useEffect(() => {
    loadData(params.id);
    loadImg();
    loadRating();
    loadDetail_rating();
    loadAvg_rating();
   
  
  }, []);

  useEffect(() => {
    // ตรวจสอบว่าข้อมูลของ isData และ isimg ถูกโหลดเรียบร้อยแล้วหรือไม่
    if (Object.keys(isData).length !== 0 && isimg.length !== 0) {
      // ดึงชื่อรูปภาพทั้งหมดที่ตรงกันระหว่าง isData.pl_name และ isimg.img_name
      const matchingImgNames = isimg
        .filter((img) => isData.ac_name.includes(img.img_name))
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

  // console.log(matchingImgNames);

  // todo: Slider
  const [activeIndex, setActiveIndex] = useState(3);
  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const sliderImages = document.querySelectorAll(".slider-img");
    sliderImages.forEach((img, index) => {
      img.addEventListener("click", () => handleImageClick(index));
    });

    return () => {
      sliderImages.forEach((img, index) => {
        img.removeEventListener("click", () => handleImageClick(index));
      });
    };
  }, []);

  const [selectpion, setSlectpion] = useState(null);




// todo submitrating 
const [ratingValue, setRatingValue] = useState(0);
const [showCommentBox, setShowCommentBox] = useState(false);
const [comments, setComments] = useState("");

const handleRatingChange = (event, newValue) => {
  if (!access_token) {
 return toast.error("ກະຮຸນາລ໊ອກອີນເຂົ້າສູ່ລະບົບກ່ອນ");
  //  return navigate("/signin");
  }

  setRatingValue(newValue);
  setShowCommentBox(true); // แสดงกล่องคอมเมนต์เมื่อให้คะแนนเสร็จ
};

const handleSubmitRating = async () => {
  if (!ratingValue) {
    return toast.error("ກະຮຸນາໃຫ້ຄະແນນກ່ອນ");
  }

  

  // console.log(ratingValue + comments)

  try {
    const Datas = {
      ac_id: params.id,
      user_id: user_id,
      score: ratingValue,
      comment: comments,
    };

    const response = await Insertactivitys(Datas)

    if (response.status === 200) {
      toast.success("ໃຫ້ຄະແນນດາວສຳເລັດແລ້ວ");
      setComments(""); // เคลียร์กล่องคอมเมนต์
      setRatingValue(0); // รีเซ็ตคะแนน
      setShowCommentBox(false); // ซ่อนกล่องคอมเมนต์
      loadImg();
      loadRating();
      loadDetail_rating();
      loadAvg_rating();
    } else {
      toast.error("ເກີດຄວາມຜິດພາດໃຫ້ຄະແນນ ແລະ ຄຳເຫັນ.");
    }
  } catch (error) {
    console.error(error);
    toast.error("ເກີດຄວາມຜິດພາດໃຫ້ຄະແນນ ແລະ ຄຳເຫັນ.");
  }
};





 // todo: give-rating

 
 // detail input-rating

 const [open_rating, setOpen_rating] = useState(false);
 const handleOpen_rating = () => setOpen_rating(!open_rating);

 const checkLogin = () => {
   if (!access_token) {
     // ถ้ายังไม่ได้ล็อกอิน ให้เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
     navigate("/signin");
   } else {
     setSlectpion(selectpion ? null : true);
   }
 };

   console.log(isData)

//  console.log("detailRatingByUser"+JSON.stringify(DetailRatingUserById)) 
const RatingbyUser = isDetailRating.filter(item => item.user_id === user_id || item.ac_id === params.id);
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
            loadDetail_rating();
            loadAvg_rating();
         
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
     return isDetailRating.slice(1,4).map((item, index) => (
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
     return  RatingbyUser.slice(0, 3).map((item, index) => (
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
             <button onClick={handleOpenEdit}>
               <i className="fi fi-br-menu-dots-vertical text-2xl"></i>
             </button>
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
              <div className="Main ">
                <section>

                
                  <div className="flex font-bold pt-4  items-center gap-4">
                   
                    <span className="text-3xl font-bold ">
                      ກິດຈະກຳ: {isData.ac_name}
                    </span>
                  </div>
                  <div className="HEADER  md:flex-row rounded-xl p-2 text-white font-semibold justify-around md:justify-between items-center bg-Secondary w-full my-3">
                       <div className="flex-col flex justify-center items-start">
                            <p className="text-xl md:ml-7"> ເວລາເປີດ {isData.ac_opendate} AM </p>
                              <p className="text-xl md:ml-7"> ເວລາປິດ {isData.ac_closedate} PM </p>
                             
                       </div>
                       <hr className=" my-2 w-full" />
                      <div>
                      <span className="text-xl font-semibold md:text-2xl md:mr-10 ml-8">
                                ລາຄາ: {Number(isData.ac_price).toLocaleString()+" ₭"}
                              </span>
                      </div>
                    </div>
               


                  <div className="boxMain">
                   
                      <img
                        className="rounded-2xl aspect-auto "
                        src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                          isData.ac_image
                        }`}
                        alt={isData.ac_name}
                      />
                   
                    <div className="desc p-10">
                      <p className="text-2xl md:text-3xl font-bold p-4 ">
                        {isData.ac_name}
                      </p>
                      <Typography variant="body1" gutterBottom>
                        {isData.ac_description}
                      </Typography>
                    </div>
                  </div>
                  {/* <div className="Know  bg-Primary text-white flex-col justify-center  items-center h-full p-10 rounded-xl ">
                    <span className="text-2xl font-semibold md:text-4xl">
                      ສີ່ງທີ່ຄວນຮູ້{" "}
                    </span>
                    <article>ສີ່ງທີ່ຄວນຮູ້</article>
                  </div> */}

                  {/* TODO:  image slider  */}
                </section>
              </div>

              {/* TODO: slider  */}
              <div className="slider-images">
                {matchingImgNames.length === 0 ? (
                  <div className="empty-gallery">
                  <p className=" flex text-center text-2xl opacity-50 items-center">Gallerys</p>
                </div>
                ) : (
                  <div className="slider-container">
                    {matchingImgNames.map((items, index) => (
                      <div
                        key={index}
                        className={`slider-img ${
                          index === activeIndex ? "active" : ""
                        }`}
                        onClick={() => handleImageClick(index)}
                      >
                        <img
                          src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                            items.img_image
                          }`}
                          alt={items.img_name}
                        />
                        <p className="hh1">{items.img_name}</p>
                        <div className="details">
                          <h2>{items.img_name}</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* FIXME: thismap or location   */}

          <div className="container-map p-3">
            <p className="text-xl md:text-2xl">ທີ່ຢູ່ : {isData.ac_address} </p>
            
          </div>

          {/* FIXME: start rating  */}

          <div className="container-star my-6 pt-4">
            <div className="containerf  rounded-xl border shadow p-2  ">
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
                          className="input-box pl-5 placeholder:text-white/60 resize-none h-auto overflow-auto bg-dark-grey/30"
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
                    <h4>{ "ຈຳນວນ: "+ Number(scoreColumnCount).toFixed(1) + " ຄັ້ງ"}</h4>
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
                          (score === 5 && scoreFive * 3) ||
                          (score === 4 && scoreFourth * 3) ||
                          (score === 3 && scoreThere * 3) ||
                          (score === 2 && scoreTwo * 3) ||
                          (score === 1 && scoreOne * 3) ||
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
            </div>

                {/* // TODO: input star rating  */}

            


            

          </div>

          {/* // todo ให้คะแนนดาว  */}

         {renderRatings()}

  {/* // todo เบีงลายชื่อคนใหดาว  */}
  <div className="input-rating flex justify-center mt-4">
                <Button className="font-noto_san_lao" onClick={handleOpen_rating} variant="gradient">
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
                    <Button
                      variant="gradient"
                      color="green"
                      onClick={handleOpen_rating}
                    >
                      <span>Confirm</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>

          {/* TODO: this pupran place   */}

          <AuthorplaceFood />
          <Foods/>
        </section>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default Page_Activitys;
