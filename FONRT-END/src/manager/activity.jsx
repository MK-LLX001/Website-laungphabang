import React, { useState, useEffect,useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import defaultBanner from "../imgs/blog banner.png";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { Reload } from "../function/categoryFunction";
import { Reloadpl } from "../function/place.function.Api";
import { loadActivity, Insert, Remove } from "../function/Activity.function.api";
import { Link, useNavigate,Navigate } from "react-router-dom";
import { UserContext } from "../App";
// ... rest of your code

function activity() {
  const { userAuth: { access_token,user_id,state,user_name} } = useContext(UserContext);

  if (access_token === null) {
    return <Navigate to="/signin" />;
   } else if (state === "user" || state === "manager") {
   return <Navigate to="/" />;
   }

  // TODO: Review image alter uploadImages
  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setimge] = useState(null);
  const [isData, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(""); // Controlled input for category
  const [selectedplace, setSelectedplace] = useState(""); // Controlled input for category

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
    } else if (e.target.name === "pl_id") {
      setSelectedplace(e.target.value);
    }
  };
  // console.log(isData);
  const [isGetcategory, setGetcategory] = useState([]);
  const [isGetPlace, setGetPlace] = useState([]);
  const [isGetData, setGetData] = useState([]);

  // Load category data on component mount
  useEffect(() => {
    loadData();
    loadplaces();
    loadCate();
  }, []);
  // Define function to load activity data
  const loadData = async () => {
    loadActivity()
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isData);
    if (!isData.ac_name) {
      return toast.error("ທ່ານຕ້ອງໃສ່ຊື່ສະຖານທີ່ກ່ອນ");
     } else if (!isData.ac_opendate && !isData.ac_closedate) {
      return toast.error("ກະຮຸນາກຳນົດເວລາ");
     } else if (!isData.ac_address) {
      return toast.error("ທ່ານຕ້ອງໃສ່ທີ່ຢູ່ສະຖານທິ່ກ່ອນ");
     } else if (!isData.ac_description) {
      return toast.error("ທ່ານຕ້ອງໃສ່ຄຳອະທິບາຍ");
     } else if (!isData.ac_price) {
     return  toast.error("ທ່ານຕ້ອງໃສ່ລາຄາກ່ອນ");
     }


    const formWithimageData = new FormData();
    for (const key in isData) {
      formWithimageData.append(key, isData[key]);
    }
    console.log(formWithimageData);

    Insert(formWithimageData)
      .then((res) => {
        console.log(res.data);
        loadData();
        toast.success("ບັນທືກຂໍ້ມູນສຳເລັດແລ້ວ");
      })
      .catch((err) => {
        console.log(err);
        toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
      });
  };

  const handleRemove = async (id) => {
    // Display confirmation dialog
    Swal.fire({
      title: 'Are you sure you want to delete this activity?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "Yes" in the confirmation dialog
        // Delete the activity
        Remove(id)
          .then((res) => {
            // Display success message using toast
            toast.success("Activity successfully deleted");
            // Reload activity data
            loadData();
          })
          .catch((err) => {
            // Display error message using toast
            toast.error("Failed to delete activity");
            console.log(err);
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
        <div className=" py-4 px-[5vw] md:px-[2vw]">
          <div className=" mx-auto max-w-[900px] w-full">
            <form
              action=""
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="flex w-full flex-col mt-5 font-bold">
                <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
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
                      <MenuItem key={option.pl_name} value={option.pl_id}>
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
                    name="ac_price"
                    onChange={(e) => handleChange(e)}
                  />

                  <TextField
                  className="w-full"
                    id="filled-select-currency"
                    select
                    label="ເລືອກປະເພດໝວດໝູ່"
                    name="category_id"
                    value={selectedCategory}
                    onChange={(e) => handleChange(e)}
                    variant="filled"
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
                    rows={4}
                    defaultValue=""
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
              </div>
            </form>
          </div>

          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className=" text-center py-4">ຕາຕະລາງຂໍ້ມູນສະຖານທີທອງທຽ່ວ</h2>
            <table className="  text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3 truncate">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                    Pictures
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Place
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Open-Data
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                    Close-Data
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                   Price
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                    Description
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
                            to={"/editactivity/" + items.ac_id}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-ss-edit text-2xl"></i>
                          </Link>
                          <Link
                            to="#"
                            onClick={() => handleRemove(items.ac_id)}
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
                              items.ac_image
                            }`}
                            alt={items.ac_name}
                          />
                        </td>
                        <td className="px-6 py-4 truncate">{items.ac_name}</td>
                        <td className="px-6 py-4 truncate">{items.pl_name}</td>
                        <td className="px-6 py-4 truncate">
                          {items.category_name}
                        </td>

                        <td className="px-6 py-4 truncate">
                          {items.ac_opendate}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.ac_closedate}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.ac_price}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.ac_address}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.ac_description}
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
}

export default activity;
