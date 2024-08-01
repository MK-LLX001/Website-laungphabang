import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { loadPlace, Remove } from "../function/place.function.Api";
import { Link } from "react-router-dom";

// ... rest of your code

const  PlacesDatas =() => {
  
  const [isGetData, setGetData] = useState([]);
  // Load category data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    loadPlace()
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  };

console.log(isGetData)
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
       return toast.error("ເກີດຂໍ້ຜິດຜາດໃນການລືບຂໍ້ມູນ");
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper transition={{ duration: 1, delay: 0.1 }}>
        
      <div className="py-4 px-[5vw] md:px-[0vw] lg:px-[0vw]">
         

            <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg mx-auto max-w-[90%] w-full ml-10">
              <span className=" flex justify-center font-bold text-center py-4 md:text-3xl text-xl ">ຕາຕະລາງຂໍ້ມູນສະຖານທີທອງທຽ່ວ</span>
              <Link to="/placesdata" className="btn-dark ml-3">ອັບໂຫລດຂໍ້ມູນ</Link>
              <table className="  text-sm text-left rtl:text-right text-gray-500 mt-7 ">
                <thead className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                  <th scope="col" className="px-4 py-3 truncate">
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
                      Names
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                     Sesion
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Start-Time
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      End-Time
                    </th>
                    <th scope="col" className="px-6 py-3 truncate ">
                      Adresss
                    </th>
                    <th scope="col" className="px-6 py-3 truncate ">
                     Price
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 truncate ">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 truncate ">
                      Warning
                    </th>
                   
                  </tr>
                </thead>
                <tbody>
                  {isGetData
                    ? isGetData.map((items, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b   hover:bg-gray-300 "
                        >
                         <td className="px-4 py-4">{index + 1}</td>
                           <td className="px-6 py-4">
                            <Link
                              to={"/editplace/"+items.pl_id}
                              className="p-3 font-medium text-blue-600  hover:underline"
                            >
                            <i className="fi fi-ss-edit text-2xl"></i>
                            </Link>
                            <Link
                              to="#"
                              onClick={() => handleRemove(items.pl_id)}
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
                                items.pl_img_image
                              }`}
                              alt={items.pl_name}
                            />
                          </td>
                          <td className="px-6 py-4 truncate">{items.pl_name}</td>
                          <td className="px-6 py-4 truncate">{items.sesion}</td>
                          <td className="px-6 py-4 truncate">{items.pl_startime}</td>
                          <td className="px-6 py-4 truncate">{items.pl_endtime}</td>
                          <td className="px-6 py-4 truncate  max-w-xs">{items.pl_address}</td>
                          <td className="px-6 py-4 truncate">{items.pl_price}</td>
                          <td className="px-6 py-4 truncate">{items.category_name}</td>
                          <td className="px-6 py-4 truncate max-w-xs">{items.pl_description}</td>
                          <td className="px-6 py-4 truncate  max-w-xs">{items.pl_warning}</td>

                         
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
}

export default  PlacesDatas;
