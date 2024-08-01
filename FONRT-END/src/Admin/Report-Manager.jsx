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
const ReportManager = () => {
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div className="h-cover flex justify-center gap-10 w-full">
          {/* conten blog  */}
          <div className="classBlog w-full ">
            <ProductNavigation
              routes={[
                <div className="flex justify-center items-center gap-2 truncate uppercase">
                   Report-Place </div>,
                <div className="flex justify-center items-center gap-2 truncate uppercase">
                   Report-Hotels</div>,
                <div className="flex justify-center items-center gap-2 truncate uppercase">
                   Report-Restaurant</div>,
                <div className="flex justify-center items-center gap-2 truncate uppercase">
                   Report-Activity</div>,
                <div className="flex justify-center items-center gap-2 truncate uppercase">
                   Report-Blog</div>,
                <div className="flex justify-center items-center gap-2 truncate uppercase">
                 </div>,
                <div className="flex justify-center items-center gap-2 truncate uppercase">
                    <i className="fi fi-rr-picture text-sm md:text-2xl" />Image</div>,
             
              ]}
            >
              {/* // TODO code home  */}
             <PlacesDatas/>
              {/* // TODO code places  */}
            
             <HotelsDatas/>
              {/* // TODO code hotel  */}
              <RestaurantDatas/>
              {/* // TODO code rantraurant  */}
            <ActivityDatas/>

            <UploadData/>

            <ManageCategory/>

            <ManagerImage/>
            
            </ProductNavigation>
          </div>
          {/* trending box  */}
        </div>


      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default ReportManager;
