import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import logo from "../imgs/lpb.png";
import UserNavigationPanel from "./user-navigation.component";
import AnimationWrapper from "../common/page-animation"; // Make sure this component handles animations
import { ReadById } from "../function/Users.api";
// todo menu profile

const Menuprofile = () => {
  const [userNavPanel, setUserNavPanel] = useState(false);

  const toggleUserNavPanel = () => setUserNavPanel(!userNavPanel);
  const closeUserNavPanel = () => setTimeout(() => setUserNavPanel(false), 200);

  const {
    userAuth,
    userAuth: { access_token, user_profile_img, state },
  } = useContext(UserContext);
  // console.log(state);

  return (
    <>
      {access_token ? (
        <>

        {
          state === "user" && (
            <>
              <Link to="/dashboard/notification">
            <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
              <i className="fi fi-rr-bell text-2xl block mt-1"></i>
            </button>
          </Link>
          
            </>
          )
        }


          <div
            className="relative"
            onClick={toggleUserNavPanel}
            onBlur={closeUserNavPanel}
          >
            <button className="w-12 h-12 mt-1">
              <img
              src={
                user_profile_img && user_profile_img.startsWith("http")
                  ? user_profile_img
                  : `${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${user_profile_img}`
              }
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            </button>

            {userNavPanel && <UserNavigationPanel />}
          </div>
        </>
      ) : (
        <div className="flex gap-1 text-center justify-center items-center">
          <Link
            to="/signin"
            className=" whitespace-nowrap bg-black text-white  md:py-2 md:px-3 lg:py-3 lg:px-6  capitalize rounded-xl  md:rounded-tl-full  md:rounded-bl-full text-sm px-3 py-2  md:text-sm lg:text-xl hover:bg-opacity-80"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="hidden md:block  md:rounded-tr-full md:rounded-br-full  bg-grey text-black hover:bg-blue-gray-200 whitespace-nowrap   md:py-2 md:px-3 lg:py-3 lg:px-6 text-xl capitalize    md:text-sm lg:text-xl hover:bg-opacity-80"
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

const NavMenu = [
  {
    title: "ໜ້າຫຼັກ",
    icon: <i className="fi fi-bs-house-chimney"></i>,
    url: "/",
  },
  {
    title: "ສະຖານທີ່ທອງທ່ຽວ",
    icon: <i className="fi fi-bs-book"></i>,
    url: "/product/review-allproducts",
  },
  {
    title: "ຊຸ່ມຊົນ",
    icon: <i className="fi fi-rs-users-alt"></i>,
    url: "/homepageupload",
  },
  // {
  //   title: "Manage data",
  //   url: "/manager",
  // },
  {
    title: "ຕີດຕໍ່ພົວພັນ",
    
    url: "/page-contact",
  },
];

const Navbar = () => {
  const {
    userAuth,
    userAuth: { access_token, user_profile_img, state },
  } = useContext(UserContext);

  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  //  function mทำคีก บ่อนใดกะได้ ที่บ่อแม่นปุ่ม manager แล้วให้มันช้อน submane
  const toggleBlur = () => {
    setTimeout(() => {
      setMobileMenuVisible(false);
    }, 200);
  };

  const [SearchBoxVisibility, setSearchBoxVility] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    if (e.keyCode === 13 && query.length) {
      navigate(`/search/${query}`);
    }
  };

  const [Open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!Open);
  const handleBlue = () => setTimeout(() => setOpen(false), 200);
// console.log(state)

  return (
    <>
      <nav className="navbar z-50">
        <div className="flex w-full ">
                <div className="item-menus flex justify-center items-center  w-full">

                <button
            className="md:hidden bg-grey w-12 h-12 rounded-full items-center justify-center"
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            onBlur={toggleBlur}
          >
            <i className="fi fi-rr-menu-burger text-xl"></i>
          </button>

          <Link to="/" className="flex w-16 ml-4 md:ml-0 ">
            <img src={logo} className="w-full " alt="Logo" />
          </Link>

          <div
            className={
              "absolute bg-white w-full left-0 top-full mt-0.! border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
              (SearchBoxVisibility ? "show" : "hide")
            }
          >
            <input
              type="text"
              placeholder="Search"
              className="w-full md:w-auto bg-grey  p-3 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
              onKeyDown={handleSearch}
            />
            <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey "></i>
          </div>

          <div className="flex items-center gap-3 md:gap-6 ml-auto">
            <button
              className="md:hidden bg-grey w-12 h-12 rounded-full items-center justify-center"
              onClick={() => setSearchBoxVility((currentVal) => !currentVal)}
            >
              <i className="fi fi-rr-search text-xl"></i>
            </button>
          </div>

          {/* <p className="text-dark-grey lg:text-2xl text-xl pl-7 font-semibold md:text-xl   md:pl-2">ຫຼວງພະບາງແດນງາມ</p> */}

          <div className="hidden md:flex items-center justify-end md:justify-center w-full md:gap-7 lg:gap-10  ml-auto">
            <button
              className="md:hidden bg-grey w-12 h-12 rounded-full items-center justify-center"
              onClick={() => setSearchBoxVisible(!searchBoxVisible)}
            >
              <i className="fi fi-rr-search text-xl"></i>
            </button>

            {NavMenu.map(({ title, url,icon }) => (
              <Link
                key={title}
                to={url}
                className="text-dark-grey  font-semibold hover:text-black uppercase truncate lg:text-2xl md:text-sm"
              >
               {icon} {title}
              </Link>
            ))}

<div className="relative w-[10rem]">
      {(state === 'manager' || state === 'admin') && (
        <button
          className="text-dark-grey font-semibold hover:text-black uppercase truncate lg:text-xl md:text-sm"
          onClick={toggleOpen}
          onBlur={handleBlue}
        >
          Review
        </button>
      )}

      {state === 'manager' && Open && (
        <div
          className=" bg-white items-center shadow top-10  left-0 w-full absolute right-0 border-0 border-grey duration-200 text-dark-grey font-semibold hover:text-black uppercase truncate lg:text-xl md:text-sm"
          tabIndex="0"
          onBlur={handleBlue}
        >
          <Link to="/hotelsdata" className="link block pl-6 py-2" tabIndex="0">
            Hotels
          </Link>
          <Link to="/restaurantdata" className="link block pl-6 py-2" tabIndex="0">
            Restaurant
          </Link>
          <Link to="/dashboard/homemanager-user" className="link block pl-6 py-2" tabIndex="0">
            ຈັດການຂໍ້ມູນທິງໝົດ
          </Link>
        </div>
      )}

      {state === 'admin' && Open && (
        <div
          className="bg-white shadow top-[60px] absolute right-20 md:right-24 border-0 border-grey w-auto duration-200 text-dark-grey font-semibold hover:text-black uppercase truncate lg:text-xl md:text-sm"
          tabIndex="0"
          onBlur={handleBlue}
        >
          <Link to="/placesdata" className="link block pl-6 py-2" tabIndex="0">
            Places
          </Link>
          <Link to="/acticitydata" className="link block pl-6 py-2" tabIndex="0">
            Activity
          </Link>
          <Link to="/hotelsdata" className="link block pl-6 py-2" tabIndex="0">
            Hotels
          </Link>
          <Link to="/restaurantdata" className="link block pl-6 py-2" tabIndex="0">
            Restaurant
          </Link>
          <Link to="/admin/Datas-places" className="link block pl-6 py-2" tabIndex="0">
            ຈັດການຂໍ້ມູນທິງໝົດ
          </Link>
        </div>
      )}
    </div>

            

          </div>
          <div className="flex w-auto justify-end items-center ">
              <Menuprofile />
              </div>
                </div>
        </div>

        {mobileMenuVisible && (
          <AnimationWrapper transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="md:hidden flex flex-col items-start gap-3 px-6 pb-6 bg-white h-cover absolute left-0 w-1/2 top-20  pl-10 p-3 rounded-xl shadow-md ">
              {NavMenu.map(({ title, url }, index) => (
                <Link
                  key={index}
                  to={url}
                  className="text-dark-grey hover:text-black uppercase font-semibold text-sm "
                >
                  {title}
                </Link>
              ))}

              <Menuprofile />
            </div>
          </AnimationWrapper>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
