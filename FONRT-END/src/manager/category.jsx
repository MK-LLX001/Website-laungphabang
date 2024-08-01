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
function Category() {
  // Initialize state for form with category_name as an empty string
  const [IsDataCate, setDataCate] = useState({
    category_name: "",
  });

 

  // Define handleClear function to clear the text in TextField
  const handleClear = () => {
    // Reset category_name to empty string
    setDataCate({ ...IsDataCate, category_name: "" });
  };

  // Define handleChange function to update form state
  const handleChange = (e) => {
    console.log(e.target.files)
    setDataCate({ ...IsDataCate, [e.target.name]: e.target.value });
  };
// console.log(IsDataCate)
  // Initialize state for category data
  const [IsDataCategory, setIsDataCategory] = useState([]);

  // Load category data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Define function to load category data
  const loadData = async () => {
    Reload()
      .then((res) => setIsDataCategory(res.data))
      .catch((err) => console.log(err));
  };
  // console.log(IsDataCate)
  // Define function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!IsDataCate.category_name) {
      toast.error("ກະຮຸນາປ້ອນຂໍ້ມູນກ່ອນ");
      return;
    }
    Insert(IsDataCate)
      .then((res) => {
        console.log(res.data);
        loadData();
        toast.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");

      })
      .catch((err) => {
        console.log(err)
        toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
      });
        
  };

  // Define function to handle category removal
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
          {/* Render form for adding categories */}
          <form action="" onSubmit={handleSubmit} >
            <div className="flex w-full flex-col mt-4 gap-4 font-bold">
              {/* Render TextField for entering category name */}
              <TextField
                id="filled-multiline-flexible"
                label="ຂໍ້ມູນໝວດໝູ່"
                multiline
                maxRows={7}
                variant="filled"
                name="category_name"
                value={IsDataCate.category_name} //ต้องใส่ค่าก่อนจะ clear text ได้
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center w-full mt-4">
              {/* Render button for submitting form */}
              <button
                type="submit"
                className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
              >
                Save
              </button>
              {/* Render button for refreshing data */}
              <button
                type="button"
                onClick={handleClear}
                className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
              >
                Refresh
              </button>
            </div>
          </form>


          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-7">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-dark-grey">
              <tr>
                <th scope="col" className="px-6 py-3 w-10">
                  ລຳດັບ
                </th>
                <th scope="col" className="px-6 py-3">
                  ຊື່ປະເພດໝວດໝູ່
                </th>
                <th scope="col" className="px-6 py-3 w-10">
                  ແກ້ໄຂ
                </th>
                <th scope="col" className="px-6 py-3 w-10">
                  ລືບ
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Map through category data and render rows */}
              {IsDataCategory
                ? IsDataCategory.map((items, index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{items.category_name}</td>
                      <td className="px-1 py-2">
                        {/* Render Link to edit category */}
                        <Link
                          className="p-3 font-medium text-blue-600  hover:underline"
                          to={"/editcategories/" + items.category_id}
                        >
                        <i className="fi fi-ss-edit text-2xl"></i>
                        </Link>
                        {/* Render Link to edit user */}
                      
                      </td>
                      <td className="px-1 py-2">
                        {/* Render button to delete category */}
                        <span
                          className="p-3 font-medium text-blue-600  hover:underline"
                          onClick={() => handleRemove(items.category_id)}
                        >
                         <i className="fi fi-sr-delete text-2xl text-red"></i>
                        </span>
                      </td>
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

export default Category;
