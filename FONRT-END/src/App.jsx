import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import SliderHomepage from "./slider/sliderHomepage";
import HomePage from "./home/homePage";
import Editor from "./pages/editor.pages";
import Inputdata from "./manager/inputdata.place";
import { lookInSession } from "./common/session";
import Product from "./components/products";
import Footer from "./components/footer.component";
import DetailPlace from "./pages/page.Place";
import DetaiFood_Hotel from "./pages/page.hotel";
import HomepageUpload from "./pages/home.page.upload";
import Editcategory from "./manager/categoryEdit";
import EditImage from "./manager/Edit.image.component";
import PlacesEdit from "./manager/place.Edit";
import Hotels from "./manager/hotel";
import EditHotel from "./manager/hotelEdit";
import Edit_Entrepreneur from "./manager/registor.manager.Edit";
import EditActivity from "./manager/activityEdit";
import Edit_Restaurants from "./manager/reatauran.Edit";
import Editprofile from "./pages/edit-profile.page";
import Page_restaurants from "./pages/page.restaurants";
import Page_Activitys from "./pages/page.activity";
import MyProfile from "./pages/profile.page";
import PageNotFound from "./pages/404.page";
import BlogPage from "./pages/blog.page";
import Edit_blog_upload from "./components/blog-edit-component";
import SideNav from "./components/sidenavbar.component";
import ChangePasssword from "./pages/change-password.page";
import RegistorEmployees from "./manager/employee";
import EditRegistorEmployees from "./manager/edit-Employees";
import SideNavAdminPage from "./pages/SidNav-Admin.page";
import ManagerData from "./components/Manager-Data";
import CRUD_Places from "./manager/place";
import Restaurants from "./manager/rastauran";
import Activitys from "./manager/activity";
import Notification from "./pages/notifications.page";
import ManagerBlogs from "./pages/manage-blogs.page";
import ManageHotel from "./components/Manage-Hotels";
import ManageRestaurant from "./components/Manager-Restaurant";
import ManageUsers from "./Admin/User-Edit";
import RegistorEntrepreneur from "./manager/registor.managerman";
import EmployeesDatas from "./Admin/Employess-Edit";
import ManagerDatas from "./Admin/AdminManager-data";
import Report, { ReportHotel, ReportPostReview, ReportRestaurants, ReportUsers } from "./Admin/Reprot";
import Images from "./manager/image.component";
import SearchData_LPG from "./pages/Search.Data-LPG";
import ReviwActivity from "./components/Review.Activity.product";
import SearchByBtnActivity from "./components/Seach-btn-Activity";
import PlacesDatas from "./Admin/Places-Datas";
import HotelsDatas from "./Admin/Hotels-Datas";
import RestaurantDatas from "./Admin/Restaurants-Datas";
import ActivityDatas from "./Admin/Activity-Data";
import UploadData from "./Admin/Upload-Data";
import ManagerCategory from "./Admin/Category-Data";
import ManagerImage from "./Admin/image-data";
import GoogleLoginComponent from "./components/LoginWhitGoogle";
import Places from "./components/Review.places.product";
import Hotel_products from "./components/Review.hotels.product";
import ReviewRestaurants from "./components/Review.Restauranrs.product";
import RevieWatanatham from "./components/Review.Watanatham";
import ReviewAllproducts from "./components/Review-Allproduct";
import HomeManager_Users from "./components/Home-Manager-User";
import HomeAdminPage from "./pages/Home-Admin";
import Report_Places from "./Report/report-Manager";
import VeviewHotel from "./compunentAother/hotel.review.compunent";
import CommentBlog from "./compunentAother/comment-compunent";
import RegisterDone from "./manager/page-registeied-manager";
import ContactUs from "./Contact-us/Contact";
import PageContactUs from "./pages/Page.contact-Us";
import Category from "./manager/category";
import FromAllow from "./Data-Allow/frome-demo-allow";
import CheckRestaurant from "./Admin/Check-Restaurant";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const userInSession = lookInSession("user");
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    } else {
      setUserAuth({ access_token: null });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<PublicHomePage />} />
            <Route path="signin" element={<UserAuthForm type="sign-in" />} />
            <Route path="signup" element={<UserAuthForm type="sign-up" />} />
            <Route path="search/:query" element={<SearchData_LPG />} />
            <Route
              path="Btn-search/:searchQuery"
              element={<SearchByBtnActivity />}
            />
            <Route path="signup" element={<UserAuthForm type="sign-place" />} />
            <Route
              path="manager"
              element={<Inputdata type_info="managerment" />}
            />
            <Route path="registor-employees" element={<RegistorEmployees />} />
            <Route
              path="editregistor-employees/:id"
              element={<EditRegistorEmployees />}
            />
            <Route path="editcategories/:id" element={<Editcategory />} />
            <Route path="editimages/:id" element={<EditImage />} />
            <Route path="editplace/:id" element={<PlacesEdit />} />
            <Route path="edithotel/:id" element={<EditHotel />} />
            <Route path="editactivity/:id" element={<EditActivity />} />
            <Route path="editrestaurant/:id" element={<Edit_Restaurants />} />
            {/* <Route path="product" element={<Product type_product="product" />} /> */}
            <Route path="detailhotel/:id" element={<DetaiFood_Hotel />} />
            <Route path="detailplace/:id" element={<DetailPlace />} />
            <Route path="page_restaurants/:id" element={<Page_restaurants />} />
            <Route path="page_activitys/:id" element={<Page_Activitys />} />
            <Route path="page-contact" element={<PageContactUs/>} />


            <Route path="blog/:id" element={<BlogPage />} />
            <Route path="*" element={<PageNotFound />} />
           
            <Route path="contact-us" element={<ContactUs />} />

            

            {/* Nested Routes with SideNav // todo uploadfile  */}
            <Route path="editor" element={<Editor />} />
            <Route path="editor/:id" element={<Edit_blog_upload />} />


            <Route path="dashboard" element={<SideNav />}>
              <Route path="homemanager-user" element={<HomeManager_Users />} />
              <Route path="blogs" element={<ManagerBlogs />} />

              <Route path="notification" element={<Notification />} />
              <Route path="managehotel" element={<ManageHotel />} />
              <Route path="managerestaurants" element={<ManageRestaurant />} />
            </Route>

            <Route path="settings" element={<SideNav />}>
              <Route path="edit-profile" element={<Editprofile />} />
              <Route path="change-password" element={<ChangePasssword />} />
            </Route>

            <Route path="admin" element={<SideNavAdminPage />}>
              <Route path="" element={<Navigate to="home-admin" />} />
              <Route path="home-admin" element={<HomeAdminPage/>} />
              <Route path="manager-data" element={<ManagerData />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="employee-data" element={<EmployeesDatas />} />
              <Route path="registormanager-data" element={<ManagerDatas />} />
              <Route path="report" element={<Report />} />
              <Route path="edit-profile" element={<Editprofile />} />
              <Route path="change-password" element={<ChangePasssword />} />
              <Route path="Datas-places" element={<PlacesDatas />} />
              <Route path="Datas-hotels" element={<HotelsDatas />} />
              <Route path="Datas-restaurants" element={<RestaurantDatas />} />
              <Route path="Datas-activity" element={<ActivityDatas />} />
              <Route path="Datas-uploads" element={<UploadData />} />
              <Route path="Datas-category" element={<ManagerCategory />} />
              <Route path="Datas-image" element={<ManagerImage />} />
            </Route>

            <Route path="categorys" element={<Category />} />


            <Route path="product" element={<Product type_product="product" />}>
              <Route path="review-places" element={<Places />} />

              <Route path="review-activitys" element={<ReviwActivity />} />
              <Route path="review-hotels" element={<Hotel_products />} />
              <Route
                path="review-restaurants"
                element={<ReviewRestaurants />}
              />
              <Route path="review-watanatham" element={<RevieWatanatham />} />
              <Route
                path="review-allproducts"
                element={<ReviewAllproducts />}
              />
            </Route>

            <Route path="Login-google" element={<GoogleLoginComponent />} />

            <Route path="reportplaces" element={<Report_Places/>} />
            <Route path="reporthotels" element={<ReportHotel/>} />
            <Route path="reportrestaurant" element={< ReportRestaurants/>} />
            <Route path="report-user" element={< ReportUsers/>} />
            <Route path="report-blog" element={< ReportPostReview/>} />
            <Route path="reviewhotels" element={< VeviewHotel/>} />
         
            <Route path="commentblog" element={< CommentBlog/>} />



            <Route path="hotelsdata" element={<Hotels />} />
            <Route path="placesdata" element={<CRUD_Places />} />
            <Route path="restaurantdata" element={<Restaurants />} />
            <Route path="acticitydata" element={<Activitys />} />
            <Route path="image-data" element={<Images />} />
            <Route path="risgetor-manager" element={<RegistorEntrepreneur />} />
            <Route path="risgetor-manager-edit/:id" element={<Edit_Entrepreneur />}/>
            <Route path="risgetor-manager-done" element={<RegisterDone />}/>
            <Route path="homepageupload" element={<HomepageUpload />} />
            <Route path="user/:id"
              element={
                userAuth.access_token ? (
                  <MyProfile />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />

              <Route path="ckeckRestaurant" element= { <CheckRestaurant/>} />


          </Route>

          <Route path="demo-allow" element={<FromAllow/>} />

        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

const PublicHomePage = () => (
  <>
    <SliderHomepage />
    <HomePage />
  </>
);

export default App;
