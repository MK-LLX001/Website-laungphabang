import React, { useState, useEffect ,useContext} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ReadById } from "../function/Users.api";
import AnimationWrapper from "../common/page-animation";
import InpageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-Card-post.component";
import { ReadByIdUserUpload } from "../function/function.upload.API";
import { UserContext } from '../App';

const MyProfile = () => {

  const { userAuth, setUserAuth } = useContext(UserContext);
  const { user_id,user_name,state } = userAuth;
  
  const params = useParams();
  const username = "username"; // Replace "exampleUser" with the username of the logged-in user
  const [isGetData, setGetData] = useState([]);
  const [isDataupload, setDataupload] = useState([]);
  const [isData, setData] = useState([]);
  // Define function to load category data

  const CountUser_uploads = isDataupload.reduce((count, item) => {
    return count + (item.user_id !== undefined ? 1 : 0);
  }, 0);

// console.log("countsuser "+CountUser_uploads);

  const loadUser = async () => {
    try {
      ReadById(params.id).then((res) => setGetData(res.data));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const loadDataupload = async () => {
    try {
      ReadByIdUserUpload(params.id).then((res) => setDataupload(res.data));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  console.log("Rating:", JSON.stringify(isData));



  
  // Load category data on component mount
  useEffect(() => {
    loadUser(params.id);
    loadDataupload();
   
  }, []);

  // console.log(isGetData);

  return (
    <section>
      <AnimationWrapper>
        <div className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
          {isGetData === null ? (
            <Loader />
          ) : (
            isGetData.map((items, index) => {
              return (
                <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:border-l border-grey md:sticky md:top-[100px] md:py-10 ">
                  <img
                    className="w-48 h-48 bg-grey rounded-full md:w-32 md:h-32"
                    src={
                      items.user_profile_img.startsWith("http")
                        ? items.user_profile_img
                        : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${items.user_profile_img}`
                    }
                    alt={items.user_name}
                  />

                  <h2 className="text-2xl font-medium">{items.user_name}</h2>
                  <p className="text-xl font-medium"> @{items.user_lastname}</p>
                  {CountUser_uploads && (
                    <p className="font-semibold text-xl">ຈຳນວນໂພສ {CountUser_uploads}</p>
                  )} 
                 
                  <div className="editfrofile flex gap-4 mt-2">
                    {/* <Link to="/editprofile/" className="btn-light rounded-md">
                      Edit profile
                    </Link> */}

                   {items.user_name === user_name && (
                    <>
                      {state === "admin" && (
                        <Link to="/admin/edit-profile" className='btn-light rounded-md link pl-8 py-4'>
                          Edit profile
                        </Link>
                      )}
                      {state === "manager" && (
                        <Link to="/settings/edit-profile" className='btn-light rounded-md link pl-8 py-4'>
                          Edit profile
                        </Link>
                      )}
                      {state === "user" && (
                        <Link to="/settings/edit-profile" className='btn-light rounded-md link pl-8 py-4'>
                          Edit profile
                        </Link>
                      )}
                    </>
                  )}
                  
                  </div>
                </div>
              );
            })
          )}

          <div className="max-md:mt-12 w-full ">
            <InpageNavigation
              routes={["ລາຍການທີ່ອັບໂຫລດ", "About"]}
              defaultHidden={["About"]}
            >
              {/* FIXME: This is get upload show in file: blog-post-component  */}
              <>
                {isDataupload === null ? (
                  <Loader />
                ) : (
                  isDataupload.map((items, index) => {
                    return (
                      <AnimationWrapper
                        transition={{ duration: 1, delay: index * 0.1 }}
                        key={index}
                      >
                        <BlogPostCard content={items} author={items} />
                      </AnimationWrapper>
                    );
                  })
                )}
              </>
            </InpageNavigation>
          </div>
        </div>
      </AnimationWrapper>
    </section>
  );
};

export default MyProfile;
