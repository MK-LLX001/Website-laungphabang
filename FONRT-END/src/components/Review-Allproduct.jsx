import { getdatdata_allpales } from "../function/place.function.Api";
import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet,Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";


const ReviewAllproducts = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await getdatdata_allpales();
        setData(response.data);
        setFilteredData(response.data); // Set initial filtered data
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      window.scroll(0,0);
      loadData();
    }, []);
  
    useEffect(() => {
      handleSearch(searchQuery);
    }, [searchQuery, data]);
  
    const handleSearch = (query) => {
      if (!query) {
        setFilteredData(data);
        return;
      }
  
      const lowerCaseQuery = query.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.description.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(filtered);
    };
  
    const getLink = (id, type) => {
      switch (type) {
        case "hotel":
          return `/detailhotel/${id}`;
        case "restaurant":
          return `/page_restaurants/${id}`;
        case "activity":
          return `/page_activitys/${id}`;
        case "place":
          return `/detailplace/${id}`;
        default:
          return `/unknown/${id}`;
      }
    };
  
    return (
      <section>
       <div>
        <div className="w-full m-4 p-2">
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            filteredData.map((item, index) => (
              <div
                key={index}
                className="h-auto max-w-lg p-2 bg-white border border-gray-200 rounded-lg shadow"
              >
                <AnimationWrapper transition={{ duration: 1, delay: index * 0.1 }}>
                  <div className="container-places">
                    <Link to={getLink(item.id, item.type)}>
                      <img
                        className="rounded-t-lg"
                        src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.image}`}
                        alt="image"
                      />
                      <div className="p-4">
                        <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900">
                          {item.name}
                        </h5>
                        <p className="mb-3 line-clamp-3 font-normal text-gray-700">
                          {item.description}
                        </p>
                        <button className="inline-flex w-full items-center justify-center px-3 py-1 text-sm md:text-xl font-medium text-white bg-blue-700 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                          ເບີງເພີມ
                        </button>
                      </div>
                    </Link>
                  </div>
                </AnimationWrapper>
              </div>
            ))
          )}
        </div>
      </div>
      </section>
    );
  };

export default ReviewAllproducts ;
