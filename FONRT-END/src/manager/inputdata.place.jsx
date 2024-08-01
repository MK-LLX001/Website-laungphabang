import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/lpb.png";
import { Toaster } from "react-hot-toast";
import Category from "./category";
import Places from "./place";
import Rastaurans from "./rastauran";
import Hotels from "./hotel";
import Activitys from "./activity";
import Images from "./image.component";
import RegistorEntrepreneur from "./registor.managerman";
import RegistorEmployees from "./employee";

const InputInfo = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBlurMenu = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  };

  const handleMenuItemClick = (menu) => {
    setSelectedMenu(menu);
    setIsMenuOpen(false);
  };

  const renderMenuItems = () => {
    const menuItems = [
      { label: "Home", action: () => handleMenuItemClick("inputAll") },
      { label: "Categories", action: () => handleMenuItemClick("category") },
      { label: "Places", action: () => handleMenuItemClick("Place") },
      { label: "Restaurants", action: () => handleMenuItemClick("Rastauran") },
      { label: "Hotels", action: () => handleMenuItemClick("Hotel") },
      { label: "Activities", action: () => handleMenuItemClick("Activity") },
      { label: "Images", action: () => handleMenuItemClick("Image") },
      { label: "Entrepreneur", action: () => handleMenuItemClick("Entrepreneur") },
      { label: "Employees", action: () => handleMenuItemClick("Employees") },
    ];

    return menuItems.map((item, index) => (
      <div key={index}>
        <Link
          to=""
          className="w-full justify-center text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-Secondary font-medium rounded-lg text-sm md:text-xl px-5 py-2.5 text-center inline-flex items-center  me-2 md:mb-2"
          onClick={item.action}
        >
          {item.label}
        </Link>
      </div>
    ));
  };

  const renderSelectedMenu = () => {
    switch (selectedMenu) {
      case "category":
        return <Category />;
      case "Place":
        return <Places />;
      case "Rastauran":
        return <Rastaurans />;
      case "Hotel":
        return <Hotels />;
      case "Activity":
        return <Activitys />;
      case "Image":
        return <Images />;
      case "Entrepreneur":
        return <RegistorEntrepreneur />;
        case "Employees":
          return <RegistorEmployees />;
      default:
        return <Detail />;
    }
  };

  return (
    <div className="py-4 px-[5vw] md:px-[2vw]">
      <nav className=" font-noto_san_lao  z-20 md:z-30  sticky top-20 flex items-center gap-4 w-full px-[2vw] py-5 h-[80px] border-b border-grey bg-white">
    
        <div className="flex text-black line-clamp-1 w-full font-bold text-2xl justify-center">
          {selectedMenu && (
            <span className="font-bold text-xl md:text-3xl">ຈັດການຂໍ້ມູນ{selectedMenu}</span>
          )}
        </div>
      </nav>

      <div className="flex-col md:grid grid-cols-[2fr_8fr] gap-5 font-noto_san_lao w-full">
        <div className="flex gap-4 md:z-10 z-20  md:mt-10 w-full md:w-full sticky top-[80px] rounded-xl shadow-md justify-center text-center">
          <div className="block bg-white p-2 font-bold w-full   ">
            <div className="bg-white mt-2 p-2 font-bold w-full sticky top-48">
              <div className="md:hidden block w-full justify-center items-center mb-3 md:mb-0">
                <Link
                  className="w-full justify-center text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-Secondary font-medium rounded-lg text-sm md:text-xl px-5 py-2.5 text-center inline-flex items-center  me-2 md:mb-2"
                  onClick={toggleMenu}
                  onBlur={handleBlurMenu}
                >
                  <i className="fi fi-br-menu-burger"></i>
                </Link>
              </div>

              {isMenuOpen && (
                <div className="grid grid-cols-2 gap-2 md:hidden ">
                  {renderMenuItems()}
                </div>
              )}

              <div className="hidden md:block sticky   ">
                {renderMenuItems()}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[900px] w-full">
          <div className="flex w-full flex-col mt-5 font-bold  h-full">
            {renderSelectedMenu()}
          </div>
        </div>
      </div>
    </div>
  );
 
};


const Detail = () => {
  // DataDetail array
  return(
    <>
    <h2 className=" text-center">WELCOME BRO HOME INFORMATION</h2>
    
    </>
  )

};

export default InputInfo;

