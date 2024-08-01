import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom"; // Add Navigate here
import { UserContext } from "../App";

const AdminPage = () => {
  const {
    userAuth: { access_token, state },
  } = useContext(UserContext);
  const location = useLocation();
  const [pageState, setPageState] = useState("");

  useEffect(() => {
    const page = location.pathname.split("/")[2];
    setPageState(page ? page.replace("-", " ") : "");
  }, [location]);

  const [showSideNav, setShowSideNav] = useState(false);
  let activeTabLine = useRef();
  let sideBarIconTab = useRef();
  let pageStateTab = useRef();

  const changePageState = (e) => {
    let { offsetWidth, offsetLeft } = e.target;
    activeTabLine.current.style.width = offsetWidth + "px";
    activeTabLine.current.style.left = offsetLeft + "px";

    if (e.target === sideBarIconTab.current) {
      setShowSideNav(true);
    } else {
      setShowSideNav(false);
    }
  };

  useEffect(() => {
    setShowSideNav(false);
    if (pageStateTab.current) {
      pageStateTab.current.click();
    }
  }, [pageState]);

  if (access_token === null) {
    return <Navigate to="/signin" />;
  } else if (state === "user" || state === "manager") {
    return <Navigate to="/" />;
  }

  const [openSubMenu, setOpenSubMenu] = useState(false);
  const toggleSubMenu = () => {
    setOpenSubMenu(!openSubMenu);
  };

  return (
    <section className="relative md:flex gap-10 py-0 m-0 max-md:flex-col">
      {/* Dashboard Sidebar */}
      <div className="sticky top-[80px] z-30">
        <div className="md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto">
          <button
            ref={sideBarIconTab}
            className="p-5 capitalize"
            onClick={changePageState}
          >
            <i className="fi fi-rr-bars-staggered pointer-events-none"></i>
          </button>
          <button
            ref={pageStateTab}
            className="p-5 capitalize"
            onClick={changePageState}
          >
            {pageState}
          </button>
          <hr
            className="bg-dark-grey h-1 rounded-full opacity-70 absolute bottom-0 duration-500"
            ref={activeTabLine}
          />
        </div>
        <div
          className={
            "min-w-full md:w-[200px] h-[calc(100vh-80px-60px)] md:sticky top-24 overflow-y-auto p-6 md:pr-0 bg-white md:border-grey md:border-r absolute max-md:top-[64px] max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500" +
            (!showSideNav
              ? " max-md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto md:opacity-100 max-md:pointer-events-none "
              : "opacity-100 pointer-events-auto")
          }
        >
          <h1 className="text-xl text-dark-grey mb-3">Admin-Dashboard</h1>
          <hr className="border-gray-300 -ml-6 mb-8 mr-6" />
          <NavLink
            to="/admin/home-admin"
            className="sidebar-link"
            onClick={(e) => setPageState(e.target.innerText)}
          >
            <i className="fi fi-rr-home mr-2"></i> ຫນ້າຫຼັກ
          </NavLink>

          <div>
          <button 
          
          className="sidebar-link" onClick={toggleSubMenu}>
              <span><i className="fi fi-rr-document mr-2"></i> ຂໍ້ມູນ</span>
              {openSubMenu ? (
                <i className="fi fi-rr-angle-small-down text-xl font-bold"></i>
              ) : (
                <i className="fi fi-rr-angle-small-right text-xl font-bold"></i>
              )}
            </button>
            {/* // todo  Submenu */}
            {openSubMenu && (
              <div className="submanager ml-4">
                <NavLink
                  to="/admin/Datas-places"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <i className="fi fi-rr-document mr-2"></i> ສະຖານທີ່
                </NavLink>
                <NavLink
                  to="/admin/Datas-activity"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <i className="fi fi-rs-biking-mountain mr-2"></i> ກີດຈະກຳ
                </NavLink>
                <NavLink
                  to="/admin/Datas-hotels"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <i className="fi fi-rr-bed mr-2"></i> ໂຮງແຮມ
                </NavLink>
                <NavLink
                  to="/admin/Datas-restaurants"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <i className="fi fi-rs-utensils mr-2"></i> ຮ້ານອາຫານ
                </NavLink>
                <NavLink
                  to="/admin/Datas-uploads"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <i className="fi fi-rr-cloud-upload-alt mr-2"></i> ໂພສ
                </NavLink>
                <NavLink
                  to="/admin/Datas-category"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <i className="fi fi-rr-apps mr-2"></i>ໝວດໝູ່
                </NavLink>
                <NavLink
                  to="/admin/Datas-image"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <i className="fi fi-rr-copy-image mr-2"></i> ຮູບພາບ
                </NavLink>

              </div>
            )}
          </div>
          <NavLink
            to="/admin/users"
            onClick={(e) => setPageState(e.target.innerText)}
            className="sidebar-link"
          >
            <i className="fi fi-rr-user mr-2"></i> ຜູ້ໃຊ້
          </NavLink>

          <NavLink
            to="/admin/employee-data"
            onClick={(e) => setPageState(e.target.innerText)}
            className="sidebar-link"
          >
            <i className="fi fi-rr-user-gear mr-2"></i> ພະນັກງານ
          </NavLink>
          <NavLink
            to="/admin/registormanager-data"
            onClick={(e) => setPageState(e.target.innerText)}
            className="sidebar-link"
          >
            <i className="fi fi-rr-user-gear mr-2"></i> ຜູ້ປະກອບການ
          </NavLink>

          <NavLink
            to="/admin/report"
            onClick={(e) => setPageState(e.target.innerText)}
            className="sidebar-link"
          >
            <i className="fi fi-rr-file-medical-alt mr-2"></i> ລາຍງານ
          </NavLink>

          <h1 className="text-xl text-dark-grey mt-20 mb-3">ຕັ້ງຄ່າ</h1>
          <hr className="border-gray-300 -ml-6 mb-8 mr-6" />
          <NavLink
            to="/admin/edit-profile"
            onClick={(e) => setPageState(e.target.innerText)}
            className="sidebar-link"
          >
            <i className="fi fi-rr-user mr-2"></i> ແກ້ໄຂໂປຮໄຟ
          </NavLink>
          <NavLink
            to="/admin/change-password"
            onClick={(e) => setPageState(e.target.innerText)}
            className="sidebar-link"
          >
            <i className="fi fi-rr-lock mr-2"></i> ປ່ຽນລະຫັດ
          </NavLink>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="max-md:-mt-8 mt-5 w-full h-cover">
        <Outlet />
      </div>
    </section>
  );
};

export default AdminPage;
