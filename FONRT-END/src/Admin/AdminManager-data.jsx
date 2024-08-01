import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { ReloadMg, Remove } from "../function/manager.Api";
import { Link } from "react-router-dom";
import { theme } from "../itemsMui/thomeMui";

function ManagerDatas() {
 
  const [isData, setData] = useState({});


  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    ReloadMg()
      .then((res) => {
        console.log(res.data); // Add this line to see what res.data contains
        setData(res.data);
      })
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
        

          <div>

          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <span className="flex justify-center font-bold text-center py-4 md:text-3xl text-xl">ຕາຕະລາງຂໍ້ມູນຜູ້ປະກອບການ</span>
            <Link to="/risgetor-manager" className="btn-dark ml-3">ອັບໂຫລດຂໍ້ມູນ</Link>
            <table className="text-sm text-left rtl:text-right text-gray-500 mt-8">
             
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {["No", "Action", "code", "Name", "Surname", "Village", "City", "Province", "Birthday", "Phone", "Email"].map(header => (
                    <th key={header} scope="col" className="px-6 py-3 truncate">{header}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {Array.isArray(isData) && isData.length > 0 && isData.map((item, index) => (
                  <tr key={item.mg_id} className="bg-white border-b hover:bg-gray-300">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <Link to={`/risgetor-manager-edit/${item.mg_id}`} className="p-3 font-medium text-blue-600 hover:underline">
                        <i className="fi fi-ss-edit text-2xl"></i>
                      </Link>
                      <Link to="#" onClick={() => handleRemove(item.mg_id)} className="p-3 font-medium text-blue-600 hover:underline">
                        <i className="fi fi-sr-delete text-2xl text-red"></i>
                      </Link>
                    </td>
                   
                    <td className="px-6 py-4 truncate">{item.mg_code}</td>
                    <td className="px-6 py-4 truncate">{item.mg_name}</td>
                    <td className="px-6 py-4 truncate">{item.mg_surname}</td>
                    <td className="px-6 py-4 truncate">{item.mg_village}</td>
                    <td className="px-6 py-4 truncate">{item.mg_city}</td>
                    <td className="px-6 py-4 truncate">{item.mg_province}</td>
                    <td className="px-6 py-4 truncate">{item.mg_birthday}</td>
                    <td className="px-6 py-4 truncate">{item.mg_phone}</td>
                    <td className="px-6 py-4 truncate">{item.mg_email}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </AnimationWrapper>
    </ThemeProvider>
  );
}

export default ManagerDatas;
