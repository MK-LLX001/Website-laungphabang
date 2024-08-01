import React from "react";
import logo from "../imgs/Logo/lpb.png";
import { Link } from "react-router-dom";
import { Datafooter } from "../data/data.component.pupula";

const Footer = () => {
  return (
    <div className="bg-[#645e6e] py-4 mt-10">
      <footer className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <Link to="#" className="flex items-center mb-4">
              <img src={logo} className="w-16 h-16" alt="FlowBite Logo" />
              <span className="text-white text-2xl font-semibold ml-2">Flowbite</span>
            </Link>
            <span className="text-white text-center md:text-left">Some additional description or tagline for the company can go here.</span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-center md:text-left">
            {Datafooter.map((item, index) => (
              <div key={index}>
                <h3 className="mb-6 text-sm text-white font-bold">{item.title}</h3>
                <ul className="text-gray-300 font-medium">
                  <li className="mb-4">{item.desc1}</li>
                  <li className="mb-4">{item.desc2}</li>
                  <li>{item.desc3}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-500 my-6" />

        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <span className="text-sm text-gray-300 sm:text-center mb-4 sm:mb-0">
            " ສະບາຍດີ ເມືອງຫຼວງພະບາງ " 
          </span>
          <div className="flex space-x-6">
            {/* Social Icons */}
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fi fi-rr-facebook"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fi fi-rr-twitter"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fi fi-rr-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
