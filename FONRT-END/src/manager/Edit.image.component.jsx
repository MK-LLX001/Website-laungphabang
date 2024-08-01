import React, { useEffect, useState } from "react"; // Import useEffect from react
import { useParams, useNavigate, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import { Readimg, Updateimg } from "../function/image.api";
import defaultBanner from "../imgs/blog banner.png";
import { theme } from "../itemsMui/thomeMui";

const EditImage = () => {
  const params = useParams(); // Get the ID parameter from the URL
  // console.log(params.id);
  const [fileOld ,setFileOld] = useState ()

  const [previewImage, setPreviewImage] = useState(null);
  const [Images, setimge] = useState(null);

  const [isdata, setData] = useState({
    img_name: "",
   
    
  }); // get values categories from the responsive url databases


  // FIXME: set varable get data images เกับข้อมูนที่เรา input form ui starting
  const [imageData, setImageData] = useState({});
  // TODO: function setImageData
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setimge(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
      setData({ ...isdata, [e.target.name]: selectedFile });
    } else {
      setData({ ...isdata, [e.target.name]: e.target.value });
    }
  };




  useEffect(() => {
    loadimg(params.id);
  }, []);
  // TODO: reloade Data category
  const loadimg = async (id) => {
    Readimg(id)
      .then((res) => {
        setData(res.data[0]);
        setFileOld(res.data[0].img_image);
      })
      .catch((err) => {});
  };
  // console.log(isdata);

  // TODO: post insert data category to databases
  const handleUpate = async (e) => {
    e.preventDefault();
    console.log(isdata); // check new file 
    console.log(fileOld); // check old file

    const formWithimageData = new FormData();
    for (const key in isdata) {
      formWithimageData.append(key, isdata[key]);
    }
      formWithimageData.append('fileold',fileOld)
    // console.log(formWithimageData);

    Updateimg(params.id, formWithimageData)
      .then((res) => {
        console.log(res.data);
        toast.success("Update Succesful");
      })
      .catch((err) => console.log(err));
  };
  return (
    <ThemeProvider theme={theme}>
      <AnimationWrapper>
        <Toaster />
        <div className="category py-4 px-[5vw] md:px-[2vw]">
          <div className=" Class-cateory">
            <div className="py-4 px-[5vw] md:px-[2vw]">
              <div className="mx-auto max-w-[900px] w-full h-full">
                <div className="flex w-full flex-col mt-5 font-bold">
                  <h2 className=" text-center"> ແກ້ໄຂຂໍ້ມູນຮູບພາບ</h2>
                  <form
                    action=""
                    onSubmit={handleUpate}
                    encType="multipart/form-data"
                  >
                    <div className="flex w-full flex-col mt-4 gap-4 font-bold">
                      {isdata && (
                        <div>
                          <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey  ">
                            <label htmlFor="uploadBanner">
                              {previewImage ? (
                                <img
                                  src={previewImage}
                                  className="z-20  "
                                  alt="Preview"
                                />
                              ) : (
                                isdata.img_image ? (
                                  <img
                                  src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${isdata.img_image}`} alt={isdata.img_name}
                                 
                                    className="z-20"
                                  
                                  />
                                ) : (
                                  <img
                                    src={defaultBanner}
                                    className="z-20"
                                    alt="Default Banner"
                                  />
                                )
                              )}
                              <input
                                className=""
                                id="uploadBanner"
                                name="img_image"
                                type="file"
                                accept="image/*"
                                hidden
                               
                                onChange={(e) => handleImageChange(e)}
                              />
                            </label>
                          </div>
                          <div className="flex w-full flex-col mt-4 gap-4 font-bold">
                            <TextField
                              id="filled-multiline-flexible"
                              label="ຂໍ້ມູນໝວດໝູ່"
                              multiline
                              maxRows={7}
                              variant="filled"
                              name="img_name"
                              value={isdata.img_name}
                              onChange={(e) => handleImageChange(e)}
                            />
                          </div>
                        </div>
                      ) }
                    </div>
                    <div className="flex justify-center w-full mt-4">
                      <button
                        type="submit"
                        className="w-full md:w-1/3 text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="w-full md:w-1/3 text-white bg-deep-orange-400 hover:bg-deep-orange-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                      >
                        Refresh
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default EditImage;
