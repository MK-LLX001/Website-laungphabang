import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import defaultBanner from "../imgs/blog banner.png";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import AnimationWrapper from "../common/page-animation";
import InputLabel from "@mui/material/InputLabel";
import { theme } from "../itemsMui/thomeMui";
import { Reload } from "../function/categoryFunction";
import {
  Insert,
 
  GetHotelsAllByIdUser,
  Remove,
} from "../function/hotel.function.api";
import { ReloadMg } from "../function/manager.Api";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
// ... rest of your code

function Hotels() {
  const {
    userAuth: { access_token, user_id, state, user_name },
  } = useContext(UserContext);

  if (access_token === null) {
    return <Navigate to="/signin" />;
  } else if (state === "user") {
    return <Navigate to="/" />;
  }

  // TODO: Review image alter uploadImages
  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setimge] = useState(null);
  const [isData, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(""); // Controlled input for category

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

    // Update selectedCategory if using controlled input
    if (e.target.name === "category_id") {
      setSelectedCategory(e.target.value);
    }

    // console.log(isData);
  };

  const [isGetcategory, setGetcategory] = useState([]);
  const [isGetData, setGetData] = useState([]);
  const [isGetDataManager, setGetDataManager] = useState([]);
  // Load category data on component mount
  useEffect(() => {
    loadCate();
    loadData();
    loadManager();
  }, []);

  // Define function to load category data
  const loadCate = async () => {
    Reload()
      .then((res) => setGetcategory(res.data))
      .catch((err) => console.log(err));
  };

  const loadData = async () => {
    try {
      const res = await GetHotelsAllByIdUser(user_id);
      setGetData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(isGetData)

  const loadManager = async () => {
    ReloadMg()
      .then((res) => {
        // Assuming res.data is an array
        setGetDataManager(res.data);
      })
      .catch((err) => console.log(err));
  };

  // console.log("manager:",JSON.stringify(isGetDataManager))
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isData);

    if (!isData.img_image) {
      toast.error("ທ່ານຕ້ອງເລືອກຮູບກ່ອນ ");
      return;
    } else if (!isData.mg_code) {
      toast.error("ທ່ານຕ້ອງໃສລະຫັດ code ");
      return;
    } else if (!isData.ht_name) {
      toast.error("ກະຮຸນາໃສ່ຊື່ກ່ອນ ");
      return;
    } else if (!isData.ht_connection) {
      toast.error("ກະຮຸນາໃສຊອງທາງຕິດຕໍ ");
      return;
    } else if (!isData.category_id) {
      toast.error("ກະຮຸນາໃສຊອງປະເພດສະຖານທີ່ກ່ອນ ");
      return;
    }

    // Check if the provided mg_code matches the mg_code from the manager data
    const manager = isGetDataManager.find(
      (manager) => manager.mg_code === isData.mg_code
    );

    if (manager) {
      // If the mg_code matches, proceed with the insertion
      console.log("Manager found:", manager);
      const formWithData = new FormData();
      for (const key in isData) {
        formWithData.append(key, isData[key]);
      }
      formWithData.append("user_id", user_id);
      console.log(formWithData);

      Insert(formWithData)
        .then((res) => {
          console.log(res.data);
          loadData();
          toast.success("ບັນທຶກຊ້ອມູນສຳເລັດແລ້ວ");
        })
        .catch((err) => {
          console.log(err);
          toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
        });
    } else {
      // If the mg_code does not match, display an error message
      toast.error("ຂໍອະໄພ: ລະຫັດໂຄດບໍ່ຖືກຕ້ອງ ກຮຸນາລອງໃຫ່ມ");
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
            loadCate();
    loadData();
    loadManager();
            toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const cleanText = () => {
    setData({});
    setPreviewImage(null);
    setSelectedCategory("");
    document.getElementById("uploadBanner").value = null;
  };

  

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div className=" py-4 px-[5vw] md:px-[2vw]">
          <span className=" flex justify-center font-bold text-center py-4 md:text-3xl text-xl">
            ຕາຕະລາງຂໍ້ມູນໂຮງແຮມ
          </span>
         
          <div className="mx-auto max-w-[900px] w-full">
          <div className="flex justify-end p-2 text-dark-grey/40">
              <p>ຜູ້ລົງທະບຽນ: {user_name}</p>
              </div>
            <form
              action=""
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="flex w-full flex-col mt-5 font-bold">
                <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey ">
                  <label htmlFor="uploadBanner">
                    {previewImage ? (
                      <img src={previewImage} className="z-20" alt="Preview" />
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
                <div className="flex w-full flex-col mt-4 gap-4 font-bold">
                  <TextField
                    id="filled-multiline-flexible"
                    label="code exam MGX*** "
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="mg_code"
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="w-full flex flex-col md:flex-row gap-3">
                    <TextField
                      id="filled-multiline-flexible"
                      label="ຊື່ໂຮງແຮມ"
                      multiline
                      maxRows={7}
                      variant="filled"
                      name="ht_name"
                      onChange={(e) => handleChange(e)}
                      className="w-full"
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="ລາຄາ"
                      type="number"
                      maxRows={7}
                      variant="filled"
                      name="ht_price"
                      onChange={(e) => handleChange(e)}
                      className="w-full"
                    />
                  </div>

                  <div className="w-full flex gap-3">
                    <TextField
                      id="datetime-local"
                      label="ເລີມເວລາເປີດ"
                      type="time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="ht_open"
                      onChange={(e) => handleChange(e)}
                      variant="filled"
                      className="w-full"
                    />
                    <TextField
                      id="datetime-local"
                      label="ເວລາປິດ"
                      type="time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="ht_close"
                      onChange={(e) => handleChange(e)}
                      variant="filled"
                      className="w-full"
                    />
                  </div>

                  <TextField
                    id="filled-multiline-flexible"
                    label="ຕຳແໜ່ງທີ່ຢູ່(map)"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="ht_address"
                    onChange={(e) => handleChange(e)}
                  />
                  {/* // todo new add start  */}
                  <TextField
                    id="filled-multiline-flexible"
                    label="ທີຕັ້ງ"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="ht_location"
                    onChange={(e) => handleChange(e)}
                  />

                  <TextField
                    id="filled-multiline-flexible"
                    label="ເວບໄຊ"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="ht_website"
                    onChange={(e) => handleChange(e)}
                    className="w-full"
                  />
                  <div className="w-full flex flex-col md:flex-row gap-3">
                    <TextField
                      id="filled-multiline-flexible"
                      label="ຂໍ້ມູນຕິດຕໍ່ສອບຖາມ"
                      multiline
                      maxRows={7}
                      variant="filled"
                      name="ht_connection"
                      onChange={(e) => handleChange(e)}
                      className="w-full"
                    />

                    <TextField
                      id="filled-select-currency"
                      select
                      label="ເລືອກປະເພດສະຖານທີ່"
                      name="category_id"
                      value={selectedCategory}
                      onChange={(e) => handleChange(e)}
                      variant="filled"
                      className="w-full"
                    >
                      {isGetcategory.map((option) => (
                        <MenuItem
                          key={option.category_name}
                          value={option.category_id}
                        >
                          {option.category_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  {/* // todo new add start  */}
                  <TextField
                    id="filled-multiline-static"
                    label="ຄຳອທີບາຍເພີ້ມເຕີມ"
                    multiline
                    maxRows={17}
                    defaultValue=""
                    variant="filled"
                    name="ht_description"
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="ສີງອຳນວນຄວາມສະດວກ"
                    multiline
                    rows={2}
                    variant="filled"
                    name="ht_convenience"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="flex w-full gap-2 mt-5">
                  <button
                    type="submit"
                    className="flex justify-center items-center gap-2 p-2 w-full bg-gradient-to-t from-teal-600 to-teal-300 rounded-lg text-xl text-white font-bold hover:opacity-80"
                  >
                    ບັນທືກຂໍ້ມູນ
                  </button>
                  <button
                      type="reset"
                      onClick={cleanText}
                    className="flex justify-center items-center gap-2 p-2 w-full bg-gradient-to-t from-red to-red/75 rounded-lg text-xl text-white font-bold hover:opacity-80"
                  >
                    Clear
                  </button>
                </div>
                <Link
                  to="/image-data"
                  className="w-full mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm md:text-xl font-medium rounded-md  underline"
                >
                  ອັບຮູບພາບ
                </Link>
              </div>
            </form>
          </div>



          {/* TODO: TABLE  */}
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <span className=" flex justify-center font-bold text-center py-4 md:text-3xl text-xl">
              ຕາຕະລາງຂໍ້ມູນໂຮງແຮມ
            </span>
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
                    Manager
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Hotel
                  </th>

                  <th scope="col" className="px-6 py-3 truncate">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Open
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Close
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                    Connect
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    website
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Convenience
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                    Adresss
                  </th>

                  <th scope="col" className="px-6 py-3 truncate ">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Time-post
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Code
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
                            to={"/edithotel/" + items.ht_id}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-ss-edit text-2xl"></i>
                          </Link>
                          <Link
                           
                            onClick={() => handleRemove(items.ht_id)}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-sr-delete text-2xl text-red"></i>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <img
                            className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
                            src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                              items.img_image
                            }`}
                            alt={items.ht_name}
                          />
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.mg_name}
                        </td>
                        <td className="px-6 py-4 truncate">{items.ht_name}</td>
                        <td className="px-6 py-4 truncate">
                          {items.category_name}
                        </td>
                        <td className="px-6 py-4 truncate">{items.ht_price}</td>
                        <td className="px-6 py-4 truncate">{items.ht_open}</td>
                        <td className="px-6 py-4 truncate">{items.ht_close}</td>
                        <td className="px-6 py-4 truncate">
                          {items.ht_connection}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.ht_website}
                        </td>
                        <td className="px-6 py-4 truncate  max-w-xs">
                          {items.ht_location}
                        </td>
                        <td className="px-6 py-4 truncate  max-w-xs">
                          {items.ht_convenience}
                        </td>
                        <td className="px-6 py-4 truncate  max-w-xs">
                          {items.ht_address}
                        </td>
                        <td className="px-6 py-4 truncate  max-w-xs">
                          {items.ht_description}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.time_created}
                        </td>
                        <td className="px-6 py-4 truncate">{items.mg_code}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
}

export default Hotels;
