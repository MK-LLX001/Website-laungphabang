import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import defaultBanner from "../imgs/blog banner.png";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import AnimationWrapper from "../common/page-animation";
import InputLabel from "@mui/material/InputLabel";
import { theme } from "../itemsMui/thomeMui";
import { ReadById, Update } from "../function/hotel.function.api";
import { ReloadMg } from "../function/manager.Api";
import { Reload } from "../function/categoryFunction";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../App";


const HotelEdit = () => {
  const params = useParams();
  //   console.log(params.id);
  const { userAuth: { access_token,user_id,state,user_name } } = useContext(UserContext);

  if (access_token === null) {
    return <Navigate to="/signin" />;
   } else if (state === "user") {
   return <Navigate to="/" />;
   }
const navgate = useNavigate();

  // TODO: Review image alter uploadImages
  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setimge] = useState(null);
  // TODO: get datas inputs from ui and data default 
  const [selectedCategory, setSelectedCategory] = useState(""); // ส้างมาเกับค่าทีเราต้ิงกานป้อน ข้อมุนให่ม
  const [isData, setData] = useState({
    mg_code: "",
    ht_name: "",
    ht_price: 0,
    ht_open: "",
    ht_close: "",
    ht_address: "",
    ht_location: "",
    ht_website: "",
    ht_connection: "",
    ht_description: "",
  });

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
  };
// console.log(isData);

  // FIXME: varibles category only get from db
  const [isGetcategory, setGetcategory] = useState([]);
  
 //  FIXME: set get file image old
  const [fileOld, setFileOld] = useState(); 
  // FIXME: set file image get from db
  const [isGetDataManager, setGetDataManager] = useState([]); // ມາເກັບ data manager
  // Load category data on component mount
  useEffect(() => {
    loadData(params.id);
    loadCate(params.id);
    loadManager();
  }, []);
  // feact data hotels from db  
  const loadData = async () => {
    try {
      const hotelData = await ReadById(params.id);
      setData(hotelData.data[0]); // Set place data
      setFileOld(hotelData.data[0].img_image);
      setSelectedCategory(hotelData.data[0].category_id); // Set selected category
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  // console.log("file old "+fileOld);

//  feact data category from db 
  const loadCate = async () => {
    Reload()
      .then((res) => setGetcategory(res.data))
      .catch((err) => console.log(err));
  };

  // console.log(selectedCategory);
  const loadManager = async () => {
    ReloadMg()
      .then((res) => setGetDataManager(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(isData);
   if(!isData.img_image) {
      toast.error("ທ່ານຕ້ອງເລືອກຮູບກ່ອນ ");
      return;
    } else  if(!isData.mg_code){
      toast.error("ທ່ານຕ້ອງໃສລະຫັດ code ");
      return;
    } else if (!isData.ht_name) {
      toast.error("ກະຮຸນາໃສ່ຊື່ກ່ອນ ");
      return;
    }else if(!isData.ht_connection) {
      toast.error("ກະຮຸນາໃສຊອງທາງຕິດຕໍ ");
      return;
    }else if(!isData.category_id) {
      toast.error("ກະຮຸນາໃສຊອງປະເພດສະຖານທີ່ກ່ອນ ");
      return;
    }else if(!isData.ht_price) {
      toast.error("ກະຮຸນາໃສລາຄາ ");
      return;
    }

    // Check if the provided mg_code matches the mg_code from the manager data
    const manager = isGetDataManager.find(
      (manager) => manager.mg_code === isData.mg_code
    );

    console.log("code definded"+manager);
    if (manager) {
      // If the mg_code matches, proceed with the insertion
      console.log("Manager found:", manager);
      const formwithData = new FormData();
      for (const key in isData) {
        formwithData.append(key, isData[key]);
      }
      formwithData.append('fileold',fileOld);
      // console.log(formWithImageData);

        Update(params.id, formwithData)
          .then((res) => {
            console.log(res.data);
            loadData();
            toast.success("ບັນທຶກຊ້ອມູນສຳເລັດແລ້ວ");

           if(state === 'manager'){
            navgate("/hotelsdata");
           } else if(state === 'admin'){
            navgate("/admin/Datas-hotels");
           }

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

  // console.log("mg_code value:", isData.mg_code);

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div className=" py-4 px-[5vw] md:px-[2vw]">
          <div className="mx-auto max-w-[900px] w-full">
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
                    ) : isData.img_image ? (
                      <img
                        src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                          isData.img_image
                        }`}
                        alt={isData.ht_name}
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
                <div className="flex w-full  flex-col mt-4 gap-4 font-bold">
                  <TextField
                    id="filled-multiline-flexible"
                    label="code exam MGX***"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="mg_code"
                    value={isData.mg_code}
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
                  value={isData.ht_name} // Set an empty string if ht_name is undefined
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
                   value={isData.ht_price}
                    onChange={(e) => handleChange(e)}
                    className="w-full"
                  />
                 </div>
                  <div className="w-full flex gap-3">
                    <TextField
                      id="datetime-local"
                      label="ເລີມເວລາເປີດ"
                      type="time"
                      value={isData.ht_open}
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
                      value={isData.ht_close}
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
                    label="ຕຳແໜ່ງທີ່ຢູ່"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="ht_address"
                    value={isData.ht_address}
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
                  value={isData.ht_location}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  id="filled-multiline-flexible"
                  label="ເວບໄຊ"
                  multiline
                  maxRows={7}
                  variant="filled"
                  name="ht_website"
                  value={isData.ht_website}
                  onChange={(e) => handleChange(e)}
                />
            <div className="w-full flex flex-col md:flex-row gap-3">
            <TextField
                    id="filled-multiline-flexible"
                    label="ຂໍ້ມູນຕິດຕໍ່ສອບຖາມ"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="ht_connection"
                    value={isData.ht_connection}
                    onChange={(e) => handleChange(e)}
                    className="w-full"
                  />

                  <TextField
                    id="filled-select-currency"
                    select
                    label="ເລືອກປະເພດສະຖານທີ່"
                    name="category_id"
                    value={selectedCategory} // Provide an empty string as the default value
                    onChange={(e) => handleChange(e)}
                    variant="filled"
                    className="w-full"
                  >
                    {isGetcategory.map((option) => (
                      <MenuItem
                        key={option.category_id}
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
                    maxRows={17}
                    variant="filled"
                    name="ht_description"
                    value={isData.ht_description}
                    onChange={(e) => handleChange(e)}
                  />
                    <TextField
                  id="filled-multiline-flexible"
                  label="ສີງອຳນວນຄວາມສະດວກ"
                  multiline
                  maxRows={7}
                  value={isData.ht_convenience}
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
                      ອັບເດດຂໍ້ມູນ
                    </button>
                    {/* <button
                      type="button"
                    
                      className="flex justify-center items-center gap-2 p-2 w-full bg-gradient-to-t from-red to-red/75 rounded-lg text-xl text-white font-bold hover:opacity-80"
                    >
                      Clear
                    </button> */}
                  </div>
              </div>
            </form>
          </div>
        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
};
export default HotelEdit;
