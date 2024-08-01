import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { GetRestaurantAllByIdUser, Remove } from "../function/Restaurants.api";
import { UserContext } from "../App";
import { getDay } from "../common/date";

const TableHeader = ({ headers }) => (
  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
    <tr>
      {headers.map((header, index) => (
        <th key={index} scope="col" className="px-6 py-3 truncate">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const TableRow = ({ item, index, handleRemove }) => (
  <tr key={index} className="bg-white border-b hover:bg-gray-300">
    <td className="px-6 py-4">{index + 1}</td>
    <td className="px-6 py-4">
      <Link
        to={`/editrestaurant/${item.rest_id}`}
        className="p-3 font-medium text-blue-600 hover:underline"
      >
        <i className="fi fi-ss-edit text-2xl"></i>
      </Link>
      <Link
        to="#"
        onClick={() => handleRemove(item.rest_id)}
        className="p-3 font-medium text-blue-600 hover:underline"
      >
        <i className="fi fi-sr-delete text-2xl text-red"></i>
      </Link>
    </td>
    <td className="md:px-6 md:py-3 px-2 py-1 font-medium "><i className="fi fi-ss-star text-xl text-yellow-600" ></i> {Number(item.avg_score).toFixed(1)}</td>
    <td className="px-6 py-4">
      <img
        className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
        src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.rest_image}`}
        alt={item.rest_name}
      />
    </td>

   
    <td className="px-6 py-4 truncate">{item.mg_name}</td>
    <td className="px-6 py-4 truncate">{item.rest_name}</td>
    <td className="px-6 py-4 truncate">{item.rest_menu}</td>
    <td className="px-6 py-4 truncate">{item.category_name}</td>
    <td className="px-6 py-4 truncate">{item.rest_open}</td>
    <td className="px-6 py-4 truncate">{item.rest_close}</td>
    <td className="px-6 py-4 truncate">{item.rest_connect}</td>
    <td className="px-6 py-4 truncate">{item.rest_website}</td>
    <td className="px-6 py-4 truncate max-w-xs">{item.rest_location}</td>
    <td className="px-6 py-4 truncate max-w-xs">{item.rest_address}</td>
    <td className="px-6 py-4 truncate max-w-xs">{item.rest_description}</td>
    <td className="px-6 py-4 truncate">{getDay(item.created_time)}</td>
    <td className="px-6 py-4 truncate">{item.mg_code}</td>
  </tr>
);

const ManageRestaurant = () => {
  const { userAuth: { user_id } } = useContext(UserContext);
  const [restaurants, setRestaurants] = useState([]);



  const loadData = async () => {
    try {
      const res = await GetRestaurantAllByIdUser(user_id);
      setRestaurants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  useEffect(() => {
    if (user_id) {
     loadData();
    }
  }, [user_id]);

// console.log(restaurants)
  const handleRemove = async (id) => {
    Swal.fire({
      title: "ທ່ານຕ້ອງການຈະລົບຂໍ້ມູນແທ້ຫວາ",
      text: "ທ່ານຈະບໍ່ສາມາດຍົກເລີກການນຳເນີນງານນີ້ໄດ້!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ໂດຍ, ລືບຂໍ້ມູນ!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Remove(id);
          loadData();
          toast.success("ຂໍ້ມູນຖືກລືບສຳເລັດແລ້ວ");
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const headers = [
    "No", "Action", "Rating","Pictures", "Name-Manager", "Name", "Menu", "Category",
    "Open", "Close", "Connect", "Website", "Location", "Address", "Description",
    "Time-post", "Code"
  ];

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div className="py-4 px-[5vw] md:px-[7vw] " >

          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <span className="flex justify-center items-center text-center py-4 md:text-2xl text-xl font-semibold">
              ຕາຕະລາງຂໍ້ມູນຮ້ານອາຫານ
            </span>
            <Link to="/restaurantdata" className="btn-dark ml-3">ອັບໂຫລດຂໍ້ມູນ</Link>
            <table className="text-sm text-left rtl:text-right text-gray-500 mt-8">
              <TableHeader headers={headers} />
              <tbody>
                {restaurants.length > 0 &&
                  restaurants.map((item, index) => (
                    <TableRow
                      key={item.rest_id}
                      item={item}
                      index={index}
                      handleRemove={handleRemove}
                    />
                  ))}
              </tbody>
            </table>
          </div>

        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
};

export default ManageRestaurant;
