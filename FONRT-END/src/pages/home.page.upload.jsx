import React, { useState, useContext, useEffect } from "react";
import AnimationWrapper from "../common/page-animation";
import InpageNavigation from "../components/inpage-navigation.component";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-Card-post.component";
import MinimalBlogPost from "../components/blog.mini-post.component";
import { UserContext } from "../App";
import { theme } from "../itemsMui/thomeMui";
import { Reload, Reloadtrending } from "../function/function.upload.API";
import { Link } from "react-router-dom";

const HomepageUpload = () => {
  const [SearchBoxVisibility, setSearchBoxVility] = useState(false);
  const { userAuth: { user_name, user_profile_img } } = useContext(UserContext);
  const [Blogs, setBlog] = useState(null);
  const [pageStats, setPageStats] = useState("home");
  const [isGetDatatrending, setGetDatatrending] = useState([]);
  const [isGetData, setGetData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  let categories = [
    "ທັງໝົດ",
    "ວັດ",
    "ນ້ຳຕົກຕາດ",
    "ກິດຈະກຳ",
    "ຮ້ານອາຫານ",
    "ໂຮງແຮມ",
    "ຜູເຂົາ",
    "ຊວງເຮືອ",
    "ຟ້ອນ",
    "ອາບນ້ຳ",
  ];

  useEffect(() => {
    loadData();
    loadDatatrending();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await Reload();
      setGetData(res.data);
      setAllData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadDatatrending = async () => {
    setLoading(true);
    try {
      const res = await Reloadtrending();
      setGetDatatrending(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadBlogByCategory = (category) => {
    setSearchTerm("");
    if (category === "ທັງໝົດ") {
      setGetData(allData);
    } else {
      const filteredData = allData.filter(item =>
        item.category_name.toLowerCase() === category.toLowerCase()
      );
      setGetData(filteredData);
    }
    setPageStats(category);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setGetData(allData);
      return;
    }
    const filteredData = allData.filter(item =>
      item.up_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.up_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setGetData(filteredData);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <section className="flex flex-col lg:flex-row gap-10 p-4">
          <div className="w-full lg:w-2/3">
         <div className="navbar  z-40 sticky">
            <div className="items flex justify-center items-center gap-3 w-full">
               
                <div className="btn flex justify-center items-center gap-10">
                  <p className="md:text-2xl text-xl font-semibold">ທ່ານກຳລັງຈະໂພສຫຍັງ....</p>
                  <Link 
                   to="/editor"
                  className="text-white bg-blue-600 p-2 px-4 rounded">
                    ໂພສ
                  </Link>
                </div>
            </div>
         </div>
            <InpageNavigation routes={["ທັງໝົດ", "trending blogs"]} defaultHidden={["trending blogs"]}>
              <>
                <div className="mb-4 mt-7">
                  <input
                    type="text"
                    placeholder="ຄົ້ນຫາ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 rounded border"
                  />
                </div>
                {isGetData.length === 0 ? (
                  <p className="p-2 text-xl md:text-2xl text-dark-grey border-b border-secondary/50">
                    ບໍ່ພົບຂໍ້ມູນໃນລະບົບ!!
                  </p>
                ) : (
                  isGetData.map((items, index) => (
                    <AnimationWrapper transition={{ duration: 1, delay: index * 0.1 }} key={index}>
                      <BlogPostCard content={items} author={items} />
                    </AnimationWrapper>
                  ))
                )}
              </>
              {Loading ? (
                <Loader />
              ) : isGetDatatrending.length === 0 ? (
                <Loader />
              ) : (
                isGetDatatrending.map((items, index) => (
                  <AnimationWrapper transition={{ duration: 1, delay: index * 0.1 }} key={index}>
                    <MinimalBlogPost items={items} index={index} />
                  </AnimationWrapper>
                ))
              )}
            </InpageNavigation>
          </div>

          <div className="w-full lg:w-1/3 border-l border-grey pl-8 pt-3">
            <div className="flex flex-col gap-10">
              <div>
                <h1 className="font-medium text-xl mb-8">
                  ເລື່ອງລາວທີ່ຫນ້າສົນໃຈ
                </h1>
                <div className="flex gap-3 flex-wrap">
                  {categories.map((items, index) => (
                    <button
                      onClick={() => loadBlogByCategory(items)}
                      className={`tag font-semibold ${
                        pageStats === items ? "bg-black text-white" : ""
                      }`}
                      key={index}
                    >
                      {items}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden md:block">
                <h1 className="font-medium text-xl mb-8">
                  ກຳລັງເປັນທີ່ນີຍົມ
                  <i className="fi fi-rr-arrow-trend-up"></i>
                </h1>
                {Loading ? (
                  <Loader />
                ) : isGetDatatrending.length === 0 ? (
                  <Loader />
                ) : (
                  isGetDatatrending.map((items, index) => (
                    <AnimationWrapper transition={{ duration: 1, delay: index * 0.1 }} key={index}>
                      <MinimalBlogPost items={items} index={index} />
                    </AnimationWrapper>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default HomepageUpload;
