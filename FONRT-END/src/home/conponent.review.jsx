import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./conponentreview.scss";
import { FaChevronRight } from "react-icons/fa";
import AnimationWrapper from "../common/page-animation";
//  sesion
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as React from "react";

// importImage ********
import img from "../imgs/Kuangsi-Waterfalls/ks1.jpg";
import img2 from "../imgs/Kuangsi-Waterfalls/ks5.jpg";
import img3 from "../imgs/Kuangsi-Waterfalls/ks6.jpg";
import img4 from "../imgs/Kuangsi-Waterfalls//ks3.jpg";
import { Button } from "@material-tailwind/react";
// imprit pic activiti
import imghiking from "../imgs/Logo/hiking (1).png";
import imgSwimming from "../imgs/Logo/swimming (1).png";
import imgRide from "../imgs/Logo/elephant (1).png";
import imgKiking from "../imgs/Logo/kayaking (1).png";
import imgKamping from "../imgs/Logo/tent (1).png";

const HomeReview = () => {
  return (
    <>
      <Popola />
      <Activity />
      <Sesion />
      <Hotel />
    </>
  );
};

export default HomeReview;

const Popola = () => {
  //  ส้่งตวแปลมาเกับรูบเอาไปแมดกับฟังชั้น
  const Data = [
    {
      id: 1,
      imgSrc: img,
      destTitle: "Tadkaugsi",
      location: "Laungphabang",
      grade: "CULTURAL RELAX",
    },
    {
      id: 2,
      imgSrc: img2,
      destTitle: "Tadkaugsi",
      location: "Laungphabang",
      grade: "CULTURAL RELAX",
    },
    {
      id: 3,
      imgSrc: img3,
      destTitle: "Tadkaugsi",
      location: "Laungphabang",
      grade: "CULTURAL RELAX",
    },
    {
      id: 4,
      imgSrc: img4,
      destTitle: "Tadkaugsi",
      location: "Laungphabang",
      grade: "CULTURAL RELAX",
    },
  ];

  return (
    <AnimationWrapper>
      <section className="popular section ">
        <div className="secContainer">
          {/* header popora */}
          <div className="secHeader flex">
            <div className="textDiv">
              <h2 className="secTitle">Popolar Destination</h2>
              <p>
                From historial cities to natrual specteculars, come see the best
                of the world!
              </p>
            </div>
            <div className="iconsDiv flex ">
              <BsArrowLeftShort className="icon leftIcon" />
              <BsArrowRightShort className="icon" />
            </div>
          </div>

          <div className="mainConten  ">
            {Data.map(({ id, imgSrc, destTitle, location, grade }) => {
              return (
                <div key={id} className="singleDestination ">
                  <div className="destImage">
                    <img src={imgSrc} alt="Image title" className="" />

                    <div className="overlayInfo">
                      <h3>{destTitle}</h3>
                      <p>{location}</p>
                      <BsArrowRightShort className="icon" />
                    </div>
                  </div>

                  <div className="destFooter">
                    <div className="number">0{id}</div>

                    <div className="destText flex">
                      <h6>{location}</h6>
                      <span className="flex">
                        <span className="dot">
                          <BsDot className="icon" />
                        </span>
                        Dot
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="relative w-full flex items-center gap-2   uppercase
        text-black font-bold "
          >
            <hr className="w-1/2  border-pink-500" />

            {/*               
           <FaChevronRight className=' w-1/2 absolute md:right-[21%] lg:right-[20%]  lg:w-1/2 ' /> */}

            <Button className="  w-56 bg-white rounded-2xl border text-black">
              Submit
            </Button>

            <hr className=" w-1/2 border-black" />
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

const Activity = () => {
  return (
    <AnimationWrapper>
      <section className="border-2 border-sky-500 ">
        <div className="adcontent">
          <div className="adHeader">
            <div className="relative w-full flex items-center gap-2 my-10 uppercase text-black font-bold">
              <hr className="w-1/2 border-black" />
              <p className="w-52 justify-center text-center">
                travel by activity
              </p>
              <hr className="w-1/2  border-pink-600" />
            </div>
          </div>
        </div>

        <div className="flex grid-rows-4 grid-flow-col gap-5 justify-center items-center  ">
          <div className="flex w-44 h-44 border-3 border-gray-500 justify-center items-center  gap shadow-lg hover:bg-gray-100">
            <Link to="/swimming" className="w-24 h-24 ">
              <img
                src={imgKiking}
                className="h-auto max-w-full"
                alt="Swimming"
              />
              <h3>Description</h3>
            </Link>
          </div>

          <div className=" flex  w-44 h-44  justify-center items-center  gap shadow-lg border-3 border-gray-500  hover:bg-gray-100 ">
            <Link to="/" className="w-24 h-24   ">
              <img src={imgSwimming} className="h-auto max-w-full " />
              <h3>Description</h3>
            </Link>
          </div>
          <div className=" flex  w-44 h-44 justify-center items-center gap border-3 border-gray-500  hover:bg-gray-100 shadow-lg ">
            <Link to="/swimming" className="w-24 h-24  ">
              <img src={imgRide} className=" h-auto max-w-full " />
              <h3>Description</h3>
            </Link>
          </div>
          <div className=" flex  w-44 h-44 justify-center items-center  gap border-3 border-gray-500  hover:bg-gray-100 shadow-lg ">
            <Link to="/swimming" className="w-24 h-24  ">
              <img src={imghiking} className=" h-auto max-w-full " />
              <h3>Description</h3>
            </Link>
          </div>
          <div className=" flex  w-44 h-44  justify-center items-center  gap border-3 border-gray-500  hover:bg-gray-100 shadow-lg ">
            <Link to="/swimming" className="w-24 h-24 ">
              <img src={imgKamping} className=" h-auto max-w-full " />
              <h3>Description</h3>
            </Link>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

//Sesion higth light

const Sesion = () => {
  const DataSesion = [
    {
      name: "Watphusi",
      imgSrc: img,
      review: "Tadkaugsi saysmon",
    },
    {
      name: "Watphusi",
      imgSrc: img3,
      review: "Tadkaugsi saysmon",
    },
    {
      name: "Watphusi",
      imgSrc: img4,
      review: "Tadkaugsi saysmon",
    },
    {
      name: "Watphusi",
      imgSrc: img2,
      review: "Tadkaugsi saysmon",
    },
    {
      name: "Watphusi",
      imgSrc: img3,
      review: "Tadkaugsi saysmon",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <AnimationWrapper>
      <div className="">
        <div className="adHeader">
          <div
            className="relative w-full flex justify-center items-center gap-2 py-4 uppercase
                          text-black font-bold "
          >
            <h1 className=" text-3xl">Season Highlights OF MONTH</h1>
          </div>
        </div>

        <div className=" w-3/4 m-auto ">
          <div className="mt-7">
            <Slider {...settings} >
              {DataSesion.map((d) => {
                return (
                  <div
                    key={Sesion}
                    className=" bg-white h-[450px] text-black rounded-xl border border-solid-3 border-gray-500 drop-shadow-lg"
                  >
                    <div className="h-[22rem] rounded-xl bg-indigo-500 flex justify-center items-center">
                      <img
                        src={d.imgSrc}
                        alt=""
                        className=" w-full rounded-xl ] "
                      />
                    </div>

                    <div className="flex flex-col justify-center items-center gap-1">
                      <p className=" text-xl font-semibold">{d.name}</p>
                      <p>{d.review}</p>
                      <button className=" bg-indigo-500 text-white  text-lg px-6 py-1 rounded-xl">
                        Read more
                      </button>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

const Hotel = () => {
  const DataHotel = [
    {
      Titlle: "Popura hotel in phangphabang",
      name: "Hotel",
      imgSrc: img,
      start: "",
      park: "parking",
      Tel: "+856 020 78856125",
      destTitle: "hello langphabangdf ",
      price: 15000,
      btn: "Book new",
    },
    {
      Titlle: "Popura hotel in phangphabang",
      name: "Hotel",
      imgSrc: img,
      start: "",
      park: "parking",
      Tel: "+856 020 78856125",
      destTitle: "hello langphabangdf ",
      price: 15000,
      btn: "Book new",
    },
    {
      Titlle: "Popura hotel in phangphabang",
      name: "Hotel",
      imgSrc: img,
      start: "",
      park: "parking",
      Tel: "+856 020 78856125",
      destTitle: "hello langphabangdf ",
      price: 15000,
      btn: "Book new",
    },
    {
      Titlle: "Popura hotel in phangphabang",
      name: "Hotel",
      imgSrc: img,
      start: "",
      park: "parking",
      Tel: "+856 020 78856125",
      destTitle: "hello langphabangdf ",
      price: 15000,
      btn: "Book new",
    },
  ];

  return (




    <div className="grid grid-cols-1 gap-4 justify-center" >


      <div  className="header  flex justify-center p-10 ">
        <div className=" flex-col items-center text-center">
          <h1 className=" text-4xl  font-semibold">Hotel inlaungphabang </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore nam
            distinctio velit consequuntur repudiandae ea deleniti nemo id odit
            optio.
          </p>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center m-[10rem] ">
     { DataHotel.map(({Titlle, name, imgSrc, start, park, Tel, destTitle, price, btn},index)=>{

        return(
          <div  key={index} className=" font-semibold ">
         
            <div  className="box  shadow-xl border-gray-400 w-[325px] rounded-3xl ">
              <div className="img">
                <img src={imgSrc} alt="" className="w-full h-[350px] rounded-3xl " />
              </div>
  
              <div className="desc flex justify-between p-2">
                <div className="textleft ">
                  <p>{name}</p>
                  <div className="start">
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                  </div>
                </div>
  
                <div className="textright">
                  <p>
                    <i className="fi fi-sr-parking"></i>
                    <span className=" p-2">{park}</span>
                  </p>
  
                  <p>
                    <i className="fi fi-bs-wifi"></i>
                    <span className=" p-2">Wifi</span>
                  </p>
                  <p>
                    <i className="fi fi-sr-phone-call"></i>
                    <span className=" p-2">{Tel}</span>
                  </p>
                </div>
              </div>
              <hr className="border-2 border-red" />
  
              <div className="footerdesc ">
                <div className="tiitle  p-2">
                  <p>
                    {destTitle}
                  </p>
                </div>
                <div className="btnfooter flex justify-between  text-center p-4 ">
                  <p className=" bg-gray-900 text-white rounded-lg p-2  w-32 ">
                {price}
                  </p>
                  <button className="  bg-blue-gray-400 text-white rounded-lg p-2 w-32">
                  {btn}
                  </button>
                </div>
              </div>
            </div>
        
        </div>
        )
      })
     }


      </div>
    </div>
  );
};
