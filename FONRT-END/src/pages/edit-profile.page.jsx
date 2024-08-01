import React, { useState, useEffect, useContext, useRef } from "react";
import { ReadById, UpdateProfileImg, UpdateUser } from "../function/Users.api";
import Loader from "../components/loader.component";
import { UserContext } from "../App";
import AnimationWrapper from "../common/page-animation";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = () => {
  const {
    userAuth: { access_token, user_id },
  } = useContext(UserContext);

  const [data, setData] = useState({
    user_name: "",
    user_lastname: "",
    user_email: "",
  });
  const [loading, setLoading] = useState(true);
  const ProfileImageEle = useRef();
  const [updateProfileImg, setUpdateProfileImg] = useState(null);
  const [fileOld, setFileOld] = useState();

  const handleImagePreview = (e) => {
    const img = e.target.files[0];
    ProfileImageEle.current.src = URL.createObjectURL(img);
    setUpdateProfileImg(img);
  };

  const handleUploadProfileImg = async (e) => {
    e.preventDefault();
    if (updateProfileImg) {
      const formData = new FormData();
      formData.append("img_image", updateProfileImg);
      formData.append("fileold", fileOld);

      try {
        const response = await UpdateProfileImg(user_id, formData);
        toast.success(response.message + " update success");
        fetchData();
      } catch (error) {
        console.error("Error updating profile image:", error);
        toast.error("Failed to update profile image");
      }
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datas = {
      user_name: data.user_name,
      user_lastname: data.user_lastname,
      user_email: data.user_email,
    };
    try {
      const response = await UpdateUser(user_id, datas);
      toast.success(response.message + " update success");
      fetchData();
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update user data");
    }
  };

  const fetchData = async () => {
    try {
      const res = await ReadById(user_id);
      setData(res.data[0]);
      setFileOld(res.data[0].user_profile_img);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [access_token]);

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Toaster />
          <h1 className="hidden md:block md:text-2xl font-semibold">ແກ້ໄຂໂປຣໄຟ</h1>
          <div className="boxprofile flex flex-col lg:flex-row items-center py-10 gap-8 lg:gap-10">
            <div className="imgss lg:center mb-5">
              <label
                htmlFor="uploadImg"
                id="profileImgLable"
                className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden"
              >
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/80 opacity-0 hover:opacity-100 cursor-pointer">
                  Upload Image
                </div>
                {data && data.user_profile_img ? (
                  <img
                    ref={ProfileImageEle}
                    src={
                      data.user_profile_img && data.user_profile_img.startsWith("http")
                        ? data.user_profile_img
                        : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${data.user_profile_img}`
                    }
                    alt={data.user_name}
                    className="profile-img"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </label>
              <input
                type="file"
                id="uploadImg"
                accept="image/*"
                hidden
                onChange={handleImagePreview}
              />

              <button
                type="button"
                className="btn-light mt-5 lg:center lg:w-full px-10"
                onClick={handleUploadProfileImg}
              >
                Upload
              </button>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-2 opacity-90">
                <div>
                  <label className="block text-sm md:text-xl font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Name"
                    required
                    value={data.user_name || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label className="block text-sm md:text-xl font-medium text-gray-700">
                    Lastname
                  </label>
                  <input
                    type="text"
                    name="user_lastname"
                    className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Lastname"
                    required
                    value={data.user_lastname || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label className="block text-sm md:text-xl font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Email"
                    required
                    value={data.user_email || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm md:text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </AnimationWrapper>
  );
};

export default EditProfile;
