import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { loadHotel } from "../function/hotel.function.api";
import { Insert, loadRastaurant, Remove } from "../function/Restaurants.api";
import { Reload} from "../function/function.upload.API"

const HomeManager_Users = () => {
  
  
  const {
    userAuth: { user_id, user_name, user_profile_img,state },
  } = useContext(UserContext);

  const [restaurant, setRestaurant] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [blog, setBlog] = useState([]);

  const countHotel = hotels.reduce((count, item) => {
    return count + (item.user_id === user_id );
  }, 0);
  const countRestaurant = restaurant.reduce((count, item) => {
    return count + (item.user_id === user_id );
  }, 0);
  const countBlog = blog.reduce((count, item) => {
    return count + (item.user_id === user_id );
  }, 0);
  
// console.log(countBlog)

  
  const loadData = async () => {
    try {
      const res = await loadHotel();
      setHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 

// console.log("ຮ້ານ"+JSON.stringify(restaurant)) 

  const loadResturant = async () => {
    loadRastaurant()
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log(err));
  };

  const loadBlog = async () => {
   Reload()
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
    loadResturant();
    loadBlog();
  }, []);


  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="bg-blue-600 rounded-xl md:w-1/2 w-full pl-3 text-white text-xl font-semibold box-name flex gap-3 justify-between p-2 px-10 items-center">
          <p className="pl-10">ສະບາຍດີທ່ານ: {user_name}</p>
          <img
  src={
    user_profile_img && user_profile_img.startsWith("http")
      ? user_profile_img
      : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${user_profile_img}`
  }
  alt="image"
  className="aspect-auto w-16 h-16 rounded-xl"
/>

        </div>
        <div className="flex justify-end w-full p-3">
        {
          state ==="manaer" ? (<> 
          <Link to="/risgetor-manager" className="btn-light border-dark-grey/40 border">ສະມັກເປັນຜູ້ປະກອບການ</Link>
          </>): (<>
            
           <p className="font-semibold text-xl text-Secondary">
           Status ບັນຊີເຈົ້າເປັນ {state} ແລ້ວ
           </p>
          </>)
        }
        </div>
      </div>

      <hr className="h-2 my-4" />
      <div className="hone-dasboard w-full grid grid-cols-3 md:gap-4 gap-2 place-content-center ">
      
      {state === "manager" && (
        <>
          <div className="boxdshboard bg-blue-400 rounded-xl md:p-4 py-7 font-medium text-center text-white">
            <p className="md:text-xl p-1 mb-2 text-sm">ລີວິວໂຮງແຮມທີ່ນີ້</p>
            <Link className="bg-dark-grey/30 rounded-xl p-2 md:text-xl text-sm items-center" to={'/hotelsdata'}>
              Hotel
            </Link>
          </div>

          <div className="boxdshboard items-center bg-blue-400 rounded-xl md:p-4 py-7 font-medium text-center text-white">
            <p className="p-1 mb-2 text-sm md:text-xl">ລີວິວໂຮງແຮມທີ່ນີ້</p>
            <Link className="bg-dark-grey/30 rounded-xl p-2 text-sm md:text-xl" to={'/restaurantdata'}>
              Restaurants
            </Link>
          </div>
        </>
      )}
        

       {
        state ==="manager" ? (<>
        
        </>) : (
          <>
             <div className="boxdshboard bg-blue-400 rounded-xl md:p-4 py-7 font-medium items-center text-center text-white">
          <p className="md:text-xl p-1 mb-2">ໂພສລີວິວທີ່ນີ້</p>
          <Link className="bg-dark-grey/30 rounded-xl p-2 " to={'/editor'}>
            Blog-review
          </Link>
        </div>
          </>
        )
       }
      </div>

      <div className="tems2-1 mt-5 justify-center items-center flex bg-white border gap-4 p-3 rounded-xl w-full">
        <div className="flex-col flex md:flex-row gap-3 md:gap-7">
         
         {
          state ==="manager" ? null : (
            <>
            
            <div className="items-1 p-5 border-b">
            <span className="text-xl font-semibold">ຈຳນວນ Post-review ທັງໝົດ</span>
            <div className="flex items-center border-b justify-start gap-2 p-1 mt-3">
              <button className="text-xl font-semibold bg-Secondary text-white w-10 h-10 rounded-full">
                <i className="fi fi-rr-house-building"></i>
              </button>
              <p className="text-xl font-semibold md:text-2xl"> {countBlog} ລາຍການ</p>
            </div>
          </div>


            </>
          )
         }

          {
            state ==="manager" ? (<>
             <div className="items-1 p-5 border-b">
            <span className="text-xl font-semibold">ຈຳນວນໂຮງແຮມທັງໝົດ</span>
            <div className="flex items-center border-b justify-start gap-2 p-1 mt-3">
              <button className="text-xl font-semibold bg-Secondary text-white w-10 h-10 rounded-full">
                <i className="fi fi-rr-house-building"></i>
              </button>
              <p className="text-xl font-semibold md:text-2xl"> {countHotel} ລາຍການ</p>
            </div>
          </div>

          <div className="items-1 p-5 border-b">
            <span className="text-xl font-semibold">ຈຳນວນຮ່້ານອາຫານທັງໝົດ</span>
            <div className="flex items-center border-b justify-start gap-2 p-1 mt-3">
              <button className="text-xl font-semibold bg-Secondary text-white w-10 h-10 rounded-full">
                <i className="fi fi-rr-house-building"></i>
              </button>
              <p className="text-xl font-semibold md:text-2xl"> {countRestaurant} ລາຍການ</p>
            </div>
          </div>
            </>) : null
          }

         
        </div>
      </div>

<div className="flex flex-col md:flex-row w-full justify-center items-center gap-3 "> 

      <div className="cardbox mt-7 ">
        <p className=" flex justify-center my-2 text-xl md:text-2xl font-semibold">ໂຮງແຮມທີໄດ 4 ດາວຂື້ນໄປ</p>
        {hotels
          .filter((item) => item.user_id === user_id && item.avg_score >= 4)
          .map((item, index) => (
            <Link to={`/blog/${item.ht_id}`} key={index} className="flex gap-2 items-center border p-3 rounded border-grey pb-5 mb-4">
              <div className="blog-post-card ">
                <div className="card flex gap-2 items-center mb-7">
                  <p className="line-clamp-1 bg-Primary text-white rounded p-2 w-auto">
                    Rating: {Number(item.avg_score).toFixed(1)}
                  </p>
                  <p className="bg-Secondary text-white rounded  w-auto p-2">{item.mg_name}</p>
                </div>
                <h1 className="blog-title line-clamp-1">{item.ht_name}</h1>
                <p className="my-3 text-xl leading max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
                  {item.ht_description}
                </p>
                <div className="like-cate flex gap-2 mt-7">
                  <span className="btn-light py-1 px-4">{item.category_name}</span>
                  <span className="flex ml-4 text-Secondary items-center font-semibold text-xl">
                    {Number(item.ht_price).toLocaleString()}
                  </span>
                  <span className="flex items-center gap-2 text-dark-grey">{item.score_count}</span>
                </div>
              </div>
              <div className="h-28 aspect-square bg-grey">
                <img 
               src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.img_image}`}
               alt={item.ht_name} 
                className="w-full h-full object-cover rounded" />
              </div>
            </Link>
          ))}
      </div>
      {/* // todo resturants  */}
      <div className="cardbox mt-7 w-full">
      <p className=" flex justify-center my-2 text-xl md:text-2xl font-semibold">ຮ້ານອາຫານທີໄດ 4 ດາວຂື້ນໄປ</p>
        {restaurant
          .filter((item) => item.user_id === user_id && item.avg_score >= 4)
          .map((item, index) => (
            <Link to={`/blog/${item.rest_id}`} key={index} className="flex w-full gap-8 items-center border p-3 rounded border-grey pb-5 mb-4">
              <div className="blog-post-card ">
                <div className="card flex gap-2 items-center mb-7 w-full">
                  <p className="line-clamp-1 bg-Primary text-white rounded p-2 w-auto">
                    Rating: {Number(item.avg_score).toFixed(1)}
                  </p>
                  <p className="bg-Secondary text-white rounded  w-auto text-sm p-2">{item.mg_name}</p>
                </div>
                <p className="blog-title line-clamp-1 ">{item.rest_name}</p>
                <p className="my-3 text-xl leading max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
                  {item.rest_description}
                </p>
                <div className="like-cate flex gap-2 mt-7">
                  <span className="btn-light py-1 px-4 ">{item.category_name}</span>
                  <span className="flex ml-4 text-Secondary  items-center font-semibold text-xl">
                  {Number(item.rest_price).toLocaleString()}

                  </span>
                  <span className="flex items-center gap-2 text-dark-grey">{item.score_count}</span>
                </div>
              </div>
              <div className="h-28 aspect-square bg-grey">
                <img 
               src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.rest_image}`}
               alt="image" 
                className="w-full h-full object-cover rounded" />
              </div>
            </Link>
          ))}
      </div>

 </div>
    </>
  );
};

export default HomeManager_Users;
