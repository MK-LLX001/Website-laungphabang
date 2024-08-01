import React, { useState, useEffect,useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import defaultBanner from "../imgs/blog banner.png";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import AnimationWrapper from "../common/page-animation";
import InputLabel from "@mui/material/InputLabel";
import { theme } from "../itemsMui/thomeMui";
import { ReadById, Update } from "../function/Restaurants.api";
import { ReloadMg } from "../function/manager.Api";
import { Reload } from "../function/categoryFunction";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../App";


const Edit_Restaurants = () => {

  const { userAuth: { access_token,user_id,user_name,state} } = useContext(UserContext);



  const params = useParams();
  //   console.log(params.id);
  const navigate = useNavigate()
  // console.log(params.id);

  // TODO: Review image alter uploadImages
  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setimge] = useState(null);
  // TODO: get datas inputs from ui and data default
  const [selectedCategory, setSelectedCategory] = useState(""); // ส้างมาเกับค่าทีเราต้ิงกานป้อน ข้อมุนให่ม
  const [isData, setData] = useState({});

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
  console.log(isData);

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
      const restaurantsData = await ReadById(params.id);
      const {
        mg_code,
        rest_name,
        rest_open,
        rest_close,
        category_id,
        rest_connect,
        rest_address,
        rest_description,
        rest_image,
        rest_menu,
        rest_website,
        rest_location,
        rest_price,
      } = restaurantsData.data[0];
      setData({
        code: mg_code,
        name: rest_name,
        open: rest_open,
        close: rest_close,
        category:category_id,
        connect: rest_connect,
        address: rest_address,
        description: rest_description,
        image: rest_image,
        menu: rest_menu,
        website: rest_website,
        location: rest_location,
        price: rest_price,
      });

      setFileOld(restaurantsData.data[0].rest_image);
      setSelectedCategory(restaurantsData.data[0].category_id); // Set selected category
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

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      // ตรวจสอบข้อมูล
      const requiredFields = [
        { field: 'image', message: "ທ່ານຕ້ອງເລືອກຮູບກ່ອນ " },
        { field: 'code', message: "ທ່ານຕ້ອງໃສລະຫັດ code " },
        { field: 'name', message: "ກະຮຸນາໃສ່ຊື່ກ່ອນ " },
        { field: 'category', message: "ກະຮຸນາໃສຊອງປະເພດສະຖານທີ່ກ່ອນ " },
        { field: 'connect', message: "ກະຮຸນາໃສຊອງທາງຕິດຕໍ " },
        { field: 'menu', message: "ກະຮຸນາໃສເມນູກ່ອນ " },
      ];
  
      for (const { field, message } of requiredFields) {
        if (!isData[field]) {
          toast.error(message);
          return;
        }
      }
  
      // ตรวจสอบ code ของ manager
      const manager = isGetDataManager.find(manager => manager.mg_code === isData.code);
  
      if (!manager) {
        toast.error("ລະຫັດ code ບໍ່ຖືກຕ້ອງ");
        return;
      }
  
      // สร้าง form data
      const formwithData = new FormData();
      for (const key in isData) {
        formwithData.append(key, isData[key]);
      }
      formwithData.append('fileold', fileOld);
  
      // อัปเดตข้อมูล
      const res = await Update(params.id, formwithData);
      toast.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
      loadData();
  
      // นำทางผู้ใช้ไปยังหน้าอื่นตาม state
      if (state === 'manager') {
       return navigate("/restaurantdata");
      } else if (state === 'admin') {
      return  navigate("/admin/Datas-restaurants");
      }
    } catch (error) {
      console.error(error);
    return  toast.error("ຂໍອະໄພ: ບັນທຶກບໍ່ສຳເລັດ");
    }
  };
  
  // console.log("mg_code value:", isData.mg_code);

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div >
          <div className="mx-auto max-w-[80%] w-full">
            <form
              action=""
              onSubmit={handleUpdate}
              encType="multipart/form-data"
            >
              <div className="flex w-full flex-col mt-5 font-bold">
                <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey ">
                  <label htmlFor="uploadBanner">
                    {previewImage ? (
                      <img src={previewImage} className="z-20" alt="Preview" />
                    ) : isData.image ? (
                      <img
                        src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                          isData.image
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
                  className="w-full"
                    id="filled-multiline-flexible"
                    label="ລະຫັດcode:MGX***"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="code"
                    value={isData.code || ""}
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                  className="w-full"
                    id="filled-multiline-flexible"
                    label="ຊື່ຮ້ານອາຫານ"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="name"
                    value={isData.name|| ""}
                    onChange={(e) => handleChange(e)}
                  />
                  </div>
                      <TextField
                  id="filled-multiline-flexible"
                  label="ປະເພດເມນູ"
                  multiline
                  rows={2}
                  variant="filled"
                  name="menu"
                  value={isData.menu|| ""}
                  onChange={(e) => handleChange(e)}
                />
                 
                  <div className="w-full flex gap-3">
                  <TextField
                    className="w-full"
                    label="ເລີມເວລາເປີດ"
                    InputLabelProps={{
                     shrink: true,
                    }}
                    
                     id="filled-multiline-flexible"
                     required
                     type="time"
                     maxRows={7}
                     variant="filled"
                     name="open"
                     value={isData.open|| ""}
                     onChange={(e) => handleChange(e)}
                   />

                   <TextField
                    label="ເວລາປິດ"
                    clasName="w-full"
                    InputLabelProps={{
                     shrink: true,
                    }}
                     className="w-full"
                     id="filled-multiline-flexible"
                     required
                     type="time"
                     maxRows={7}
                     variant="filled"
                     name="close"
                     value={isData.close|| ""}
                     onChange={(e) => handleChange(e)}
                   />
                  </div>
                  

                 <div className="w-full flex flex-col md:flex-row">

                 <TextField
                    id="filled-select-currency"
                    select
                    label="ເລືອກປະເພດສະຖານທີ່"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => handleChange(e)}
                    variant="filled"
                    className="w-full"
                  >
                    {isGetcategory.map((option) => (
                      <MenuItem
                        key={option.category_id  }
                        value={option.category_id }
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
                      value={isData.price || ""}
                    />

                 </div>


                 <div className="w-full flex flex-col md:flex-row gap-3">
                 <TextField
                  className="w-full"
                    id="filled-multiline-flexible"
                    label="ຂໍ້ມູນຕິດຕໍ່ສອບຖາມ Tel or Email"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="connect"
                    value={isData.connect|| ""}
                    onChange={(e) => handleChange(e)}
                  />
                   <TextField
                   className="w-full"
                  id="filled-multiline-flexible"
                  label="ເວບໄຊ"
                  multiline
                  maxRows={7}
                  variant="filled"
                  name="website"
                  value={isData.website|| ""}
                  onChange={(e) => handleChange(e)}
                />
                 </div>

                  <TextField
                    id="filled-multiline-flexible"
                    label="ຕຳແໜ່ງທີ່ຢູ່"
                    multiline
                    maxRows={7}
                    variant="filled"
                    name="address"
                    value={isData.address|| ""}
                    onChange={(e) => handleChange(e)}
                  />

        
                <TextField
                  id="filled-multiline-flexible"
                  label="ທີຕັ້ງ"
                  multiline
                  maxRows={7}
                  variant="filled"
                  name="location"
                  value={isData.location|| ""}
                  onChange={(e) => handleChange(e)}
                />
               


                  <TextField
                    id="filled-multiline-static"
                    label="ຄຳອທີບາຍເພີ້ມເຕີມ"
                    multiline
                   maxRows={17}
                    variant="filled"
                    name="description"
                    value={isData.description|| ""}
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

export default Edit_Restaurants;
