import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import defaultBanner from "../imgs/blog banner.png";
import { Update, ReadById } from "../function/employees-api";
import { Link } from "react-router-dom";
import { useParams, useNavigate, Navigate } from "react-router-dom";
const EditRegistorEmployees = () => {
  const params = useParams();
  //   console.log(params.id);
  const navigate = useNavigate();
  // TODO: Review image alter uploadImages
  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setimge] = useState(null);
  const [isData, setData] = useState({});
  const [fileOld, setFileOld] = useState();
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

  // feact data hotels from db
  const loadData = async () => {
    try {
      const EmData = await ReadById(params.id);
      const {
        em_name,
        em_lastname,
        em_birthday,
        em_village,
        em_district,
        em_province,
        em_email,
        em_phone,
        em_belong,
        em_skill,
        image,
      } = EmData.data[0];
      setData({
        name: em_name,
        lastname: em_lastname,
        birthday: em_birthday,
        village: em_village,
        district: em_district,
        province: em_province,
        email: em_email,
        phone: em_phone,
        belong: em_belong,
        skill: em_skill,
        img_image: image,
      });

      setFileOld(EmData.data[0].image);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  console.log(isData);
  console.log("file old " + fileOld);

  const formatDate = (dateString) => {
    if (!dateString || !dateString.trim()) {
      return ""; // Return empty string for invalid dates
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Construct FormData object
      if(!isData.name){
        return toast.error("ທ່ານຕ້ອງໃສຊື່ກ່ອນ");
      }else if (!isData.lastname){
        return toast.error("ທ່ານຕ້ອງໃສນາມສະກຸນກ່ອນ");
      }else if (!isData.email){
        return toast.error("ທ່ານຕ້ອງໃສອີເມວກ່ອນ");
      }else if(!isData.phone){
        return toast.error("ທ່ານຕ້ອງໃສ່ເບີໂທລະສັບກ່ອນ");
      }else if(!isData.img_image){
        return toast.error("ທ່ານຕ້ອງເລືອກຮູບກ່ອນ");
      }
      
      const forms = new FormData();
      for (const key in isData) {
        forms.append(key, isData[key]);
      }
      forms.append('fileold', fileOld);

      console.log("file" + forms);
      console.log("fileold+++++++++++++" + fileOld);

      const res = await Update(params.id,forms);
      console.log(res.data);
      toast.success("ບັນທຶກຊ້ອມູນສຳເລັດແລ້ວ");
       return navigate("/admin/employee-data")
    
    } catch (error) {
      console.error(error);
      return toast.error("ຂໍອະໄພ: ບັນທືກບໍ່ສຳເລັດ");
    }
  };

  return (
    <section>
      <div className="max-w-full p-6 bg-white shadow-md rounded-md ">
        <Toaster />
        <h2 className="text-2xl font-semibold mb-6 pl-2">
          ອັບເດດການລົງທະບຽນພະນັກງານ
        </h2>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div className="relative aspect-video w-44 h-44 md:w-80 md:h-80 max-h-fit hover:opacity-80 bg-white border-4 border-grey m-3">
            <label htmlFor="uploadBanner">
              {previewImage ? (
                <img src={previewImage} className="z-20" alt="Preview" />
              ) : isData.img_image ? (
                <img
                  src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                    isData.img_image
                  }`}
                  alt={isData.name}
                  className="z-20"
                />
              ) : (
                <img
                  src={defaultBanner}
                  className="z-20"
                  alt="Default Banner"
                />
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
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ຊື່
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Emma"
                required
                defaultValue={isData.name || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ນາມສະກຸນ
              </label>
              <input
                type="text"
                name="lastname"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Roberts"
                required
                defaultValue={isData.lastname || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ວັນທີເດືອນປີເກີດ
              </label>
              <input
                type="date"
                name="birthday"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                value={formatDate(isData.birthday)}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ບ້ານ
              </label>
              <input
                type="text"
                name="village"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="ໂພນພະເພົາ"
                defaultValue={isData.village || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ເມືອງ
              </label>
              <input
                type="text"
                name="district"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="ໄຊເສດຖາ"
                defaultValue={isData.district || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ແຂວງ
              </label>
              <input
                type="text"
                name="province"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="ນະຄອນຫຼວງວຽງຈັນ"
                defaultValue={isData.province || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Roberts@gmail.com"
                required
                defaultValue={isData.email || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ເລກໂທລະສັບ
              </label>
              <input
                type="tel"
                name="phone"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="+123 0123 456 789"
                defaultValue={isData.email || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ສັງກັດ
              </label>
              <input
                type="text"
                name="belong"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="ສະຖານທີທອງທ່ຽວ"
                defaultValue={isData.belong || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ທັກສະ
              </label>
              <input
                type="text"
                name="skill"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="English , Chinese"
                defaultValue={isData.skill || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm md:text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ອັບເດດ
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditRegistorEmployees;
