

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { Reports } from "../function/place.function.Api";
import "../styecss/print.css"; // นำเข้าไฟล์ CSS
import logo from "../imgs/lpb.png";
import { getDay } from "../common/date";



// Todo ສະຖານທີ

const Report_Managers = () => {
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

  
  export default Report_Managers;
  

