import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { loadHotel, Remove } from "../function/hotel.function.api";
import { Link } from "react-router-dom";


const HotelsDatas = () => {
  const [isGetData, setGetData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const loadData = async () => {
    loadHotel()
      .then((res) => {
        setGetData(res.data);
        setFilteredData(res.data); // Initialize filtered data with all hotel data
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  // console.log(isGetData) 

  const handleRemove = async (id) => {
    Swal.fire({
      title: 'ທ່ານຕ້ອງການຈະລົບຂໍ້ມູນແທ້ຫວາ',
      text: 'ທ່ານຈະບໍ່ສາມາດຍົກເລີກການນຳເນີນງານນີ້ໄດ້!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ໂດຍ, ລືບຂໍ້ມູນ!'
    }).then((result) => {
      if (result.isConfirmed) {
        Remove(id)
          .then((res) => {
            console.log(res);
            loadData();
            toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = isGetData.filter(item =>
      (item.ht_name && item.ht_name.toLowerCase().includes(query)) ||
      (item.mg_fullname && item.mg_fullname.toLowerCase().includes(query)) ||
      (item.category_name && item.category_name.toLowerCase().includes(query))
    );
    setFilteredData(filtered);
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <div className=" mx-auto max-w-[90%] w-full ml-10">
      <AnimationWrapper transition={{ duration: 1, delay: 0.1 }}>
      
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
           
                <span className="flex justify-center font-bold text-center py-4 md:text-3xl text-xl">
                  ຕາຕະລາງຂໍ້ມູນໂຮງແຮມ
                </span>
                <div className="flex  mb-4 gap-2">
                <Link to="/hotelsdata" className="btn-dark ml-3">ອັບໂຫລດຂໍ້ມູນ</Link>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="ຄົ້ນຫາ..."
                    className="p-2 border border-gray-300 rounded"
                  />
                 
               
                 </div>
            <table className="text-sm text-left rtl:text-right text-gray-500 mt-7">
              <thead className="  text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="md:px-6 md:py-3 px-2 py-1 truncate text-sm md:text-xl ">No</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Action</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Rating</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Pictures</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Manager</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Hotel</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Category</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Price</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Open</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Close</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Connect</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Website</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Location</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Convenience</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Address</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Description</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Time-post</th>
                  <th scope="col" className="px-6 py-3 truncate text-sm md:text-xl">Code</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((items, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-300">
                      <td className="md:px-6 md:py-3 px-2 py-1 ">{index + 1}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={"/edithotel/" + items.ht_id}
                          className="p-3 font-medium text-blue-600 hover:underline"
                        >
                          <i className="fi fi-ss-edit text-2xl"></i>
                        </Link>
                        <Link
                          to="#"
                          onClick={() => handleRemove(items.ht_id)}
                          className="p-3 font-medium text-blue-600 hover:underline"
                        >
                          <i className="fi fi-sr-delete text-2xl text-red"></i>
                        </Link>
                      </td>

                      <td className="md:px-6 md:py-3 px-2 py-1 font-medium "><i className="fi fi-ss-star text-xl text-yellow-600" ></i> {Number(items.avg_score).toFixed(1)}</td>
                      <td className="px-6 py-4">
                        <img
                          className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
                          src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${items.img_image}`}
                          alt={items.ht_name}
                        />
                      </td>
                      <td className="px-6 py-4 truncate ">{items.mg_name}</td>
                      <td className="px-6 py-4 truncate ">{items.ht_name}</td>
                      <td className="px-6 py-4 truncate">{items.category_name}</td>
                      <td className="px-6 py-4 truncate">{items.ht_price}</td>
                      <td className="px-6 py-4 truncate">{items.ht_open}</td>
                      <td className="px-6 py-4 truncate">{items.ht_close}</td>
                      <td className="px-6 py-4 truncate">{items.ht_connection}</td>
                      <td className="px-6 py-4 truncate">{items.ht_website}</td>
                      <td className="px-6 py-4 truncate max-w-xs">{items.ht_location}</td>
                      <td className="px-6 py-4 truncate max-w-xs">{items.ht_convenience}</td>
                      <td className="px-6 py-4 truncate max-w-xs">{items.ht_address}</td>
                      <td className="px-6 py-4 truncate max-w-xs">{items.ht_description}</td>
                      <td className="px-6 py-4 truncate">{items.time_created}</td>
                      <td className="px-6 py-4 truncate">{items.mg_code}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="17" className="px-6 py-4 text-center">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      
      </AnimationWrapper>
      </div> 
    </ThemeProvider>
  );
};

export default HotelsDatas;
