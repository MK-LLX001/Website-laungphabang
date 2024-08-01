import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { loadHotel } from "../function/hotel.function.api";
import { loadRastaurant } from "../function/Restaurants.api";
import { Reports } from "../function/place.function.Api";
import { loadActivity } from "../function/Activity.function.api";
import { Reload} from "../function/function.upload.API"
import { GetUser } from "../function/Users.api";
import "../styecss/print.css"; // นำเข้าไฟล์ CSS
import logo from "../imgs/lpb.png";
import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const formatDate = (dateString) => {
  if (!dateString || !dateString.trim()) {
    return ""; // Return empty string for invalid dates
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Report = () => {
  const [openComponent, setOpenComponent] = useState("");

  const handleToggle = (component) => {
    setOpenComponent((prevComponent) =>
      prevComponent === component ? "" : component
    );
  };

  // console.log(handleToggle);

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper transition={{ duration: 1, delay: 0.1 }}>
        <div className="flex items-center justify-center gap-5">
          <button className="btn-dark" onClick={() => handleToggle("places")}>
            Places
          </button>

          <button className="btn-dark" onClick={() => handleToggle("Hotels")}>
            Hotel
          </button>

          <button
            className="btn-dark"
            onClick={() => handleToggle("Restaurant")}
          >
            Restaurant
          </button>

          <button className="btn-dark" onClick={() => handleToggle("Activity")}>
            Activity
          </button>
          <button className="btn-dark" onClick={() => handleToggle("User")}>
            User
          </button>
          <button className="btn-dark" onClick={() => handleToggle("post")}>
           Post-Review
          </button>
        </div>

        {openComponent === "places" && <AnimationWrapper transition={{ duration: 1, delay: 0.4 }}><ReportPlaces /></AnimationWrapper>  }
        {openComponent === "Hotels" &&  <AnimationWrapper transition={{ duration: 1, delay: 0.4 }}><ReportHotel /></AnimationWrapper> }

        {openComponent === "Restaurant" && <AnimationWrapper transition={{ duration: 1, delay: 0.4 }}><ReportRestaurants /></AnimationWrapper> }
        {openComponent === "Activity" &&<AnimationWrapper transition={{ duration: 1, delay: 0.4 }}><ReportActivity /></AnimationWrapper> }
        {openComponent === "User" &&<AnimationWrapper transition={{ duration: 1, delay: 0.4 }}><ReportUsers /></AnimationWrapper> }
        {openComponent === "post" && <AnimationWrapper transition={{ duration: 1, delay: 0.4 }}><ReportPostReview /></AnimationWrapper> }
        {
          openComponent === "" && 
          <>
         <ReportPlaces/>
          </>
        }
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default Report;

// todo ໂຮງແຮມ
export const ReportHotel = () => {
  const [isGetData, setGetData] = useState([]);
  const componentRef = useRef();

  const loadData = async () => {
    try {
      const res = await loadHotel();
      setGetData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  // console.log("datahotels"+JSON.stringify(isGetData));

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <div>
        <AnimationWrapper transition={{ duration: 1, delay: 0.1 }}>
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <button className="btn-light ml-10" onClick={handlePrint}>
              ພິມລາຍງານ
            </button>

            <div ref={componentRef} className="mt-7">
              <div className="flex items-center  bg-dark-grey w-full h-full text-white ">
                <div className=" pl-10">
                  <img src={logo} className="w-32 h-32 object-cover   " />{" "}
                </div>
                <div className="flex items-center justify-center  w-full h-full">
                  {" "}
                  <h3 className="  font-bold justify-center md:text-2xl text-xl ">
                    ລາຍງານຂໍ້ມູນໂຮງແຮມ
                  </h3>
                </div>
              </div>

              <table className="text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-2  truncate-max-w-xs md:text-xl"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 truncate-max-w-xs text-sm md:text-xl"
                    >
                      Code
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 truncate-max-w-xs text-sm md:text-xl"
                    >
                      Rating
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 truncate-max-w-xs text-sm md:text-xl"
                    >
                      Manager
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 truncate-max-w-xs text-sm md:text-xl"
                    >
                      Hotel
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 truncate-max-w-xs text-sm md:text-xl"
                    >
                      Open
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 truncate-max-w-xs text-sm md:text-xl"
                    >
                      Close
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 truncate-max-w-xs text-sm md:text-xl"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 truncate-max-w-xs text-sm md:text-xl"
                    >
                      Connect
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 truncate-max-w-xs text-sm md:text-xl"
                    >
                      Website
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isGetData.length > 0 ? (
                    isGetData.map((items, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-gray-300"
                      >
                        <td className="md:px-2 py-2">{index + 1}</td>

                        <td className="px-2 py-2 truncate">{items.mg_code}</td>

                        <td className="px-2 py-2">
                          <i className="fi fi-ss-star text-xl text-yellow-600"></i>
                          {Number(items.avg_score).toFixed(1)}
                        </td>

                        <td className="px-2 py-2 truncate">{items.mg_name}</td>
                        <td className="px-2 py-2 truncate">{items.ht_name}</td>
                        <td className="px-2 py-2 truncate">{items.ht_open}</td>
                        <td className="px-2 py-2 truncate">{items.ht_close}</td>
                        <td className="px-2 py-2 truncate">{items.ht_price}</td>
                        <td className="px-2 py-2 truncate">
                          {items.ht_connection}
                        </td>
                        <td className="px-2 py-2 truncate">
                          {items.ht_website}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="17" className="px-6 py-4 text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </ThemeProvider>
  );
};

// Todo ສະຖານທີ

export const ReportPlaces = () => {
  const componentRef = useRef();
  const [isGetData, setGetData] = useState(null);
  // Load category data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    Reports()
      .then((res) => {
        setGetData(res.data)
        console.log(res)
      })
      .catch((err) => console.log(err));
  };

  console.log("ຂໍ້ມູນ ສະຖານທີ "+ isGetData)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper transition={{ duration: 1, delay: 0.1 }}>
        <section >
          <button className="btn-light ml-10" onClick={handlePrint}>
            ພິມລາຍງານ
          </button>
          

          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div ref={componentRef}>
              <div className="flex items-center  bg-dark-grey w-full h-full text-white ">
                <div className=" pl-10">
                  <img src={logo} className="w-32 h-32 object-cover   " />{" "}
                </div>
                <div className="flex items-center justify-center  w-full h-full">
                  {" "}
                  <h3 className="  font-bold justify-center md:text-2xl text-xl ">
                    ລາຍງານຂໍ້ມູນສະຖານທີ່ແຫ່ງທອງທ່ຽວ
                  </h3>
                </div>
              </div>
              <table className="  text-sm text-left rtl:text-right text-gray-500 mt-7 ">
                <thead className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className=" px-4 py-2 truncate border-r">
                      No
                    </th>

                    <th scope="col" className=" px-4 py-2 border-r truncate">
                      Rating
                    </th>

                    <th scope="col" className=" px-4 py-2 border-r truncate">
                      Names
                    </th>
                    <th scope="col" className=" px-4 py-2 border-r truncate">
                      Sesion
                    </th>
                    <th scope="col" className=" px-4 py-2 border-r truncate">
                      Start-Time
                    </th>
                    <th scope="col" className=" px-4 py-2 border-r truncate">
                      End-Time
                    </th>
                    <th scope="col" className=" px-4 py-2 border-r truncate ">
                      Adresss
                    </th>
                    <th scope="col" className=" px-4 py-2 border-r truncate ">
                      Connection
                    </th>
                    <th scope="col" className=" px-4 py-2 border-r truncate">
                      Category
                    </th>
                    <th scope="col" className=" px-4 py-2 border-r truncate ">
                      Description
                    </th>
                    <th scope="col" className=" px-4 py-2 border-r truncate ">
                      Warning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isGetData
                    ? isGetData.map((items, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b   hover:bg-gray-300 "
                        >
                          <td className=" px-4 py-2 border-r ">{index + 1}</td>

                          <td className=" px-4 py-2  border-r font-medium ">
                            <i className="fi fi-ss-star text-xl text-yellow-600"></i>{" "}
                            {Number(items.avg_score).toFixed(1)}
                          </td>

                          <td className=" px-4 py-2  border-r truncate">
                            {items.name}
                          </td>
                          <td className=" px-4 py-2  border-r truncate">{items.sesion}</td>
                          <td className=" px-4 py-2  border-r truncate">
                            {getDay(items.created)}
                          </td>
                          <td className=" px-4 py-2  border-r truncate">
                            {items.end_time}
                          </td>
                          <td className=" px-4 py-2  border-r  truncate  max-w-xs">
                            {items.address}
                          </td>
                          <td className=" px-4 py-2  border-r truncate">
                            {items.connection}
                          </td>
                          <td className=" px-4 py-2  border-r truncate">
                            {items.category_name}
                          </td>
                          <td className=" px-4 py-2   border-r truncate max-w-xs">
                            {items.description}
                          </td>
                          <td className=" px-4 py-2  border-r truncate  max-w-xs">
                            {items.warning}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>

              <div className="flex justify-between px-10 my-7">
                <div className="sig">
                  <p>ລາຍເຊັນ</p>
                </div>
                <div className="sig">
                  <p>ຜູ້ສະເໜີ</p>
                </div>
              </div>

            </div>
            
         
         
         
          </div>
          
        

        </section>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

// todo ຮ້ານອາຫານ
export const ReportRestaurants = () => {
  const [isGetData, setGetData] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    loadRastaurant()
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  };
  // console.log(isGetData)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div className=" w-full">
          <button className="btn-light ml-10" onClick={handlePrint}>
            ພິມລາຍງານ
          </button>

          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <div ref={componentRef} className="mt-7 w-full ">
              <div className="flex items-center  bg-dark-grey w-full h-full text-white ">
                <div className=" pl-10">
                  <img src={logo} className="w-32 h-32 object-cover   " />{" "}
                </div>
                <div className="flex items-center justify-center  w-full h-full">
                  {" "}
                  <h3 className="  font-bold justify-center md:text-2xl text-xl ">
                    ລາຍງານຂໍ້ມູນໂຮງແຮມ
                  </h3>
                </div>
              </div>

              <table className="  text-sm text-left rtl:text-right truncate text-gray-500 ">
                <thead className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3 truncate">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Code
                    </th>

                    <th scope="col" className="px-6 py-3 truncate">
                      Rating
                    </th>

                    <th scope="col" className="px-6 py-3 truncate">
                      Name-Manager
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Open
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Close
                    </th>
                    <th scope="col" className="px-6 py-3 truncate ">
                      Connect
                    </th>
                    <th scope="col" className="px-6 py-3 truncate ">
                      Website
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Time-post
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isGetData
                    ? isGetData.map((items, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b   hover:bg-gray-300 "
                        >
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 truncate">
                            {items.mg_code}
                          </td>

                          <td className="md:px-6 md:py-3 p px-4 py-2 font-medium ">
                            <i className="fi fi-ss-star text-xl text-yellow-600"></i>{" "}
                            {Number(items.avg_score).toFixed(1)}
                          </td>

                          <td className="px-6 py-4 truncate">
                            {`${items.mg_name}${items.mg_surname}`}
                          </td>
                          <td className="px-6 py-4 truncate">
                            {items.rest_name}
                          </td>

                          <td className="px-6 py-4 truncate">
                            {items.rest_open}
                          </td>
                          <td className="px-6 py-4 truncate">
                            {items.rest_close}
                          </td>
                          <td className="px-6 py-4 truncate">
                            {items.rest_website}
                          </td>

                          <td className="px-6 py-4 truncate">
                            {items.rest_connect}
                          </td>
                          <td className="px-6 py-4 truncate">
                            {getDay(items.created_time)}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

// todo ກິດຈະກຳ
export const ReportActivity =() =>{
  const [isGetData, setGetData] = useState([]);
  const componentRef = useRef();
  // Load category data on component mount
  useEffect(() => {
    loadData();
  }, []);
  // Define function to load activity data
  const loadData = async () => {
    loadActivity()
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  };
  // console.log("activity" + JSON.stringify(isGetData))

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <ThemeProvider theme={theme}>
      <Toaster />

      <AnimationWrapper>
        <div className="mx-auto max-w-[100%] w-full">
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <button className="btn-light ml-10" onClick={handlePrint}>
              ພິມລາຍງານ
            </button>

            <div ref={componentRef} className="mt-7 w-full ">
              <div className="flex items-center  bg-dark-grey w-full h-full text-white ">
                <div className=" pl-10">
                  <img src={logo} className="w-32 h-32 object-cover   " />{" "}
                </div>
                <div className="flex items-center justify-center  w-full h-full">
                  {" "}
                  <h3 className="  font-bold justify-center md:text-2xl text-xl ">
                    ລາຍງານຂໍ້ມູນໂຮງແຮມ
                  </h3>
                </div>
              </div>

              <table className="  text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3 truncate-max-w-xs">
                      No
                    </th>

                    <th scope="col" className="px-6 py-3 truncate max-w-xs">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 truncate-max-w-xs">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 truncate-max-w-xs">
                      Place
                    </th>
                    <th scope="col" className="px-6 py-3 truncate-max-w-xs">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 truncate-max-w-xs">
                      Open-Data
                    </th>
                    <th scope="col" className="px-6 py-3 truncate-max-w-xs ">
                      Close-Data
                    </th>
                    <th scope="col" className="px-6 py-3 truncate-max-w-xs ">
                      Connection
                    </th>
                    <th scope="col" className="px-6 py-3 truncate-max-w-xs">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3 truncate-max-w-xs  ">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isGetData
                    ? isGetData.map((items, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b   hover:bg-gray-300 "
                        >
                          <td className="px-6 py-4">{index + 1}</td>

                          <td className="px-6 py-4 truncate max-w-xs">
                            {" "}
                            {Number(items.avg_score).toFixed(1)}{" "}
                            <i className="fi fi-ss-star text-xl text-yellow-600"></i>{" "}
                          </td>
                          <td className="px-6 py-4 truncate max-w-xs">
                            {items.ac_name}
                          </td>
                          <td className="px-6 py-4 truncate max-w-xs">
                            {items.pl_name}
                          </td>
                          <td className="px-6 py-4 truncate max-w-xs">
                            {items.category_name}
                          </td>

                          <td className="px-6 py-4 truncate max-w-xs">
                            {formatDate(items.ac_opendate)}
                          </td>
                          <td className="px-6 py-4 truncate max-w-xs">
                            {formatDate(items.ac_closedate)}
                          </td>
                          <td className="px-6 py-4 truncate-max-w-xs">
                            {items.ac_connect}
                          </td>
                          <td className="px-6 py-4 truncate max-w-xs">
                            {items.ac_address}
                          </td>
                          <td className="px-6 py-4 truncate max-w-xs">
                            {items.ac_description}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
}
// todo user

export const ReportUsers = () => {
  const [users, setUsers] = useState([]);
  const componentRef = useRef();
  const loadData = async () => {
    try {
      const res = await GetUser();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  // console.log(users)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const headers = ["No", "Name", "LastName", "Email", "State"];

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <button className="btn-light ml-10" onClick={handlePrint}>
          ພິມລາຍງານ
        </button>

        <div
          ref={componentRef}
          className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg"
        >
          <div className="flex items-center  bg-dark-grey w-full h-full text-white ">
            <div className=" pl-10">
              <img src={logo} className="w-32 h-32 object-cover   " />{" "}
            </div>
            <div className="flex items-center justify-center  w-full h-full">
              {" "}
              <h3 className="  font-bold justify-center md:text-2xl text-xl ">
                ລາຍງານຂໍ້ມູນໂຮງແຮມ
              </h3>
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="px-6 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4">{user.user_name}</td>
                    <td className="px-6 py-4">{user.user_lastname}</td>
                    <td className="px-6 py-4">{user.user_email}</td>
                    <td className="px-6 py-4">{user.state}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="px-6 py-4 text-center"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

// todo post-veview 
export const ReportPostReview = () => {
  
    
  // FIXME: set varable get images get form api to fonrt-end เกับข้อมุนจากกานที่เรา get form databases forn api 
const [isGetData, setGetData] = useState([])
const componentRef = useRef();
// Load category data on component mount
useEffect(() => {
  loadData();
}, []);

// Define function to load category data
const loadData= async () => {
  Reload()
    .then((res) => setGetData(res.data))
    .catch((err) => console.log(err));
};

// console.log(isGetData);
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});



  return (
    <ThemeProvider theme={theme}>
   

      <Toaster />
      <AnimationWrapper>
       <div>
       <button className="btn-light ml-10 mt-6" onClick={handlePrint}>
          ພິມລາຍງານ
        </button>
       <div ref={componentRef} className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
       <div className="flex items-center  bg-dark-grey w-full h-full text-white ">
            <div className=" pl-10">
              <img src={logo} className="w-32 h-32 object-cover   " />{" "}
            </div>
            <div className="flex items-center justify-center  w-full h-full">
              {" "}
              <h3 className="  font-bold justify-center md:text-2xl text-xl ">
                ລາຍງານຂໍ້ມູນໂຮງແຮມ
              </h3>
            </div>
          </div>
              <table className="  text-sm text-left rtl:text-right text-gray-500 mt-7 ">
                <thead className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                  <th scope="col" className="px-6 py-3 truncate">
                      No
                    </th>
                
                    <th scope="col" className="px-6 py-3 truncate">
                      Total-Like
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Pictures
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                     Category
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                     Time
                    </th>
                
                  </tr>
                </thead>
                <tbody>
                  {isGetData
                    ? isGetData.map((items, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b   hover:bg-gray-300 "
                        >
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">{items.score_count} <i className="fi fi-rr-social-network text-dark-grey"></i></td>
                          
                          <td className="px-6 py-4">
                            <img
                              className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
                              src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                                items.img_image
                              }`}
                              alt={items.ht_name}
                            />
                          </td>
                          <td className="px-6 py-4 truncate">{items.up_name}</td>
                          
                          <td className="px-6 py-4 truncate">{items.category_name}</td>
                  
                          <td className="px-6 py-4 truncate  max-w-xl">{items.up_description}</td>
                          <td className="px-6 py-4 truncate  max-w-xl">{getDay(items.time_created)}</td>
                      

                         
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>  
       </div>


      </AnimationWrapper>
    </ThemeProvider>
  );
};
