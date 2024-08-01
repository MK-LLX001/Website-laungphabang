import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import defaultBanner from "../imgs/blog banner.png";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { Reload } from "../function/categoryFunction";
import { ReadByIdToUpdate, Update } from "../function/function.upload.API";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const PlacesEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userAuth: { user_id } } = useContext(UserContext);

  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setImages] = useState(null);
  const [isData, setData] = useState({
    up_name: "",
    up_description: "",
    img_image: "",
    category_id: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fileOld, setFileOld] = useState();
  const [isGetcategory, setGetcategory] = useState([]);

  useEffect(() => {
    const loadData = async (id) => {
      try {
        const placeData = await ReadByIdToUpdate(id);
        setData(placeData.data[0]);
        setFileOld(placeData.data[0].img_image);
        setSelectedCategory(placeData.data[0].category_id);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    const loadCate = async () => {
      try {
        const res = await Reload();
        setGetcategory(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadData(params.id);
    loadCate();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setImages(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
      setData({ ...isData, [name]: selectedFile });
    } else {
      setData({ ...isData, [name]: value });
    }

    if (name === "category_id") {
      setSelectedCategory(value);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formWithImageData = new FormData();
      for (const key in isData) {
        formWithImageData.append(key, isData[key]);
      }
      formWithImageData.append("fileold", fileOld);

      const res = await Update(params.id, formWithImageData);
      console.log(res.data);
      toast.success("Update successful");

      navigate(`/blog/${isData.up_id}`);
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
  };

  

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div className="py-4 px-[5vw] md:px-[2vw]">
          <div className="mx-auto max-w-[900px] w-full">
            <form onSubmit={handleUpdate} encType="multipart/form-data">
              {isData && (
                <div className="flex w-full flex-col mt-5 font-bold">
                  <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                    <label htmlFor="uploadBanner">
                      {previewImage ? (
                        <img src={previewImage} className="z-20" alt="Preview" />
                      ) : isData.img_image ? (
                        <img
                          src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${isData.img_image}`}
                          alt={isData.up_name}
                          className="z-20"
                        />
                      ) : (
                        <img src={defaultBanner} className="z-20" alt="Default Banner" />
                      )}
                      <input
                        id="uploadBanner"
                        name="img_image"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className="flex w-full flex-col mt-4 gap-4 font-bold">
                    <TextField
                      id="filled-multiline-flexible"
                      label="Place Name"
                      name="up_name"
                      multiline
                      maxRows={7}
                      variant="filled"
                      value={isData.up_name}
                      onChange={handleChange}
                    />

                    <TextField
                      id="filled-select-currency"
                      select
                      label="Select Category"
                      name="category_id"
                      value={selectedCategory}
                      onChange={handleChange}
                      variant="filled"
                    >
                      {isGetcategory.map((option) => (
                        <MenuItem key={option.category_id} value={option.category_id}>
                          {option.category_name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      id="filled-multiline-static"
                      label="Description"
                      name="up_description"
                      multiline
                      rows={4}
                      variant="filled"
                      value={isData.up_description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex w-full gap-2 mt-5">
                    <button
                      type="submit"
                      className="flex justify-center items-center gap-2 p-2 w-full bg-gradient-to-t from-teal-600 to-teal-300 rounded-lg text-xl text-white font-bold hover:opacity-80"
                    >
                      Update
                    </button>
                    
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
