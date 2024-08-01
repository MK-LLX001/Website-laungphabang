import React, { useState, useEffect } from "react";
import { Insert,ReloadEm,Remove } from "../function/employees-api";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
const EntrepreneursDatas = () => {
    const [isGetData, setGetData] = useState([]);

    const loadEntrepreneurs = async () => {
       ReloadEm()
            .then((res) => setGetData(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadEntrepreneurs();
    }, []);

   
  // Define function to handle category removal
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
            loadEntrepreneurs();
            toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
          })
          .catch((err) => console.log(err));
      }
    });
  };

    return (
        <>
            <div className="max-w-full p-6 bg-white shadow-md rounded-md">
                <Toaster />
                <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
                    <span className="flex justify-center items-center text-center py-4 md:text-2xl text-xl">
                        ຕາຕະລາງຂໍ້ມູນຜູ້ປະກອບການ
                    </span>
                    <Link to="/registor-employees" className="btn-dark ml-3">ອັບໂຫລດຂໍ້ມູນ</Link>
                    <table className="text-sm text-left rtl:text-right text-gray-500 mt-8">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 truncate">No</th>
                                <th scope="col" className="px-6 py-3 truncate">Action</th>
                                <th scope="col" className="px-6 py-3 truncate">Pictures</th>
                                <th scope="col" className="px-6 py-3 truncate">Name</th>
                                <th scope="col" className="px-6 py-3 truncate">Last Name</th>
                                <th scope="col" className="px-6 py-3 truncate">Birthday</th>
                                <th scope="col" className="px-6 py-3 truncate">Village</th>
                                <th scope="col" className="px-6 py-3 truncate">District</th>
                                <th scope="col" className="px-6 py-3 truncate">Province</th>
                                <th scope="col" className="px-6 py-3 truncate">Email</th>
                                <th scope="col" className="px-6 py-3 truncate">Phone</th>
                               
                                <th scope="col" className="px-6 py-3 truncate">Skills</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {isGetData
                                ? isGetData.map((items, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-300">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <Link
                                                to={"/editregistor-employees/" + items.em_id}
                                                className="p-3 font-medium text-blue-600 hover:underline"
                                            >
                                                <i className="fi fi-ss-edit text-2xl"></i>
                                            </Link>
                                            <button
                                               
                                                onClick={() => handleRemove(items.em_id)}
                                                className="p-3 font-medium text-blue-600 hover:underline"
                                            >
                                                <i className="fi fi-sr-delete text-2xl text-red"></i>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <img
                                                className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
                                                src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${items.image}`}
                                                alt={items.en_name}
                                            />
                                        </td>
                                        <td className="px-6 py-4 truncate">{items.em_name}</td>
                                        <td className="px-6 py-4 truncate">{items.em_lastname}</td>
                                        <td className="px-6 py-4 truncate">{items.em_birthday}</td>
                                        <td className="px-6 py-4 truncate">{items.em_village}</td>
                                        <td className="px-6 py-4 truncate">{items.em_district}</td>
                                        <td className="px-6 py-4 truncate">{items.em_province}</td>
                                        <td className="px-6 py-4 truncate">{items.em_email}</td>
                                        <td className="px-6 py-4 truncate">{items.em_phone}</td>
                                        
                                        <td className="px-6 py-4 truncate">{items.em_skills}</td>
                                        
                                    </tr>
                                ))
                                : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default EntrepreneursDatas;
