import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { Insert, loadRastaurant, Remove } from "../function/Restaurants.api";
import { Link } from "react-router-dom";
// ... rest of your code

const RestaurantDatas = () => {
  
  const [isGetData, setGetData] = useState([]);


  useEffect(() => {
  
    loadData();
   
  }, []);


  const loadData = async () => {
    loadRastaurant()
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  };
// console.log(isGetData) 

  const handleRemove = async (id) => {
    // แสดงกล่องข้อความยืนยันโดยใช้ toast
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
        // ถ้าผู้ใช้กดปุ่ม "ตกลง" ในกล่องข้อความยืนยัน
        // ลบข้อมูล
        Remove(id)
          .then((res) => {
            console.log(res);
            loadData();
           return toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div className="mx-auto max-w-[90%] w-full ml-10">
         

          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <span className=" flex justify-center items-center text-center py-4 md:text-2xl text-xl font-semibold  ">ຕາຕະລາງຂໍ້ມູນຮ້ານອາຫານ</span>
            <Link to="/restaurantdata" className="btn-dark ml-3">ອັບໂຫລດຂໍ້ມູນ</Link>
            <table className="  text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3 truncate">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Pictures
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Name-Manager
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                   Menu
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Category
                  </th>

                  <th scope="col" className="px-6 py-3 truncate">
                    Open
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Close
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                    Connect
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                   Website
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                   Location
                  </th>
                 
                  <th scope="col" className="px-6 py-3 truncate ">
                    Adresss
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Time-post
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                   Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {isGetData
                  ? isGetData.filter((item)=> item.state ==="ຜ່ານ").map((items, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b   hover:bg-gray-300 "
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">
                          <Link
                            to={"/editrestaurant/" + items.rest_id}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-ss-edit text-2xl"></i>
                          </Link>
                          <Link
                            to="#"
                            onClick={() => handleRemove(items.rest_id)}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-sr-delete text-2xl text-red"></i>
                          </Link>
                        </td>
                        <td className="md:px-6 md:py-3 px-2 py-1 font-medium "><i className="fi fi-ss-star text-xl text-yellow-600" ></i> {Number(items.avg_score).toFixed(1)}</td>
                        <td className="px-6 py-4">
                          <img
                            className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
                            src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                              items.rest_image
                            }`}
                            alt={items.rest_name}
                          />
                        </td>
                        <td className="px-6 py-4 truncate">
                          {`${items.mg_name}${items.mg_surname}`}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_name}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_menu}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.category_name}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_open}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_close}
                        </td>
                        <td className="px-6 py-4 truncate max-w-xs">
                          {items.rest_website}
                        </td>
                        <td className="px-6 py-4 truncate max-w-xs">
                          {items.rest_location}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_connect}
                        </td>
                        <td className="px-6 py-4 truncate max-w-xs">
                          {items.rest_address}
                        </td>
                        <td className="px-6 py-4 truncate max-w-xs">
                          {items.rest_description}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.created_time}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.mg_code}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default RestaurantDatas;
