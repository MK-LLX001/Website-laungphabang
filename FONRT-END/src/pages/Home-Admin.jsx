import image1 from "../imgs/Logo/lpb.png";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { theme } from "../itemsMui/thomeMui";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { ImUserTie } from "react-icons/im";
import { IoNewspaperOutline } from "react-icons/io5";
import { loadHotel } from "../function/hotel.function.api";
import { loadPlace } from "../function/place.function.Api";

import { ReadDefault } from "../function/function.upload.API";
import { loadRastaurant } from "../function/Restaurants.api";
import { GetUser } from "../function/Users.api";
import { ReloadEm } from "../function/employees-api";
import { ReloadMg, Insert, Remove } from "../function/manager.Api";

const HomeAdminPage = () => {
  const {
    userAuth: { user_id, user_name, user_profile_img },
  } = useContext(UserContext);

  const [places, setPlaces] = useState([]);
  const countPlaces = places.length;

  const loadData = async () => {
    loadPlace()
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [hotels, setHotels] = useState([]);
  const countHotels = hotels.length;

  const loadHotels = async () => {
    loadHotel()
      .then((res) => {
        setHotels(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [restaurants, setRestaurants] = useState([]);
  const countRestaurants = restaurants.filter((item) => item.state === "pending");
 
  const countRes=countRestaurants.length;
  // console.log(countRestaurants); 


  const loadRestaurants = async () => {
    loadRastaurant()
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [employees, setEmployees] = useState([]);
  const countEmployees = employees.length;

  const loadEmployees = async () => {
    ReloadEm()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [users, setUsers] = useState([]);
  const countUsers = users.length;

  const loadUsers = async () => {
    GetUser()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [blogs, setBlogs] = useState([]);
  const countBlogs = blogs.length;

  const filteredBlogs = blogs.filter((blog) => blog.status === "pending");
  const countBlog = filteredBlogs.length;

  // console.log(filteredBlogs);

  const loadBlogs = async () => {
    ReadDefault()
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  };



  const [managers, setManagers] = useState([]);
  const countManagers = managers.length;
  const loadManagers = async () => {
    ReloadMg()
      .then((res) => {
        setManagers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
    loadHotels();
    loadRestaurants();
    loadUsers();
    loadEmployees();
    loadBlogs();
    loadManagers();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="">
        <div className="boxmain w-full  ">
          <div className="boxseach flex justify-between items-center ">
            <p>Dashboard</p>
            <div className="search items-center text-center ">
              <input
                type="text"
                placeholder="Search"
                className="bg-grey p-2 rounded-full"
              />
              <button>
                <i className="fi fi-br-bell text-2xl ml-3 flex justify-center"></i>
              </button>
            </div>
          </div>
          <hr className="h-2" />

          <div className="box-detail bg-grey/50 mt-5 p-3">
            <div className="box-items flex flex-col md:flex-row gap-3 w-full">
              <div className="items1 bg-white border rounded-xl p-3 ">
                <div className=" bg-blue-600 rounded-xl pl-3 text-white text-xl font-semibold box-name flex gap-3 justify-between p-2 px-10 items-center ">
                  <p className="pl-10">ສະບາຍດີທ່ານ: {user_name}</p>
                  <img
                    src={
                      user_profile_img && user_profile_img.startsWith("http")
                        ? user_profile_img
                        : `${
                            import.meta.env.VITE_SERVER_DOMAIN_IMG
                          }/${user_profile_img}`
                    }
                    alt="image"
                    className="aspect-auto w-16 h-16 rounded-xl"
                  />
                </div>

                <div className="boxoverview items-center   ">
                  <div className="flex justify-center mt-2">
                    {" "}
                    <p className="pl-3 md:text-2xl font-semibold">
                      ຈຳນວນລາຍງານທັງໝົດລະບົບ
                    </p>
                  </div>

                  <div className="itemsreview mt-4 flex gap-5 px-3 justify-center">
                    <div className="boxreview ">
                      <p className="font-semibold md:text-2xl text-xl">
                        ຜູ້ໃຊ້ທົວໄປ
                      </p>
                      <p className="font-bold text-xl md:text-2xl ">
                        {Number(countUsers).toFixed(1)}
                      </p>
                    </div>
                    <div className="boxreview">
                      <p className="font-semibold text-xl">ພະນັກງານ</p>
                      <p className="font-bold text-xl md:text-2xl">
                        {Number(countEmployees).toFixed(1)}
                      </p>
                    </div>
                    <div className="boxreview">
                      <p className="font-semibold text-xl">ຜູ້ປະກອບການ</p>
                      <p className="font-bold text-xl md:text-2xl">
                        {Number(countManagers).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="box-icon w-full ">
                  <p className="pl-3 mt-3">i-con menu</p>

                  <div className="itemsreview mt-4 flex gap-1 md:gap-5 p-2 md:p-4">
                    <div className="boxreview  text-center">
                      <button className="bg-blue-500 rounded-full md:w-14  md:h-14 w-10 h-10  text-white   ">
                        <Link to="/placesdata">
                          {" "}
                          <i className="fi fi-rr-house-building text-sm md:text-2xl"></i>{" "}
                        </Link>
                      </button>
                      <p className="font-semibold text-sm md:text-xl">ສະຖານທີ່</p>
                    </div>
                    <div className="boxreview  text-center">
                      <button className="bg-blue-500 rounded-full  text-white md:w-14  md:h-14 w-10 h-10 ">
                        <Link to="/acticitydata">
                          {" "}
                          <i className="fi fi-rs-running text-sm md:text-2xl"></i>{" "}
                        </Link>
                      </button>
                      <p className="font-semibold text-sm md:text-xl">
                        ກີດຈະກຳ
                      </p>
                    </div>
                    <div className="boxreview  text-center">
                      <button className="bg-blue-500 rounded-full  text-white md:w-14  md:h-14 w-10 h-10  ">
                        <Link to="/hotelsdata">
                          {" "}
                          <i className="fi fi-rs-hotel text-sm md:text-2xl"></i>{" "}
                        </Link>
                      </button>
                      <p className="font-semibold text-sm md:text-xl ">ໂຮງແຮມ</p>
                    </div>
                    <div className="boxreview  text-center">
                      <button className="bg-blue-500 rounded-full  text-white  md:w-14  md:h-14 w-10 h-10 ">
                        <Link to="/restaurantdata">
                          {" "}
                          <i className="fi fi-rs-utensils text-sm md:text-2xl"></i>{" "}
                        </Link>
                      </button>
                      <p className="font-semibold text-sm md:text-xl">
                       ຮ້ານອາຫານ
                      </p>
                    </div>
                    <div className="boxreview  text-center">
                      <button className="bg-blue-500 rounded-full text-white  md:w-14  md:h-14 w-10 h-10 ">
                        <Link to="/image-data">
                          {" "}
                          <i className="fi fi-rs-picture text-sm md:text-2xl"></i>{" "}
                        </Link>
                      </button>
                      <p className="font-semibold text-sm md:text-xl">ຮູບພາບ</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="items2 flex-row justify-center  w-full bg-white border rounded-xl p-3 ">
                <div className="flex w-full   gap-4 ">
                  <div className="flex w-full flex-col justify-center items-center mt-4 gap-3">
                    <p className="text-xl flex justify-center py-3">
                    ຮາຍການທີ່ອັບມາໃຫ່ມທີ່ຍັງບໍ່ໄດ້ກວດສອບ
                    </p>
                    <Link
                      to="/admin/Datas-uploads"
                      className="bg-grey flex w-full justify-center items-center rounded-xl p-2 "
                    >
                      <p className=" relative text-2xl">
                        ໂພສ
                        {
                          countBlog ? (<>

                             <i className="fi fi-rs-bell text-2xl "></i>
                        <p className=" absolute top-0 -right-4 w-8 bg-Secondary rounded-xl text-white ">
                          <p className="flex justify-center items-center">
                            {countBlog }
                          </p>
                        </p>

                          </>): (null)
                        }
                       
                      </p>
                    </Link>
                    <Link
                      to="/ckeckRestaurant"
                      className="bg-grey flex w-full justify-center items-center rounded-xl p-2 "
                    >
                      <p className=" relative text-2xl">
                        ຮ້ານອາຫານ
                        {
                          countRes ? (<>

                             <i className="fi fi-rs-bell text-2xl "></i>
                        <p className=" absolute top-0 -right-4 w-8 bg-Secondary rounded-xl text-white ">
                          <p className="flex justify-center items-center">
                            {countRes }
                          </p>
                        </p>
                        
                          </>): (null)
                        }

                      </p>
                    </Link>
                    <Link
                      to="/admin/Datas-uploads"
                      className="bg-grey flex w-full justify-center items-center rounded-xl p-2 "
                    >
                      <p className=" relative text-2xl">
                       ໂຮງແຮມ
                       {
                          countBlog ? (<>

                             <i className="fi fi-rs-bell text-2xl "></i>
                        <p className=" absolute top-0 -right-4 w-8 bg-Secondary rounded-xl text-white ">
                          <p className="flex justify-center items-center">
                            {countBlog }
                          </p>
                        </p>
                        
                          </>): (null)
                        }
                      </p>
                    </Link>
                  </div>

                  <div className="flex flex-col w-full justify-center items-center mt-4 gap-3">
                    <p className="text-xl flex justify-center py-3">
                     ຮາຍການທີ່່ຖືກປະຕິເສດ
                    </p>
                    <Link
                      to="/admin/Datas-uploads"
                      className="bg-grey flex justify-center items-center rounded-xl p-2 w-full "
                    >
                      <p className=" relative text-2xl">
                       ໂພສ
                       {
                          countBlog ? (<>

                             <i className="fi fi-rs-bell text-2xl "></i>
                        <p className=" absolute top-0 -right-4 w-8 bg-Secondary rounded-xl text-white ">
                          <p className="flex justify-center items-center">
                            {countBlog }
                          </p>
                        </p>
                        
                          </>): (null)
                        }

                      </p>
                    </Link>
                    <Link
                      to="/admin/Datas-uploads"
                      className="bg-grey flex justify-center items-center rounded-xl p-2 w-full "
                    >
                      <p className=" relative text-2xl">
                       ຮ້ານອາຫານ
                         {
                          countBlog ? (<>

                             <i className="fi fi-rs-bell text-2xl "></i>
                        <p className=" absolute top-0 -right-4 w-8 bg-Secondary rounded-xl text-white ">
                          <p className="flex justify-center items-center">
                            {countBlog }
                          </p>
                        </p>
                        
                          </>): (null)
                        }

                      </p>
                    </Link>
                    <Link
                      to="/admin/Datas-uploads"
                      className="bg-grey flex justify-center items-center rounded-xl p-2 w-full "
                    >
                      <p className=" relative text-2xl">
                      ໂຮງແຮມ
                        {
                          countBlog ? (<>

                             <i className="fi fi-rs-bell text-2xl "></i>
                        <p className=" absolute top-0 -right-4 w-8 bg-Secondary rounded-xl text-white ">
                          <p className="flex justify-center items-center">
                            {countBlog }
                          </p>
                        </p>
                        
                          </>): (null)
                        }

                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="box-item2 flex flex-col md:flex-row gap-4 mt-4  ">
              <hr />

              {/* // todo ສະຖານທີ່ລະດັບ 5 ດາວ  */}

              <div className="tems2-1  justify-center items-center flex bg-white border gap-4  p-3 rounded-xl w-full ">
                <p className="text-xl flex justify-center">
                  ຈຳນວນລາຍງານທັງໝົດລະບົບ
                </p>
                <div className="  flex   mt-4">
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: countPlaces, label: "places " },
                          { id: 1, value: countHotels, label: "hotels " },
                          {
                            id: 2,
                            value: countRestaurants,
                            label: "restaurants ",
                          },
                          { id: 3, value: countBlogs, label: "Blogs" },
                        ],
                      },
                    ]}
                    width={500}
                    height={200}
                  />
                </div>
              </div>
              {/* // todo ຈຳນວນ user & employee  */}

              {/* <div className="tems2-1  justify-center items-center flex bg-white border gap-4  p-3 rounded-xl w-full ">
              <div className="flex-col ">
                <span className="items-center text-xl font-semibold">
                  ຈຳນວນພະນັກງານ ແລະ ຜູ້ໃຊ້ທົວໄປ
                </span>
                <div className="flex items-center border-b justify-start gap-2 p-1">
                  <button className="text-xl font-semibold  bg-blue-600  text-white w-10 h-10 rounded-full  ">
                    <i className="fi fi-rr-user  text-2xl flex justify-center items-center">
                      {" "}
                    </i>
                  </button>
                  <p>ຜູ້ໃຊ້ທົວໄປທັງໝົດ {"10" + "ຄົນ"} </p>
                </div>
                <div className="flex items-center border-b justify-start gap-2 p-1 ">
                  <button className=" font-semibold w-10 h-10 bg-blue-600 rounded-full text-whit flex justify-center items-center text-white  ">
                    <ImUserTie className=" text-2xl " />
                  </button>
                  <p> ພະນັກງານທັງໝົດ {"7" + "ຄົນ"} </p>
                </div>

                <div className="flex items-center border-b justify-start gap-2 p-1">
                  <button className="text-xl font-semibold w-10 h-10 bg-blue-600 rounded-full text-white ">
                    <i className="fi fi-rr-user-gear  text-2xl flex justify-center items-center "></i>
                  </button>{" "}
                  <p> ຜູ້ປະກອບການທັງໝົດ {"10" + "ຄົນ"} </p>
                </div>
              </div>
            </div> */}
              {/* //todo ລາຍງານ  */}
              <div className="tems2-1  justify-center items-center flex bg-white border gap-4  p-3 rounded-xl w-full ">
                <div className="flex-col  ">
                  <span className="items-center text-xl font-semibold">
                    ລາຍງານ
                  </span>

                  <div className="flex items-center border-b justify-between gap-2 p-1">
                    <p>ລາຍງານສະຖານທີ່</p>
                    <Link
                      to="/reportplaces"
                      className="text-xl w-24 h-10 font-semibold  bg-Secondary  text-white  rounded-xl flex justify-center items-center  "
                    >
                      <IoNewspaperOutline className="text-2xl" />
                    </Link>
                  </div>

                  <div className="flex items-center border-b justify-between gap-2 p-1">
                    <p>ລາຍງານ-blog</p>
                    <Link
                      to="/report-blog"
                      className="text-xl w-24 h-10 font-semibold  bg-Secondary  text-white  rounded-xl flex justify-center items-center  "
                    >
                      <IoNewspaperOutline className="text-2xl" />
                    </Link>
                  </div>

                  <div className="flex items-center border-b justify-between gap-2 p-1">
                    <p>ລາຍງານໂຮງແຮມ</p>
                    <Link
                      to="/reporthotels"
                      className="text-xl w-24 h-10 font-semibold  bg-Secondary  text-white  rounded-xl flex justify-center items-center  "
                    >
                      <IoNewspaperOutline className="text-2xl" />
                    </Link>
                  </div>

                  <div className="flex items-center border-b justify-between gap-2 p-1">
                    <p>ລາຍງານຮ້ານອາຫານ</p>
                    <Link
                      to="/reportrestaurant"
                      className="text-xl w-24 h-10 font-semibold  bg-Secondary  text-white  rounded-xl flex justify-center items-center  "
                    >
                      <IoNewspaperOutline className="text-2xl" />
                    </Link>
                  </div>

                  <div className="flex items-center border-b justify-between gap-2 p-1">
                    <p>ລາຍງານຜູ້ໃຊ້</p>
                    <Link
                      to="/report-user"
                      className="text-xl w-24 h-10 font-semibold  bg-Secondary  text-white  rounded-xl flex justify-center items-center  "
                    >
                      <IoNewspaperOutline className="text-2xl" />
                    </Link>
                  </div>

                  <div className="flex items-center border-b justify-between  gap-2 p-1">
                    <p>ລາຍງານພະນັກງານ</p>
                    <Link
                      to={""}
                      className="text-xl w-24 h-10 font-semibold  bg-Secondary  text-white  rounded-xl flex justify-center items-center  "
                    >
                      <IoNewspaperOutline className="text-2xl" />
                    </Link>
                  </div>

                  <div className="flex items-center border-b justify-between  gap-2 p-1">
                    <p>ລາຍງານຜູ້ປະກອບການ</p>
                    <Link
                      to={""}
                      className="text-xl w-24 h-10 font-semibold  bg-Secondary  text-white  rounded-xl flex justify-center items-center  "
                    >
                      <IoNewspaperOutline className="text-2xl" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HomeAdminPage;

const data = [
  { value: 5, label: "ສະຖານທີ່" },
  { value: 10, label: "ໂຮງແຮມ" },
  { value: 15, label: "ຮ່້ານອາຫານ" },
  { value: 20, label: "ອື່ນໆ" },
];

const size = {
  width: 400,
  height: 210,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

function PieChartWithCenterLabel() {
  return (
    <ThemeProvider theme={theme}>
      <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
        <PieCenterLabel>Blog-post</PieCenterLabel>
      </PieChart>
    </ThemeProvider>
  );
}
