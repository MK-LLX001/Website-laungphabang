import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";

const SideNav = () => {
  const { userAuth: { access_token,user_id,state} } = useContext(UserContext);


  
  const page = location.pathname.split("/")[2];
  const [pageState, setPageState] = useState(page.replace('-', ' '));
// console.log(location.pathname.split('/'))
 
  const [showSideNav, setShowSideNav] = useState(false);
  let activeTabLine = useRef();
  let sideBarIconTab = useRef();
  let pageStateTab = useRef();

  const changePageState = (e) => {
    let { offsetWidth, offsetLeft } = e.target;
    activeTabLine.current.style.width = offsetWidth + "px";
    activeTabLine.current.style.left = offsetLeft + "px";

    if (e.target == sideBarIconTab.current) {
      setShowSideNav(true);
    } else {
      setShowSideNav(false);
    }
  };

  useEffect(()=> {

      setShowSideNav(false);
      pageStateTab.current.click();

  }, [pageState])

  return (
    // access_token === null ? <Navigate to="/sigin"/> :
    <>
    <section className=" relative md:flex gap-10 py-0 m-0 max-md:flex-col">
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
          <hr className="bg-dark-grey h-1 rounded-full opacity-70 absolute bottom-0 duration-500"
            ref={activeTabLine}
          />


        </div>

        <div className={"min-w-full md:w-[200px]  h-[calc(100vh-80px-60px)] md:sticky top-24 overflow-y-auto p-6  md:pr-0 bg-white md:border-grey md:border-r absolute max-md:top-[64px] max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500" + (!showSideNav ? " max-md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto md:opacity-100 max-md:pointer-events-none " : "opacity-100 pointer-events-auto")}>
          <h1 className="text-xl text-dark-grey mb-3">Dashboard</h1>
          <hr className="border-gray-300 -ml-6 mb-8 mr-6" />

          <NavLink
            to="/dashboard/homemanager-user"
            className="sidebar-link"
            onClick={(e) => setPageState(e.target.innerText)}
          >
            <i className="fi fi-rr-home mr-2"></i> ໜ້າຫຼັກ
          </NavLink>
         
         {
          state === "user" && (
            <NavLink
              to="/dashboard/blogs"
              className="sidebar-link"
              onClick={(e) => setPageState(e.target.innerText)} >
            <i className="fi fi-rr-document mr-2"></i> ໂພສ
            </NavLink>
          )
         }

          
          {
            state === "user" ? (
              <>
                <NavLink
                  to="/dashboard/notification"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <i className="fi fi-rr-bell mr-2"></i> ແຈ້ງເຕືອນ
                </NavLink>
              </>
              ) : state === "manager" ? (
                <>
                

                 <NavLink
                  to="/dashboard/managehotel"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <i className="fi fi-rs-bed mr-2"></i>ຮ້ານອາຫານ
                </NavLink>
                 <NavLink
                  to="/dashboard/managerestaurants"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <i className="fi fi-rs-utensils mr-2"></i> Restertaurant-Data
                </NavLink>

                </>
              ) : null
           }


        
          {
            state === "user" && (
                <NavLink
                  to="/editor"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link" >
                    <i className="fi fi-rr-file-edit mr-2"></i> ໂພສລີວິວ
               </NavLink>
            )
          }
          

          <h1 className="text-xl text-dark-grey mt-20 mb-3">ຕັ້ງຄ່າ</h1>
          <hr className="border-gray-300 -ml-6 mb-8 mr-6" />

          <NavLink
            to={`/settings/edit-profile`}
            onClick={(e) => setPageState(e.target.innerText)}
            className="sidebar-link"
          >
            <i className="fi fi-rr-user mr-2"></i> ແກ້ໄຂໂປຮໄຟ
          </NavLink>
          
          <NavLink
            to="/settings/change-password"
            onClick={(e) => setPageState(e.target.innerText)}
            className="sidebar-link"
          >
            <i className="fi fi-rr-lock mr-2"></i> ປ່ຽນລະຫັດ
          </NavLink>
        </div>
      </div>

      {/* Main Content Area */}
      <div className=" max-md:-mt-8 mt-5 w-full h-cover">
        <Outlet />
      </div>
    </section>
    </>
  );
};

export default SideNav;
