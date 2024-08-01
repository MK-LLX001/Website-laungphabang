import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import logo from "../imgs/lpb.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { Toaster, toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { theme } from "../itemsMui/thomeMui";
import { UserContext } from "../App";
import { Reload } from "../function/categoryFunction";
import { Insert, Update } from "../function/function.upload.API";

//TODO: ไฟท่กงวคอง homePage,bblog-upload,blogmini,blogpost

const BlogEditor = () => {
  const navigator = useNavigate();
  const { userAuth: { user_name, user_id, state } } = useContext(UserContext);
  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setimge] = useState(null); // Likely not needed here
  const [isData, setData] = useState({}); // State for user input data
  const [selectedCategory, setSelectedCategory] = useState(""); // Controlled input for category

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setimge(selectedFile); // Likely not needed
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

  const [isGetData, setGetData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    Reload()
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(isData);

      // Check for empty fields
      if (!isData.img_image) {
        toast.error("ເຊີນທ່ານເລືອກຮູບພາບກ່ອນ");
      } else if (!isData.Title) {
        toast.error("ທ່ານຕ້ອງໃສ່ຊື່ສະຖານທີ່ກ່ອນ");
      } else if (!isData.category) {
        toast.error("ທ່ານຕ້ອງເລືອກປະເພດໝວດໝູ່");
      } else {
        const formWithimageData = new FormData();
        for (const key in isData) {
          formWithimageData.append(key, isData[key]);
        }
        formWithimageData.append("user_name", user_id); // Assuming you need user_name

        Insert(formWithimageData)
          .then((res) => {
            console.log(res.data);
            loadData();
            toast.success("Success");
            navigator('/homepageupload');
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message);
          });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later."); // Error message
    }
  };

  const cleanText = () => {
    setData({});
    setPreviewImage(null);
    setSelectedCategory("");
    loadData();
  };

  if (state === "manager") {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <nav className="navbar flex justify-center text-center items-center ">
        <div className="flex justify-center text-center items-center sticky top-20">
          <p className="sm:hidden md:block text-black line-clamp-1 w-full text-3xl ">
            ທ່ານຕ້ອງຢາກລີວິວອີຫຍັງນໍ😜(❁´◡`❁)
          </p>
        </div>
      </nav>

      <Toaster />
      <AnimationWrapper>
        <section className=" ">
          <div className="mainbox mx-auto max-w-[1100px]  w-full">
            {/* Review image */}
            <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="container-upload ">
                <div className="chilendbox relative aspect-video  hover:opacity-80 bg-white border-4 border-grey">
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
                      onChange={e => handleChange(e)}
                    />
                  </label>
                </div>
                {/* Input data */}
                <div className="flex w-full flex-col mt-4 gap-4 font-bold">
                  <TextField
                    id="filled-multiline-flexible"
                    label="ຊື່ສະຖານທີ"
                    name="Title"
                    multiline
                    maxRows={7}
                    variant="filled"
                    value={isData.Title || ""}
                    onChange={e => handleChange(e)}
                  />

                  <TextField
                    id="filled-select-currency"
                    select
                    label="ເລືອກປະເພດສະຖານທີ່/ກີດຈະກຳ"
                    name="category"
                    value={selectedCategory}
                    onChange={e => handleChange(e)}
                    variant="filled"
                  >
                    {isGetData.map((option) => (
                      <MenuItem key={option.category_name} value={option.category_id}>
                        {option.category_name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="filled-multiline-static"
                    label="ຄຳອທີບາຍເພີ້ມເຕີມ"
                    name="description"
                    multiline
                    rows={4}
                    variant="filled"
                    value={isData.description || ""}
                    onChange={e => handleChange(e)}
                  />
                </div>

                <div className="flex w-full gap-2 mt-5">
                  <button
                    type="submit"
                    className="flex justify-center items-center gap-2 p-2 w-full bg-gradient-to-t from-teal-600 to-teal-300 rounded-lg text-xl text-white font-bold hover:opacity-80"
                  >
                    ໂພສ
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center gap-2 p-2 w-full bg-gradient-to-t from-red to-red/75 rounded-lg text-xl text-white font-bold hover:opacity-80"
                    onClick={cleanText}
                  >
                    ລືບ
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default BlogEditor;
