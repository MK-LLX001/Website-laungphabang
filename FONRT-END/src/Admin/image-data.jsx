import React, { useState, useEffect } from "react";
import defaultBanner from "../imgs/blog banner.png";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import AnimationWrapper from "../common/page-animation";
import InputLabel from "@mui/material/InputLabel";
import { theme } from "../itemsMui/thomeMui";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Reloadimg, Insertimg, Removeimg } from "../function/image.api";
// ... rest of your code

const ManagerImage = () => {
 

  const [getmages, setgetImages] = useState([]);


  useEffect(() => {
    loadimg();
  }, []);

  const loadimg = async () => {
    Reloadimg()
      .then((res) => setgetImages(res.data))
      .catch((err) => console.log(err));
  };


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
        Removeimg(id)
          .then((res) => {
            console.log(res);
            loadimg();
            toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <section>
          {/* TODO: Tables here  */}
          <hr className="h-2 mt-4 rounded-lg bg-gradient-to-r from-pink-600 to-blue-500" />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
          <span className="flex justify-center font-bold text-center py-4 md:text-3xl text-xl">
                  ຕາຕະລາງຂໍ້ມູນໂຮງແຮມ
                </span>
              
                <Link to="/image-data" className="btn-dark ml-3">ອັບໂຫລດຂໍ້ມູນ</Link>
                

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-7">
              <thead className="text-xs text-white uppercase bg-dark-grey">
                <tr>
                  <th scope="col" className="px-6 py-3 w-10">
                    ລຳດັບ
                  </th>
                  <th scope="col" className="px-6 py-3 w-10">
                   Action
                  </th>
                  <th scope="col" className="px-6 py-3 w-52">
                    ຮຸບພາບ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ຊື້ຮູບພາບ
                  </th>
                  
            
                </tr>
              </thead>
              <tbody>
                {/* FIXME: loop data image to row table  */}
                {/* FIXME: loop data image to row table  */}
                {getmages
                  ? getmages.slice(0, 10).map((items, index) => (
                      <tr key={index} className="bg-white border-b">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-1 py-2 flex">
                          {/* Render Link to edit category */}
                          <Link
                            className="p-3 font-medium text-blue-600  hover:underline"
                            to={"/editimages/" + items.img_id}
                          >
                            <i className="fi fi-ss-edit text-2xl "></i>
                          </Link>

                          <button
                             className="p-3 font-medium text-red  hover:underline"
                            onClick={() => handleRemove(items.img_id)}
                          >
                            <i className="fi fi-rr-delete text-2xl"></i>
                          </button>
                        </td>
                       
                        <td className="px-6 py-4">
                          <img
                            className="w-14 h-14 object-cover hover:duration-200 hover:w-20 hover:h-20"
                            src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                              items.img_image
                            }`}
                            alt={items.img_name}
                          />
                        </td>
                        <td className="px-6 py-4">{items.img_name}</td>
                      
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </section>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default ManagerImage;
