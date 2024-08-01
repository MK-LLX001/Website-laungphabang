// Import useState, useEffect from React
import React, { useEffect, useState } from "react";
// Import toast and Toaster from react-hot-toast
import toast, { Toaster } from "react-hot-toast";
// Import TextField, createTheme, and ThemeProvider from @mui/material
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Import AnimationWrapper from "../common/page-animation"
import AnimationWrapper from "../common/page-animation";
// Import Remove, Insert, and Reload from "../function/categoryFunction"
import { Remove, Insert, Reload } from "../function/categoryFunction";
// Import Link from react-router-dom
import { Link } from "react-router-dom";
// Import theme from "../itemsMui/thomeMui"
import { theme } from "../itemsMui/thomeMui";

// Define Category component
function ManagerCategory() {


  
  const [IsDataCategory, setIsDataCategory] = useState([]);


  useEffect(() => {
    loadData();
  }, []);

 
  const loadData = async () => {
    Reload()
      .then((res) => setIsDataCategory(res.data))
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    // แสดงกล่องข้อความยืนยันโดยใช้ toast
    Swal.fire({
    title: 'ທ່ານຕ້ອງການຈະລົບຂໍ້ມູນແທ້ຫວາ',
    text: 'ທ່ານຈະບໍ່ສາມາດຍົກເລີກການນຳເນີນງານນີ້ໄດ້!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'ໂດຍ, ລືບຂໍ້ມູນ!'
    }).then((result) => {
      if (result.isConfirmed) {
        // ถ้าผู้ใช้กดปุ่ม "ตกลง" ในกล่องข้อความยืนยัน
        // ลบข้อมูล
        Remove(id)
          .then((res) => {
            console.log(res);
            loadData();
            toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    // Render components within ThemeProvider
    <ThemeProvider theme={theme}>
      {/* Render Toaster component for displaying notifications */}
      <Toaster />
      {/* Render AnimationWrapper component */}
      <AnimationWrapper>
        <section >
         
          <Link to={"/categorys"} className="btn-light ">ອັໍບໂຫລດຂໍ້ມຸນ</Link>
          <span className="font-medium text-2xl m-2"> ຈັດການຂໍ້ມູນໝວດໝູ່ </span>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-7">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-4">
          
            <thead className="text-xs text-white uppercase bg-dark-grey">
              <tr>
             
              
                <th scope="col" className="px-6 py-3 w-10">
                  ລຳດັບ
                </th>
                <th scope="col" className="px-6 py-3 w-10">
                 Action
                </th>
                <th scope="col" className="px-6 py-3">
                  ຊື່ປະເພດໝວດໝູ່
                </th>
               
              
              </tr>
            </thead>
            <tbody>
              {/* Map through category data and render rows */}
              {IsDataCategory
                ? IsDataCategory.map((items, index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-1 py-2">
                        {/* Render Link to edit category */}
                        <Link
                          className="p-3 font-medium text-blue-600  hover:underline"
                          to={"/editcategories/" + items.category_id}
                        >
                        <i className="fi fi-ss-edit text-2xl"></i>
                        </Link>
                        <button
                          className="p-3 font-medium text-blue-600  hover:underline"
                          onClick={() => handleRemove(items.category_id)}
                        >
                         <i className="fi fi-sr-delete text-2xl text-red"></i>
                        </button>
                      
                      </td>

                      <td className="px-6 py-4">{items.category_name}</td>
                     
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>

        </section>

        {/* TODO: TABLE Render table for displaying category data */}
        
      </AnimationWrapper>
    </ThemeProvider>
  );
}

export default ManagerCategory;
