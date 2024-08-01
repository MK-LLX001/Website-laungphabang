
import img1 from "../imgs/Kuangsi-Waterfalls/ks1.jpg";
import img2 from "../imgs/Kuangsi-Waterfalls/ks2.jpg";
import img3 from "../imgs/Kuangsi-Waterfalls/ks3.jpg";
import img4 from "../imgs/Kuangsi-Waterfalls/ks4.jpg";
import img5 from "../imgs/Kuangsi-Waterfalls/ks5.jpg";
import img6 from "../imgs/Kuangsi-Waterfalls/ks6.jpg";

//  image hotel
import h_img1 from "../imgs/Hotel/hotel1.webp";
import h_img2 from "../imgs/Hotel/hotel16.jpg";
import h_img3 from "../imgs/Hotel/hotel2.jpg";
import h_img4 from "../imgs/Hotel/hotel3.webp";
import h_img5 from "../imgs/Hotel/hotel4.jpg";
import h_img6 from "../imgs/Hotel/hotel5.webp";
//  image food 
import f_img1 from "../imgs/food/fd1.jpg";
import f_img2 from "../imgs/food/fd2.jpg";
import f_img3 from "../imgs/food/fd3.jpg";
import f_img4 from "../imgs/food/fd4.jpg";
import f_img5 from "../imgs/food/fd5.jpg";
import f_img6 from "../imgs/food/fd6.jpg";

import { useState, useEffect } from "react";
import { loadPlace } from "../function/place.function.Api";
import { loadHotel } from "../function/hotel.function.api";
import { loadRastaurant } from "../function/Restaurants.api";
import { loadActivity } from "../function/Activity.function.api";


export const DataPlaces = () => {
  const [isGetData, setGetdata] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      const res = await loadPlace();
      setGetdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    isGetData 
   
  )
};

export const DataHotels = () => {
  const [isGetData, setGetdata] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      const res = await loadHotel();
      setGetdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    isGetData 
   
  )
};

export const DataActivitys = () => {
  const [isGetData, setGetdata] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      const res = await loadActivity();
      setGetdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    isGetData 
   
  )
};


export const DataRestaurants = () => {
  const [isGetData, setGetdata] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      const res = await loadRastaurant();
      setGetdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };
// console.log(isGetData)

  return (
    isGetData 
   
  )
};










export const DataPopula = [
    // Your data here...
    {
      p_image: img1,
      p_name: "Name01",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_rating: "5.0",
      path: "#",
    },
    {
      p_image: img2,
      p_name: "Name02",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_rating: "5.0",
      path: "#",
    },
    {
      p_image: img3,
      p_name: "Name03",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_rating: "5.0",
      path: "#",
    },
    {
      p_image: img4,
      p_name: "Name04",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_rating: "5.0",
      path: "#",
    },
    {
      p_image: img5,
      p_name: "Name04",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_rating: "5.0",
      path: "#",
    },
    {
      p_image: img6,
      p_name: "Name04",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_rating: "5.0",
      path: "#",
    },
  ];



export      const DataSesion = [

    {
      image:img1,
      name:"number01",
      path:"/#"
    },
    {
      image:img2,
      name:"number01",
      path:"/#"
    },
    {
      image:img3,
      name:"number01",
      path:"/#"
    },
    {
      image:img4,
      name:"number01",
      path:"/#"
    },
    {
      image:img5,
      name:"number01",
      path:"/#"
    }
   ];

export const Datahotel = [
    // Your data here...
    {
      p_image: h_img1,
      p_name: "Name01",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
        p_book: "BOOK NOW",
        P_price: "150,000",
      path: "/detailfood_hotel",
    },
    {
      p_image: h_img2,
      p_name: "Name02",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
        p_book: "BOOK NOW",
        P_price: "150,000",
      path: "#",
    },
    {
      p_image: h_img3,
      p_name: "Name03",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
        p_book: "BOOK NOW",
        P_price: "150,000",
      path: "#",
    },
    {
      p_image: h_img4,
      p_name: "Name04",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_book: "BOOK NOW",
      P_price: "150,000",
      path: "#",
    },
    {
        p_image: h_img5,
        p_name: "Name04",
        p_des:
          "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
        p_book: "BOOK NOW",
        P_price: "150,000",
        path: "#",
      },
      {
        p_image: h_img6,
        p_name: "Name04",
        p_des:
          "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
        p_book: "BOOK NOW",
        P_price: "150,000",
        path: "#",
      },
  ];

export const Datafooter = [

    {
        title:"Popular places",
        desc1:"ວັດຊຽງທອງ",
        desc2:"ນ້ຳຕົກຕາດກວາງຊີ",
        desc3:"ຕະຫຼາດມືດ",
    },
    {
        title:"Experiences",
        desc1:"ວັດຊຽງທອງ",
        desc2:"ນ້ຳຕົກຕາດກວາງຊີ",
        desc3:"ຕະຫຼາດມືດ",
    },
    {
        title:"Contact Us",
        desc1:"ວັດຊຽງທອງ",
        desc2:"ນ້ຳຕົກຕາດກວາງຊີ",
        desc3:"ຕະຫຼາດມືດ",
    },

]

export const DataFoods = [
    {
      image:  f_img1,
      name: "ຕຳໝາກຫຸ່ງ",
    },
    {
      image: f_img2,
      name: "ຕຳໝາກຫຸ່ງ",
    },
    {
      image: f_img3,
      name: "ຕຳໝາກຫຸ່ງ",
    },
    {
      image: f_img4,
      name: "ຕຳໝາກຫຸ່ງ",
    },
    {
      image: f_img5,
      name: "ຕຳໝາກຫຸ່ງ",
    },
    {
      image: f_img6,
      name: "ຕຳໝາກຫຸ່ງ",
    },
  ];



// export const DataMenu = [
//   // Your data here...
  

//   {
//     p_image: img1,
//     p_name: "Name01",
//     p_des:
//       "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
//     p_rating: "5.0",
//     path: "/detailplace",
//   },
//   {
//     p_image: img2,
//     p_name: "Name02",
//     p_des:
//       "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
//     p_rating: "5.0",
//     path: "#",
//   },
//   {
//     p_image: img3,
//     p_name: "Name03",
//     p_des:
//       "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
//     p_rating: "5.0",
//     path: "#",
//   },
//   {
//     p_image: img4,
//     p_name: "Name04",
//     p_des:
//       "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
//     p_rating: "5.0",
//     path: "#",
//   },
//   {
//     p_image: img5,
//     p_name: "Name04",
//     p_des:
//       "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
//     p_rating: "5.0",
//     path: "#",
//   },
//   {
//     p_image: img6,
//     p_name: "Name04",
//     p_des:
//       "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
//     p_rating: "5.0",
//     path: "#",
//   },
// ];

export const  DataSliderDetail = [
 
    { id: 1, name: 'ວັດຊຽງທອງ', imgSrc: f_img1 ,path: "#",desc:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quod!"},
    { id: 2, name: 'ວັດຊຽງທອງ', imgSrc: f_img2 ,path:"#" ,desc:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quod!"},
    { id: 3, name: 'ວັດຊຽງທອງ', imgSrc: f_img3 ,path: "#" ,desc:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quod!"},
    { id: 4, name: 'ວັດຊຽງທອງ', imgSrc: f_img4 ,path: "#" ,desc:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quod!"},
    { id: 5, name: 'ວັດຊຽງທອງ', imgSrc: f_img5 ,path: "#" ,desc:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quod!"},
    { id: 6, name: 'ວັດຊຽງທອງ', imgSrc: f_img6 ,path: "#" ,desc:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quod!"},
    { id: 7, name: 'ວັດຊຽງທອງ', imgSrc: f_img4 ,path: "#" ,desc:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quod!"},

]

export const DataAuthor = [
   // Your data here...
   {
    p_image: f_img1,
    p_name: "Name01",
    p_des:
      "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_book: "BOOK NOW",
      P_price: "150,000",
    path: "#",
  },
  {
    p_image: f_img2,
    p_name: "Name02",
    p_des:
      "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_book: "BOOK NOW",
      P_price: "150,000",
    path: "#",
  },
  {
    p_image: f_img3,
    p_name: "Name03",
    p_des:
      "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_book: "BOOK NOW",
      P_price: "150,000",
    path: "#",
  },
  {
    p_image: f_img4,
    p_name: "Name04",
    p_des:
      "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
    p_book: "BOOK NOW",
    P_price: "150,000",
    path: "#",
  },
  {
      p_image: f_img5,
      p_name: "Name05",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_book: "BOOK NOW",
      P_price: "150,000",
      path: "#",
    },
    {
      p_image: f_img6,
      p_name: "Name06",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_book: "BOOK NOW",
      P_price: "150,000",
      path: "#",
    },
    {
      p_image: f_img1,
      p_name: "Name07",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_book: "BOOK NOW",
      P_price: "150,000",
      path: "#",
    },
    {
      p_image: f_img3,
      p_name: "Name08",
      p_des:
        "  Here are the biggest enterprise technology acquisitions of 2021 in reverse chronological order",
      p_book: "BOOK NOW",
      P_price: "150,000",
      path: "#",
    },
]