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
import { Reloadpl } from "../function/place.function.Api";
import { ReadById,Update } from "../function/Activity.function.api";
import { Link } from "react-router-dom";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../App";
// ... rest of your code

function EditActivity() {
  const params = useParams();

  const { userAuth: { access_token,user_id,state,user_name} } = useContext(UserContext);

  if (access_token === null) {
    return <Navigate to="/signin" />;
   } else if (state === "user" || state === "manager") {
   return <Navigate to="/" />;
   }
   
   const navigate = useNavigate()
   

  // TODO: Review image alter uploadImages
  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setimge] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // Controlled input for category
  const [selectedplace, setSelectedplace] = useState(""); // Controlled input for category
  const [fileOld, setFileOld] = useState();
  const [isData, setData] = useState({
    ac_name: "",
    ac_opendate: "",
    ac_closedate: "",
    ac_address: "",
    ac_price: 0 ,
    ac_description: "",
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

   if (e.target.name === "pl_id") {
      setSelectedplace(e.target.value);
    }
  };

  // console.log(isData);

  const [isGetcategory, setGetcategory] = useState([]);
  const [isGetPlace, setGetPlace] = useState([]);
  const [isGetData, setGetData] = useState([]);

  // Load category data on component mount
  useEffect(() => {
    loadData(params.id);
    loadplaces(params.id);
    loadCate(params.id);
  }, []);
  // Define function to load EditActivity data
  const loadData = async () => {
    try {
      const placeData = await ReadById(params.id);
      setData(placeData.data[0]);
      setFileOld(placeData.data[0].ac_image);
      setSelectedCategory(placeData.data[0].category_id); // Set to '' if missing
      setSelectedplace(placeData.data[0].pl_id); // Set selectedplace
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  
  // Define function to load category data
  const loadCate = async () => {
    Reload()
      .then((res) => setGetcategory(res.data))
      .catch((err) => console.log(err));
  };
  const loadplaces = async () => {
    Reloadpl()
      .then((res) => setGetPlace(res.data))
      .catch((err) => console.log(err));
  };
  //   console.log(isData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isData);
    try {

      if (!isData.ac_name) {
        return toast.error("ທ່ານຕ້ອງໃສ່ຊື່ສະຖານທີ່ກ່ອນ");
       } else if (!isData.ac_opendate && !isData.ac_closedate) {
        return toast.error("ກະຮຸນາກຳນົດເວລາ");
       } else if (!isData.ac_address) {
        return toast.error("ທ່ານຕ້ອງໃສ່ທີ່ຢູ່ສະຖານທິ່ກ່ອນ");
       } else if (!isData.ac_description) {
        return toast.error("ທ່ານຕ້ອງໃສ່ຄຳອະທິບາຍ ແລະ ຄຳແນະນຳ");
       } else if (!isData.ac_price) {
       return  toast.error("ທ່ານຕ້ອງໃສ່ລາຄາກ່ອນ");
       }


      const formWithImageData = new FormData();
      for (const key in isData) {
        formWithImageData.append(key, isData[key]);
      }
      formWithImageData.append('fileold', fileOld);

    await  Update(params.id, formWithImageData)
        .then((res) => {
          console.log(res.data);
          toast.success("Update Successful");
          setTimeout(() => {
            return  navigate("/admin/Datas-activity");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
         return toast.error("ບັນທືກບໍສຳເລັດ");
        });
    } catch (err) {
      console.log(err);
     return toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
    }
  };

  // const formatDate = (dateString) => {
  //   if (!dateString || !dateString.trim()) {
  //       return ''; // Return empty string for invalid dates
  //     }
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />

      <AnimationWrapper>
        <div className=" py-4 px-[5vw] md:px-[2vw]">
          <div className=" mx-auto max-w-[900px] w-full">
            <form
              action=""
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {isData && (
                <div className="flex w-full flex-col mt-5 font-bold">
                  <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                    <label htmlFor="uploadBanner">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          className="z-20"
                          alt="Preview"
                        />
                      ) : isData.ac_image ? (
                        <img
                          src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                            isData.ac_image
                          }`}
                          alt={isData.ac_name}
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
                        name="ac_image"
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
                      label="ຊື່ກິດຈະກຳ"
                      multiline
                      maxRows={7}
                      variant="filled"
                      name="ac_name"
                      value={isData.ac_name}
                      onChange={(e) => handleChange(e)}
                    />

                    <TextField
                    className="w-full"
                      id="filled-select-currency"
                      select
                      label="ເລືອກປະເພດສະຖານທີ່"
                      name="pl_id"
                      value={selectedplace}
                      onChange={(e) => handleChange(e)}
                      variant="filled"
                    >
                      {isGetPlace.map((option) => (
                        <MenuItem key={option.pl_id} value={option.pl_id}>
                          {option.pl_name}
                        </MenuItem>
                      ))}
                    </TextField>
                    </div>

                   

                    
                  <div className="w-full flex gap-3">
                    <TextField
                      id="datetime-local"
                      label="ເລີມເວລາເປີດ"
                      type="time"
                      value={isData.ac_opendate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                       name="ac_opendate"
                      onChange={(e) => handleChange(e)}
                      variant="filled"
                      className="w-full"
                    />
                    <TextField
                      id="datetime-local"
                      label="ເວລາປິດ"
                      type="time"
                      value={isData.ac_closedate} 
                      InputLabelProps={{
                        shrink: true,
                      }}
                       name="ac_closedate"
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
                      name="ac_address"
                      value={isData.ac_address}
                      onChange={(e) => handleChange(e)}
                    />

                   <div className="w-full flex flex-col md:flex-row gap-3">
                   <TextField
                   className="w-full"
                      id="filled-multiline-flexible"
                      label="ລາຄາ"
                      multiline
                      maxRows={7}
                      variant="filled"
                      value={isData.ac_price }
                      name="ac_price"
                      onChange={(e) => handleChange(e)}
                    />

                    <TextField
                    className="w-full"
                      id="filled-select-currency"
                      select
                      label="ເລືອກປະເພດສະຖານທີ່"
                      name="category_id"
                      value={selectedCategory}
                      onChange={(e) => handleChange(e)}
                      variant="filled"
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
                      value={isData.ac_description}
                      variant="filled"
                      name="ac_description"
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
}

export default EditActivity;
