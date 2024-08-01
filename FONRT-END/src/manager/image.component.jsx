import React, { useState, useEffect, useContext } from "react";
import defaultBanner from "../imgs/blog banner.png";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../App";
import {
  GetimgByIdUser,
  Insertimg,
  Removeimg,
  GetHotelAndRestauByUserId,
  GetAllItems,
  LoadImg,
} from "../function/image.api";

const Images = () => {
  const {
    userAuth: { user_name, user_id, state },
  } = useContext(UserContext);

  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setimge] = useState(null);

  const [imagData, setImgData] = useState({});
  const [AllitemImg, setAllitemImg] = useState({});
  const [dataHotelsAndRestaurants, setDataHotelsAndRestauants] = useState([]);
  const [Allitems, setAllitems] = useState([]);
  const [selectedDatas, setSelectedDatas] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setimge(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
      setImgData({ ...imagData, [e.target.name]: selectedFile });
    } else {
      setImgData({ ...imagData, [e.target.name]: e.target.value });
    }

    if (e.target.name === "img_name") {
      setSelectedDatas(e.target.value);
    }
  };

  const [getmages, setgetImages] = useState([]);
  useEffect(() => {
    loadimg();
    LoardDataHotelsAndRestauants();
    LoadGetAllItems();
    LoadimgAllitems();
  }, []);

  const loadimg = async () => {
    GetimgByIdUser(user_id)
      .then((res) => setgetImages(res.data))
      .catch((err) => console.log(err));
  };
  const LoadimgAllitems = async () => {
    LoadImg()
      .then((res) => setAllitemImg(res.data))
      .catch((err) => console.log(err));
  };

  const LoardDataHotelsAndRestauants = async () => {
    GetHotelAndRestauByUserId(user_id)
      .then((res) => setDataHotelsAndRestauants(res.data))
      .catch((err) => console.log(err));
  };
  const LoadGetAllItems = async () => {
    GetAllItems()
      .then((res) => setAllitems(res.data))
      .catch((err) => console.log(err));
  };
  // console.log("dataHR" + JSON.stringify(Allitems));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formWithimageData = new FormData();
    for (const key in imagData) {
      formWithimageData.append(key, imagData[key]);
    }
    formWithimageData.append("user_id", user_id);

    Insertimg(formWithimageData)
      .then((res) => {
        toast.success("Image saved successfully");
        loadimg();
      })
      .catch((err) => {
        console.log(err);
        toast.error("ທ່ານຕ້ອງປ້ອນຂໍ້ມູນທິງໝົດ");
      });
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
        Removeimg(id)
          .then((res) => {
           
            toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
            loadimg();
            LoardDataHotelsAndRestauants();
            LoadGetAllItems();
            LoadimgAllitems();
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
          <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="py-4 px-[5vw] md:px-[2vw]">
              <div className="mx-auto max-w-[900px] w-full">
                <div className="flex w-full flex-col mt-5 font-bold">
                  <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                    <label htmlFor="uploadBanner">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          className="z-20"
                          alt="Preview"
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
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <div className="flex w-full flex-col mt-4 gap-4 font-bold">
                    {state === "manager" ? (
                      <TextField
                        id="filled-select-currency"
                        select
                        label="ຊື່ຮູບພາບ"
                        name="img_name"
                        value={selectedDatas}
                        onChange={handleImageChange}
                        variant="filled"
                      >
                        {dataHotelsAndRestaurants &&
                          dataHotelsAndRestaurants.map((option) => (
                            <MenuItem key={option.names} value={option.names}>
                              {option.names}
                            </MenuItem>
                          ))}
                      </TextField>
                    ) : state === "admin" ? (
                      <TextField
                        id="filled-select-currency"
                        select
                        label="ຊື່ຮູບພາບ"
                        name="img_name"
                        value={selectedDatas}
                        onChange={handleImageChange}
                        variant="filled"
                      >
                        {Allitems &&
                          Allitems.map((option) => (
                            <MenuItem key={option.names} value={option.names}>
                              {option.names}
                            </MenuItem>
                          ))}
                      </TextField>
                    ) : null}
                  </div>
                  <div className="flex justify-center w-full mt-4">
                    <button
                      type="submit"
                      className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      save
                    </button>
                    <button
                      type="button"
                      className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <hr className="h-2 mt-4 rounded-lg bg-gradient-to-r from-pink-600 to-blue-500" />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-white uppercase bg-dark-grey">
                <tr>
                  <th scope="col" className="px-6 py-3 w-10">
                    ລຳດັບ
                  </th>
                  <th scope="col" className="px-6 py-3 w-52">
                    ຮຸບພາບ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ຊື້ຮູບພາບ
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
  {state === "manager" ? (
    getmages && getmages.length > 0 ? (
      getmages.map((items, index) => (
        <tr key={index} className="bg-white border-b">
          <td className="px-6 py-4">{index + 1}</td>
          <td className="px-6 py-4">
            <img
              className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
              src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${items.img_image}`}
              alt={items.img_name}
            />
          </td>
          <td className="px-6 py-4">{items.img_name}</td>
          <td className="px-1 py-2">
            <Link
              to={`/editimages/${items.img_id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </Link>
          </td>
          <td className="px-1 py-2">
            <button
              onClick={() => handleRemove(items.img_id)}
              className="font-medium text-red-600 dark:text-blue-500 hover:underline"
            >
              Remove
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center">No images available</td>
      </tr>
    )
  ) : state === "admin" ? (
    AllitemImg && AllitemImg.length > 0 ? (
      AllitemImg.map((items, index) => (
        <tr key={index} className="bg-white border-b">
          <td className="px-6 py-4">{index + 1}</td>
          <td className="px-6 py-4">
            <img
              className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
              src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${items.img_image}`}
              alt={items.img_name}
            />
          </td>
          <td className="px-6 py-4">{items.img_name}</td>
          <td className="px-1 py-2">
            <Link
              to={`/editimages/${items.img_id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </Link>
          </td>
          <td className="px-1 py-2">
            <button
              onClick={() => handleRemove(items.img_id)}
              className="font-medium text-red-600 dark:text-blue-500 hover:underline"
            >
              Remove
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center">No images available</td>
      </tr>
    )
  ) : null}
</tbody>

            </table>
          </div>
        </section>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default Images;
