import React from "react";
import AnimationWrapper from "../common/page-animation";
import ProductNavigation from "../components/productis-navigation";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../itemsMui/thomeMui";
import PlacesDatas from "../Admin/Places-Datas";
import HotelsDatas from "../Admin/Hotels-Datas";
import RestaurantDatas from "../Admin/Restaurants-Datas";
import ActivityDatas from "../Admin/Activity-Data";
import UploadData from "../Admin/Upload-Data";
import ManageCategory from "../Admin/Category-Data";
import ManagerImage from "../Admin/image-data";
import InpageNavigation from "./inpage-navigation.component";
import { Link } from "react-router-dom";
const ManagerData = () => {
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
      
      <InpageNavigation routes={["places", "posted", "Hotels", "Restaurants"]}>
          <>
           <button></button>
          </>
        </InpageNavigation>
        {/* These are placeholders for other routes */}
        <div>this page Hotels</div>
        <div>this page Restaurants</div>

      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default ManagerData;
