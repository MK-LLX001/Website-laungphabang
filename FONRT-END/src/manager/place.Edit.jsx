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
import { ReadById, Update } from "../function/place.function.Api";
import { Link } from "react-router-dom";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../App";
const PlacesEdit = () => {
  const { userAuth: { access_token,user_id,state,user_name} } = useContext(UserContext);

  if (access_token === null) {
   return <Navigate to="/signin" />;
  } else if (state === "user" || state === "manager") {
  return <Navigate to="/" />;
  }
  const params = useParams();
  // console.log(params.id);
  const navgator = useNavigate();

  // TODO: Review image alter uploadImages
  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setimge] = useState(null);
  const [isData, setData] = useState({
    pl_name: "",
    pl_startime: "",
    pl_endtime: "",
    pl_address: "",
    pl_price: 0,
    category_naame: "",
    pl_description: "",
    pl_warning: "",
    sesion: "",
    pl_img_image: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(""); // Controlled input for category
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

    // Update selectedCategory if using controlled input
    if (e.target.name === "category_id") {
      setSelectedCategory(e.target.value);
    }

    console.log(isData);
  };

  const [isGetcategory, setGetcategory] = useState([]);
  // Load category data on component mount
  useEffect(() => {
    loadData(params.id);
    loadCate(params.id);
  }, []);

  const loadCate = async () => {
    Reload()
      .then((res) => setGetcategory(res.data))
      .catch((err) => console.log(err));
  };

  const loadData = async () => {
    try {
      const placeData = await ReadById(params.id);
      setData(placeData.data[0]); // Set place data
      setFileOld(placeData.data[0].pl_img_image);
      setSelectedCategory(placeData.data[0].category_id); // Set selected category
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // console.log(isData);
  // TODO: post insert data category to databases
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      // console.log(isData); // check new file
      // console.log(fileOld); // check old file
      if (isData.pl_name === "") {
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

      const formWithImageData = new FormData();
      for (const key in isData) {
        formWithImageData.append(key, isData[key]);
      }
      formWithImageData.append('fileold', fileOld);
  
      await Update(params.id, formWithImageData)
      .then((res) =>{
        console.log(res);
        toast.success("Update Successful");
        setTimeout(() => {
          navgator("/admin/Datas-places");
        }, 1000); // 3000 milliseconds = 3 seconds
      
      })
      .catch((err) =>{
        console.log(err);
        toast.error("ຂໍອະໄພເເກ້ໄຂບໍ່ສຳເລັດ");
      });

     
    } catch (err) {
      console.log(err);
      toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div className=" py-4 px-[5vw] md:px-[0vw] ">
          <div className="mx-auto md:max-w-[70%] w-full">
            <form
              action=""
              onSubmit={handleUpdate}
              encType="multipart/form-data"
            >
              {isData && (
                <div className="flex w-full flex-col mt-5 font-bold">
                  <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey ">
                    <label htmlFor="uploadBanner">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          className="z-20"
                          alt="Preview"
                        />
                      ) : isData.pl_img_image ? (
                        <img
                          src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                            isData.pl_img_image
                          }`}
                          alt={isData.pl_name}
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

                  <div className="flex w-full flex-col mt-4 gap-4 font-bold">
                   <div className="w-full flex flex-col md:flex-row gap-3">
                        <TextField
                            id="filled-multiline-flexible"
                            label="ຊື່ສະຖານທີ່ແຫ່ງທອງທຽ່ວ"
                            multiline
                            maxRows={7}
                            variant="filled"
                            name="pl_name"
                            value={isData.pl_name}
                            onChange={(e) => handleChange(e)}
                            className="w-full"
                          />
                           <TextField
                                id="filled-select-currency"
                                select
                                label="ເໝາະສົມກິບລະດູການ"
                                name="sesion"
                                value={isData.sesion || ""}
                                onChange={(e) => handleChange(e)}
                                variant="filled"
                                fullWidth
                                className="w-full"
                              >
                                <MenuItem value="" disabled>
                                  {isData.sesion || "Select Season"}
                                </MenuItem>
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
                      value={isData.pl_startime}
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
                      value={isData.pl_endtime}
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
                      value={isData.pl_address}
                      onChange={(e) => handleChange(e)}
                    />

                   <div className="w-full flex flex-col md:flex-row  gap-3">
                   <TextField
                      id="filled-multiline-flexible"
                      label="ລາຄາ"
                      multiline
                      maxRows={7}
                      variant="filled"
                      name="pl_price"
                      value={isData.pl_price}
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
                      // value=""
                      variant="filled"
                      name="pl_description"
                      value={isData.pl_description}
                      onChange={(e) => handleChange(e)}
                    />
                    <TextField
                      id="filled-multiline-static"
                      label="ຄຳແນະນຳທີ່ຕ້ອງຮູ້"
                      multiline
                      maxRows={7}
                      variant="filled"
                      name="pl_warning"
                      value={isData.pl_warning}
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
              )}
            </form>
          </div>
        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default PlacesEdit;
