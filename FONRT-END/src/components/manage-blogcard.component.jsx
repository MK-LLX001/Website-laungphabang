import React from "react";
import { Link } from "react-router-dom";
import { getDay, getDayOfWeek } from "../common/date";
import toast from "react-hot-toast";
import { Remove } from "../function/function.upload.API";
const ManageBlogCard = ({ data, loadDataupload }) => {
  const {
    img_image,
    up_id,
    up_name,
    up_description,
    time_created,
    score_count,
    category_name,
    user_name,
    user_lastname,
  } = data;

//   console.log("Data upload:", JSON.stringify(data));

  const handleRemove = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'ທ່ານຕ້ອງການລົບຂໍ້ມູນແທ້ຫວາ',
        text: 'ທ່ານຈະບໍ່ສາມາດຍົກເລີກການນຳເນີນງານນີ້ໄດ້!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ໂດຍ, ລືບຂໍ້ມູນ!'
      });

      if (result.isConfirmed) {
        await Remove(id);
        toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
        console.log("Delete success");
        loadDataupload(); // เรียกฟังก์ชันโหลดข้อมูลใหม่
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("ເກີດຂໍ້ຜິດຜາດໃນການລືບຂໍ້ມູນ");
    }
  };

  return (
    <div className="flex gap-10 border-b mb-6 md:px-4 border-grey pb-6 items-center">
      <img
        src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${img_image}`}
        alt="Blog Image"
        className="w-28 h-28 object-cover hidden md:block flex-none bg-grey"
      />
      <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
        <div>
          <Link
            to={`/blog/${up_id}`}
            className="blog-title mb-4 hover:underline"
          >
            {up_name}
          </Link>
          <p className="line-clamp-1">
            Time upload: {getDayOfWeek(time_created)} {getDay(time_created)}
          </p>
          <p className="line-clamp-1">
            {up_description}
          </p>
        </div>

        <div className="flex gap-6 mt-3 items-center">
        <p className=" font-medium ">Like : {score_count}</p>

          <Link to={`/editor/${up_id}`} className="pr-4 py-2 underline">Edit</Link>
          <button 
            className="pr-4 py-2 underline text-red"
            onClick={() => handleRemove(up_id)}
          >Delete</button>

      
      
       
        </div>
      

      </div>
    </div>
  );
};

export default ManageBlogCard;
