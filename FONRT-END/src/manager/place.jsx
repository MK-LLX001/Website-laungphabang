import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import defaultBanner from "../imgs/blog banner.png";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import AnimationWrapper from "../common/page-animation";
import InputLabel from "@mui/material/InputLabel";
import { theme } from "../itemsMui/thomeMui";
import { Reload } from "../function/categoryFunction";
import { Insert, loadPlace, Remove } from "../function/place.function.Api";
import { Link, Navigate } from "react-router-dom";

// ... rest of your code

const  CRUD_Places =() => {
  const { userAuth: { access_token,user_id,state,user_name} } = useContext(UserContext);

  if (access_token === null) {
   return <Navigate to="/signin" />;
  } else if (state === "user" || state === "manager") {
  return <Navigate to="/" />;
  }
  // console.log(state)

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
  // Load category data on component mount
  useEffect(() => {
    loadCate();
    loadData();
  }, []);

  // Define function to load category data
  const loadCate = async () => {
    Reload()
      .then((res) => setGetcategory(res.data))
      .catch((err) => console.log(err));
  };
  const loadData = async () => {
    loadPlace()
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  };

  // console.log(isGetData)
  const handleSubmit = (e) => {
      try {
        e.preventDefault();
        // console.log(isData);
        if (!isData.pl_name) {
         return toast.error("ທ່ານຕ້ອງໃສ່ຊື່ສະຖານທີ່ກ່ອນ");
        } else if (!isData.sesion) {
         return toast.error("ເລືອກSesion");
        } else if (!isData.pl_address) {
         return toast.error("ທ່ານຕ້ອງໃສ່ທີ່ຢູ່ສະຖານທິ່ກ່ອນ");
        } else if (!isData.pl_description || !isData.pl_warning) {
         return toast.error("ທ່ານຕ້ອງໃສ່ຄຳອະທິບາຍ ແລະ ຄຳແນະນຳ");
        } else if (!isData.pl_price) {
        return  toast.error("ທ່ານຕ້ອງໃສ່ລາຄາສະຖານທີ່ກ່ອນ");
        }
        
    
      const formWithimageData = new FormData();
        for (const key in isData) {
          formWithimageData.append(key, isData[key]);
        }
        formWithimageData.append('user_id',user_id);
        // console.log(formWithimageData);
    
        Insert(formWithimageData)
          .then((res) => {
            console.log(res.data);
            loadData();
           return toast.success("ບັນທືກຂໍ້ມູນສຳເລັດແລ້ວ");
          })
          .catch((err) => {
            console.log(err);
           return toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
          });
      } catch (error) {
        console.log(error+"ບັນທືກບໍສຳເລັດ");
       return toast.error("ບໍ່ສາມາດບັນທືກຂໍ້ມູນໄດ້");
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
            loadData();
          return  toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
          })
          .catch((err) => {
            console.log(err)
          return  toast.error("ເກີດຂໍ້ຜິດຜາດໃນການລືບຂໍ້ມູນ");
          });
        
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
      <div className="py-4 px-[5vw] md:px-0">
      <span className=" flex justify-center font-bold text-center py-4 md:text-3xl text-xl ">ຕາຕະລາງຂໍ້ມູນສະຖານທີທອງທຽ່ວ</span>
          <div className="mx-auto max-w-[75%] w-full">
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
                      name="img_image"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                </div>
                <div className="flex w-full flex-col mt-4 gap-3 font-bold">

                 <div className="w-full flex flex-col md:flex-row gap-3">
                 <TextField
                    id="filled-multiline-flexible"
                    label="ຊື່ສະຖານທີ່ແຫ່ງທອງທຽ່ວ"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="pl_name"
                    onChange={(e) => handleChange(e)}
                    className="w-full"
                  />
                  <TextField
                    id="filled-select-currency"
                    select
                    label="ເໝາະສົມກິບລະດູການ"
                    name="sesion"
                    onChange={(e) => handleChange(e)}
                    variant="filled"
                    fullWidth
                    className="w-1/2"
                  >
                    <MenuItem value="ລະດູຝົນ">ລະດູຝົນ</MenuItem>
                    <MenuItem value="ໄດ້ທູກລະດູການ">ໄດ້ທູກລະດູການ</MenuItem>
                    <MenuItem value="ລະດູແລ້ງ">ລະດູແລ້ງ</MenuItem>
                  </TextField>
                 </div>

                  <div className="w-full flex gap-3">
                    <TextField
                      id="datetime-local"
                      label="ເລີມເວລາເປີດ"
                      type="time"
                  
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="pl_startime"
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
                      name="pl_endtime"
                      onChange={(e) => handleChange(e)}
                      variant="filled"
                      className="w-full"
                    />
                  </div>

                  <TextField
                    id="filled-multiline-flexible"
                    label="ຕຳແໜ່ງທີ່ຢູ່"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="pl_address"
                    onChange={(e) => handleChange(e)}
                  />
                   <div className="w-full flex flex-col md:flex-row gap-3">
                   <TextField
                    id="filled-multiline-flexible"
                    type="number"
                    label="ລາຄາ"
                    multiline
                   
                    variant="filled"
                    name="pl_price"
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

                  <TextField
                    id="filled-multiline-static"
                    label="ຄຳອທີບາຍເພີ້ມເຕີມ"
                    multiline
                    maxRows={20}
                    variant="filled"
                    name="pl_description"
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    id="filled-multiline-static"
                    label="ຄຳແນະນຳທີ່ຕ້ອງຮູ້"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="pl_warning"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

               
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
                  >ອັບຮູບພາບ</Link>
            </form>

           
          </div>

          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg mx-auto max-w-[90%] w-full">
              <span className="flex justify-center font-bold text-center py-4 md:text-3xl text-xl ">ຕາຕະລາງຂໍ້ມູນສະຖານທີທອງທຽ່ວ</span>
              <table className="  text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                  <th scope="col" className="px-6 py-3 truncate">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Pictures
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Names
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                     Sesion
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Start-Time
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      End-Time
                    </th>
                    <th scope="col" className="px-6 py-3 truncate ">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 truncate ">
                      Adresss
                    </th>
                   
                    <th scope="col" className="px-6 py-3 truncate ">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 truncate ">
                      Warning
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
                           <td className="px-6 py-4">
                            <Link
                              to={"/editplace/"+items.pl_id}
                              className="p-3 font-medium text-blue-600  hover:underline"
                            >
                            <i className="fi fi-ss-edit text-2xl"></i>
                            </Link>
                            <Link
                              to="#"
                              onClick={() => handleRemove(items.pl_id)}
                              className="p-3 font-medium text-blue-600  hover:underline"
                            >
                            <i className="fi fi-sr-delete text-2xl text-red"></i>
                            </Link>
                          </td>

                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">
                            <img
                              className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
                              src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                                items.pl_img_image
                              }`}
                              alt={items.pl_name}
                            />
                          </td>
                          <td className="px-6 py-4 truncate">{items.pl_name}</td>
                          <td className="px-6 py-4 truncate">{items.sesion}</td>
                          <td className="px-6 py-4 truncate">{items.pl_startime}</td>
                          <td className="px-6 py-4 truncate">{items.pl_endtime}</td>
                          <td className="px-6 py-4 truncate">{items.pl_price}</td>
                          <td className="px-6 py-4 truncate">{items.category_name}</td>
                          <td className="px-6 py-4 truncate  max-w-xs">{items.pl_address}</td>
                         
                          <td className="px-6 py-4 truncate  max-w-xs">{items.pl_description}</td>
                          <td className="px-6 py-4 truncate  max-w-xs">{items.pl_warning}</td>

                         
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

export default CRUD_Places;
