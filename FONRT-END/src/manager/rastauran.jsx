import React, { useState, useEffect,useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import defaultBanner from "../imgs/blog banner.png";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import AnimationWrapper from "../common/page-animation";
import InputLabel from "@mui/material/InputLabel";
import { theme } from "../itemsMui/thomeMui";
import { Reload } from "../function/categoryFunction";
import { Insert, GetRestaurantAllByIdUser, Remove } from "../function/Restaurants.api";
import { ReloadMg } from "../function/manager.Api";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
// ... rest of your code

const Restaurants = () => {
  const { userAuth: { access_token,user_id,user_name,state} } = useContext(UserContext);

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
    if (e.target.name === "category") {
      setSelectedCategory(e.target.value);
    }

     
  };
  //  console.log(isData);

  const [isGetcategory, setGetcategory] = useState([]);
  const [isGetData, setGetData] = useState([]);
  const [isGetDataManager, setGetDataManager] = useState([]);

  useEffect(() => {
if(user_id){
  loadData();
 
}
    loadCate();
    
    loadManager();
  }, [user_id]);

  
  // Define function to load category data
  const loadCate = async () => {
    Reload()
      .then((res) => setGetcategory(res.data))
      .catch((err) => console.log(err));
  };

  const loadData = async () => {
    GetRestaurantAllByIdUser(user_id)
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  };

  // console.log(isGetData)

  const loadManager = async () => {
    ReloadMg()
      .then((res) => setGetDataManager(res.data))
      .catch((err) => console.log(err));
  };

// console.log(isData);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Validate form fields
    const requiredFields = ["image", "code", "name", "category", "connect"];
    for (const field of requiredFields) {
      if (!isData[field]) {
        toast.error(`ກະລຸນາໃສ່${field.replace('_', ' ')} ກ່ອນ`);
        return;
      }
    }

    // Check if the provided mg_code matches the mg_code from the manager data
    const manager = isGetDataManager.find((manager) => manager.mg_code === isData.code);
    if (!manager) {
      toast.error("ຂໍອະໄພ: ລະຫັດໂຄດບໍ່ຖືກຕ້ອງ ກຮຸນາລອງໃຫ່ມ");
      return;
    }

    // Construct FormData object
    const form = new FormData();
    for (const key in isData) {
      form.append(key, isData[key]);
    }
    form.append("user_id", user_id); // Add user_id to the form data

    // console.log("file", form);
    const res = await Insert(form);
    // console.log(res.data);
    loadData();
    toast.success("ບັນທຶກຊ້ອມູນສຳເລັດແລ້ວ");
  } catch (error) {
    console.error(error);
    toast.error("ຂໍອະໄພ: ບັນທືກບໍ່ສຳເລັດ");
  }
};
  
useEffect(() => {
  loadCate();
  loadData();
  loadManager();
}, []);

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
            loadData();
           return toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
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
        <span className=" flex justify-center font-bold text-center py-2 md:text-3xl text-xl">
            ຈັດການຂໍ້ມູນຮ້ານອາຫານ
          </span>
          <div className="mx-auto max-w-[900px] w-full">
            <form
              action=""
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="flex w-full flex-col mt-5 font-bold">
              <div className="flex justify-end p-2 text-dark-grey/40">
              <p>ຜູ້ລົງທະບຽນ: {user_name}</p>
              </div>
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
                      name="image"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                </div>
                <div className="flex w-full flex-col mt-4 gap-4 font-bold">
                  
                  <div className="w-full flex flex-col md:flex-row gap-3">
                    <TextField
                      id="filled-multiline-flexible"
                      label="ລະຫັດcode:MGX***"
                      multiline
                      maxRows={7}
                      variant="filled"
                      name="code"
                      onChange={(e) => handleChange(e)}
                      className="w-full"
                    />
                    <TextField
                      id="filled-multiline-flexible"
                      label="ຊື່ຮ້ານອາຫານ"
                      multiline
                      maxRows={7}
                      variant="filled"
                      name="name"
                      onChange={(e) => handleChange(e)}
                      className="w-full"
                  />
                  </div>
                  
                {/* // todo new add start  */}
                     <TextField
                  id="filled-multiline-flexible"
                  label="ປະເພດເມນູ"
                  multiline
                  rows={2}
                  variant="filled"
                  name="menu"
                  onChange={(e) => handleChange(e)}
                />
                 
                   <div className="w-full flex  gap-3">
                   <TextField
                    label="ເລີມເວລາເປີດ"
                    InputLabelProps={{
                      shrink: true,
                    }}
                      className="w-full"
                      id="filled-multiline-flexible"
                      required
                      type="time"
                      maxRows={7}
                      variant="filled"
                      name="open"
                      onChange={(e) => handleChange(e)}
                    />
                    
                    <TextField
                      label="ເວລາປິດ"
                      className="w-full"
                      id="filled-multiline-flexible"
                      
                     InputLabelProps={{
                      shrink: true,
                     }}
                      required
                      type="time"
                      maxRows={7}
                      variant="filled"
                      name="close"
                      onChange={(e) => handleChange(e)}
                    />
                   </div>
                 

                  <div className="w-full flex flex-col md:flex-row gap-3">
                    <TextField
                      id="filled-select-currency"
                      select
                      label="ເລືອກປະເພດ"
                      name="category"
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
                    <TextField
                      id="filled-multiline-flexible"
                      type="number"
                      label="ລາຄາ"
                      multiline
                      variant="filled"
                      name="price"
                      onChange={(e) => handleChange(e)}
                      className="w-full"
                    />
                  </div>

                  <div className="w-full flex flex-col md:flex-row gap-3">
                      <TextField
                        id="filled-multiline-flexible"
                        label="ຂໍ້ມູນຕິດຕໍ່ສອບຖາມ Tel or Email"
                        multiline
                        maxRows={7}
                        variant="filled"
                        name="connect"
                        onChange={(e) => handleChange(e)}
                        className="w-full"
                      />
                      <TextField
                      id="filled-multiline-flexible"
                      label="ເວບໄຊ"
                      multiline
                      maxRows={7}
                      variant="filled"
                      name="website"
                      onChange={(e) => handleChange(e)}
                      className="w-full"
                    />
                  </div>

                  <TextField
                    id="filled-multiline-flexible"
                    label="ຕຳແໜ່ງທີ່ຢູ່(map)"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="address"
                    onChange={(e) => handleChange(e)}
                  />
        
                <TextField
                  id="filled-multiline-flexible"
                  label="ທີຕັ້ງ"
                  multiline
                  maxRows={7}
                  variant="filled"
                  name="location"
                  onChange={(e) => handleChange(e)}
                />
                
  
                  <TextField
                    id="filled-multiline-static"
                    label="ຄຳອທີບາຍເພີ້ມເຕີມ"
                    multiline
                    maxRows={17}
                    variant="filled"
                    name="description"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="flex w-full gap-2 mt-5">
                   
                <button
                      type="reset"
                       onClick={cleanText}
                      className="flex justify-center items-center gap-2 p-2 w-full bg-gradient-to-t from-red to-red/75 rounded-lg text-xl text-white font-bold hover:opacity-80"
                    >
                      Clear
                    </button>

                    <button
                      type="submit"
                      className="flex justify-center items-center gap-2 p-2 w-full bg-gradient-to-t from-teal-600 to-teal-300 rounded-lg text-xl text-white font-bold hover:opacity-80"
                    >
                      ບັນທືກຂໍ້ມູນ
                    </button>
                   
                  </div>
                  <Link
                  to="/image-data"
                   className="w-full mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm md:text-xl font-medium rounded-md  underline"
                  >ອັບຮູບພາບ</Link>
              </div>
            </form>
          </div>

          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg mx-auto max-w-[90%] w-full  ">
          <span className=" flex justify-center items-center text-center py-4 md:text-2xl text-xl font-semibold  ">ຕາຕະລາງຂໍ້ມູນຮ້ານອາຫານ</span>
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
                    Name-Manager
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                   Menu
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Category
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
                  <th scope="col" className="px-6 py-3 truncate ">
                   Website
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                   Location
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
                            to={"/editrestaurant/" + items.rest_id}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-ss-edit text-2xl"></i>
                          </Link>
                          <Link
                            to="#"
                            onClick={() => handleRemove(items.rest_id)}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-sr-delete text-2xl text-red"></i>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <img
                            className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
                            src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                              items.rest_image
                            }`}
                            alt={items.rest_name}
                          />
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.mg_fullname}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_name}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_menu}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.category_name}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_open}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_close}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_website}
                        </td>
                        <td className="px-6 py-4 truncate max-w-xs">
                          {items.rest_location}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.rest_connect}
                        </td>
                        <td className="px-6 py-4 truncate max-w-xs">
                          {items.rest_address}
                        </td>
                        <td className="px-6 py-4 truncate max-w-xs">
                          {items.rest_description}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.created_time}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.mg_code}
                        </td>
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
};

export default Restaurants;
