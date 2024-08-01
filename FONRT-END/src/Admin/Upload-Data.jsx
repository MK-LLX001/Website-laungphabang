import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/lpb.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { Toaster, toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { theme } from "../itemsMui/thomeMui";
import { UserContext } from "../App"; 
import { ReadDefault, Remove, UpdateState } from "../function/function.upload.API";
import { getDay } from "../common/date";

const UploadData = () => {
  const [isGetData, setGetData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
   ReadDefault()
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  };

  const handleStateChange = async (id, newStatus) => {
    try {
      await UpdateState(id, newStatus);
      loadData();
      toast.success("User state updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
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
        <section className="container mx-auto p-4">
          {
            isGetData.length > 0 ? (
              isGetData.map((item, index) => (
                <div key={index} className="flex justify-center items-center w-full border-b border-grey pb-5 mb-4">
                  <Link to={`/blog/${item.up_id}`} className="flex gap-8 items-center w-full">
                    <div className="blog-post-card w-full">
                      <div className="card flex gap-2 items-center mb-7">
                        <img 
                          src={
                            item.user_profile_img && item.user_profile_img.startsWith("http")
                              ? item.user_profile_img
                              : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.user_profile_img}`
                          }
                          alt={item.user_name}
                          className="w-6 h-6 rounded-full" 
                        />
                        <p className="line-clamp-1">
                          {item.user_name} @{item.user_lastname}
                        </p>
                        <p className="">{getDay(item.time_created)}</p>
                      </div>
                      <p className="blog-title text-xl md:text-2xl">{item.up_name}</p>
                      <p className="my-3 text-xl leading max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
                        {item.up_description}
                      </p>
                      <div className="like-cate flex gap-2 mt-7">
                        <span className="btn-light py-1 px-4">{item.category_name}</span>
                        <span className="flex ml-4 items-center text-dark-grey">
                          <i className="fi fi-rr-social-network text-xl "></i> 
                        </span>
                        <span className="flex items-center gap-2 text-dark-grey">  {item.score_count} </span>
                      </div>
                    </div>
                    <div className="h-28 aspect-square bg-grey">
                      <img src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.img_image}`} alt="" className="w-full rounded h-full aspect-square object-cover" />
                    </div>
                  </Link>
                  <div className="flex flex-col items-center ml-2">
                    <button className="btn-remove-blog-post text-secondary dark bg-Secondary Dark w-28 h-14 rounded-md my-1 " onClick={() => handleRemove(item.up_id)}>
                      <i className="fi fi-rr-trash text-xl"></i>
                    </button>
                    <select
                      value={item.status}
                      onChange={(e) => handleStateChange(item.up_id, e.target.value)}
                      className="btn-approve-blog-post bg-blue-600 text-white flex justify-center items-center w-28 h-14 rounded-md"
                    >
                      <option >ເລືອກ</option>
                      <option value="ຜ່ານ">ຜ່ານ</option>
                      <option value="ປະຕິເສດ">ປະຕິເສດ</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <p>No DATA...</p>
            )
          }
        </section>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default UploadData;
