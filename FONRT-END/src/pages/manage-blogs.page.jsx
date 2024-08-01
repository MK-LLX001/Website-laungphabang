import React, { useState, useEffect, useContext, createContext } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import InpageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import { GetUploadByIdUser } from "../function/function.upload.API";
import { UserContext } from "../App";
import ManageBlogCard from "../components/manage-blogcard.component";

export const BlogContext = createContext();

const ManagerBlogs = () => {
  const { userAuth: { user_name, user_id } } = useContext(UserContext);
  const [isDataupload, setDataupload] = useState(null);

  const loadDataupload = async () => {
    try {
      const res = await GetUploadByIdUser(user_id);
      setDataupload(res.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    if (user_id) {
      loadDataupload();
    }
  }, [user_id]);

  // console.log("Data upload:", JSON.stringify(isDataupload));

  return (
    <>
      <h1 className="hidden md:block">Manage Blogs</h1>

      <div className="relative max-md:mt-5 md:mt-8 mb-10">
        <input
          type="search"
          className="w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey"
          placeholder="Search Blogs"
        />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-6 top-[10%] translate-y-1/2 text-xl text-dark-grey"></i>
      </div>

      <BlogContext.Provider value={{ loadDataupload }}>
        <div className="max-md:mt-12 w-full">
          <InpageNavigation
            routes={["ລາຍການທີ່ອັບໂຫລດ", "About"]}
            defaultHidden={["About"]}
          >
            {/* FIXME: This is get upload show in file: blog-post-component */}
            <>
              {isDataupload === null ? (
                <Loader />
              ) : (
                isDataupload.map((item, index) => (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: index * 0.1 }}
                    key={index}
                  >
                    <ManageBlogCard data={item} loadDataupload={loadDataupload} />
                  </AnimationWrapper>
                ))
              )}
            </>
          </InpageNavigation>
        </div>
      </BlogContext.Provider>
    </>
  );
};

export default ManagerBlogs;
