import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DataActivitys } from "../data/data.component.pupula";
import Loader from "./loader.component";
import AnimationWrapper from "../common/page-animation";

const SearchByBtnActivity = () => {
  const { searchQuery } = useParams();
  console.log(searchQuery)
  const [filteredData, setFilteredData] = useState([]);

  const isGetData = DataActivitys();

  console.log(isGetData)

  useEffect(() => {
    if (isGetData && searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = isGetData.filter(item =>
        item.ac_name?.toLowerCase().includes(lowercasedQuery) ||
        item.ac_description?.toLowerCase().includes(lowercasedQuery) ||
        item.category_name?.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredData(filtered);
    }
  }, [isGetData, searchQuery]);

  if (!isGetData) {
    return <Loader />;
  }

  return (
    <AnimationWrapper>
      <div className="menu p-4 ">
        <div className="boxmenu grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="Maincard h-auto max-w-lg p-2 bg-white border border-gray-200 rounded-lg shadow"
            >
              <div className="container-Hotels_products">
                <Link to={"/page_activitys/" + item.ac_id}>
                  <img
                    className="rounded-t-lg p-2"
                    src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.ac_image}`}
                    alt={item.ac_name}
                  />
                  <div className="className flex justify-between">
                    <h5 className="mb-2 md:text-2xl text-sm mt-2 font-bold tracking-tight text-gray-900 ">
                      {item.ac_name}
                    </h5>
                   <div className=" flex-col ">
                   <h5 className="mb-2 md:text-2xl text-sm mt-2 font-bold tracking-tight text-gray-900 gap-2 ">
                    { Number(item.avg_score).toFixed(1) }    <i className="fi fi-ss-star w-4 h-4 pr-1 text-yellow-300 text-xl "> </i>
                    </h5>
                   </div>
                    

                  </div>
                  <div className="classDesc h-auto">
                    <p className="mb-3 line-clamp-3 md:line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
                      {item.ac_description}
                    </p>
                  </div>
                  <div className="flex items-center w-full mt-2.5 mb-1 gap-1">
                    <div className="classBtnReadMro w-full">
                      <button
                        to={"/detailhotel/" + item.ac_id}
                        className="inline-flex w-full items-center justify-center md:px-3 md:py-1 px-2 py-1 text-sm md:text-xl font-medium text-center text-white bg-blue-700 rounded-xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        ເບີງເພີມ  
                      </button>
                    </div>
                 
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default SearchByBtnActivity;
