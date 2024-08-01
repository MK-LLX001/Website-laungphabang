import React, { useState, useRef,useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import defaultBanner from "../imgs/blog banner.png";
import { Insert,ReloadEm,Remove } from "../function/employees-api";
import { Link } from "react-router-dom";
const RegistorEmployees = () => {
  
// TODO: Review image alter uploadImages
const [previewImage, setPreviewImage] = useState(null);
const [Images, setimge] = useState(null);
const [isData, setData] = useState({});

// TODO: function setImageData
const handleChange = (e) => {
  if (e.target.files && e.target.files.length > 0) {
    const selectedFile = e.target.files[0];
    setimge(selectedFile);
    setPreviewImage(URL.createObjectURL(selectedFile));
    setData({ ...isData, [e.target.name]: selectedFile });
  } else {
    setData({ ...isData, [e.target.name]: e.target.value });
  }

};
 console.log(isData);
 const [isGetData, setGetData] = useState([]);
const loadEmployees = async () => {
    ReloadEm()
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  };

useEffect(() => {
  
    loadEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if(!isData.em_name){
        return toast.error("ທ່ານຕ້ອງໃສຊື່ກ່ອນ");
      }else if (!isData.em_lastname){
        return toast.error("ທ່ານຕ້ອງໃສນາມສະກຸນກ່ອນ");
      }else if (!isData.em_email){
        return toast.error("ທ່ານຕ້ອງໃສອີເມວກ່ອນ");
      }else if(!isData.em_phone){
        return toast.error("ທ່ານຕ້ອງໃສ່ເບີໂທລະສັບກ່ອນ");
      }else if(!isData.img_image){
        return toast.error("ທ່ານຕ້ອງເລືອກຮູບກ່ອນ");
      }
    
      // Construct FormData object
      const form = new FormData();
      for (const key in isData) {
        form.append(key, isData[key]);
      }
  
     console.log("file"+form);

      const res = await Insert(form);
      console.log(res.data);
      loadEmployees();
     return toast.success("ບັນທຶກຊ້ອມູນສຳເລັດແລ້ວ");
       
    } catch (error) {
      console.error(error);
     return toast.error("ຂໍອະໄພ: ບັນທືກບໍ່ສຳເລັດ");
    }
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
        Remove(id)
          .then((res) => {
            console.log(res);
            loadEmployees();
            toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
          })
          .catch((err) => console.log(err));
      }
    });
  };

 


  return (
    <section>

    <div className="max-w-full p-6 bg-white shadow-md rounded-md">
        <Toaster />
      <h2 className="text-2xl font-semibold mb-6 pl-2">ລົງທະບຽນທະນັກງານ</h2>
      <hr className="h-2"/>
      <form  onSubmit={handleSubmit}  encType="multipart/form-data">
        <div className="relative aspect-video w-44 h-44 md:w-80 md:h-80 max-h-fit hover:opacity-80 bg-white border-4 border-grey m-3">
          <label htmlFor="uploadBanner">
            {previewImage ? (
              <img src={previewImage} className="z-20" alt="Preview" />
            ) : (
              <img src={defaultBanner} className="z-20" alt="Default Banner" />
            )}
            <input
              id="uploadBanner"
              name="img_image"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm md:text-xl font-medium text-gray-700">ຊື່</label>
            <input
              type="text"
              name="em_name"
              className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Emma"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-xl font-medium text-gray-700">ນາມສະກຸນ</label>
            <input
              type="text"
              name="em_lastname"
              className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Roberts"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-xl font-medium text-gray-700">ວັນທີເດືອນປີເກີດ</label>
            <input
              type="date"
              name="em_birthday"
              className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-xl font-medium text-gray-700">ບ້ານ</label>
            <input
              type="text"
              name="em_village"
              className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="ໂພນພະເພົາ"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-xl font-medium text-gray-700">ເມືອງ</label>
            <input
              type="text"
              name="em_district"
              className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="ໄຊເສດຖາ"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-xl font-medium text-gray-700">ແຂວງ</label>
            <input
              type="text"
              name="em_province"
              className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="ນະຄອນຫຼວງວຽງຈັນ"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-xl font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="em_email"
              className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Roberts@gmail.com"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-xl font-medium text-gray-700">ເລກໂທລະສັບ</label>
            <input
              type="tel"
              name="em_phone"
              className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="+123 0123 456 789"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-xl font-medium text-gray-700">ສັງກັດ</label>
            <input
              type="text"
              name="em_belong"
              className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="ສະຖານທີທອງທ່ຽວ"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block text-sm md:text-xl font-medium text-gray-700">ທັກສະ</label>
            <input
              type="text"
              name="em_skill"
              className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="English , Chinese"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm md:text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ລົງທະບຽນ
          </button>
        </div>
      </form>
      
    </div>

{/* // todo table  */}

<div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <span className=" flex justify-center items-center text-center py-4 md:text-2xl text-xl  ">ຕາຕະລາງຂໍ້ມູນສະຖານທີທອງທຽ່ວ</span>
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
                    Pictures
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                   LAST-NAME
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                  BIRTHDAY
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                   VILLAGE
                  </th>

                  <th scope="col" className="px-6 py-3 truncate">
                   DISTICT
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    PROVINCE
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                   EMAIL
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                  PHONE
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                  BELONG
                  </th>
                 
                  <th scope="col" className="px-6 py-3 truncate ">
                   SKILL
                  </th>
                 
                  <th scope="col" className="px-6 py-3 truncate">
                    Time
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
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">
                          <Link
                            to={"/editregistor-employees/"+items.em_id}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-ss-edit text-2xl"></i>
                          </Link>
                          <Link
                            to="#"
                            onClick={() => handleRemove(items.em_id)}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-sr-delete text-2xl text-red"></i>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <img
                            className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
                            src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                              items.image
                            }`}
                            alt={items.em_name}
                          />
                        </td>
                        <td className="px-6 py-4 truncate">{items.em_name}</td>
                        <td className="px-6 py-4 truncate">
                          {items.em_lastname}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.em_birthday}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.em_village}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.em_district}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.em_province}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.em_mail}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.em_phone}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.em_belong}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.em_skill}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_time}
                        </td>
                        
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>

    </section>
  );
};

export default RegistorEmployees;
