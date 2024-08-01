import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { GetHotelsAllByIdUser, Remove } from "../function/hotel.function.api";
import { UserContext } from "../App";
import { getDay } from "../common/date";

const ManageHotel = () => {
  const { userAuth: { user_id } } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);

  const loadData = async () => {
    try {
      const res = await GetHotelsAllByIdUser(user_id);
      setHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 
  useEffect(() => {
    if (user_id) {
     loadData();
    }
  }, [user_id]);

  // console.log(hotels)

  const handleRemove = async (id) => {
    Swal.fire({
      title: 'ທ່ານຕ້ອງການຈະລົບຂໍ້ມູນແທ້ຫວາ',
      text: 'ທ່ານຈະບໍ່ສາມາດຍົກເລີກການນຳເນີນງານນີ້ໄດ້!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ໂດຍ, ລືບຂໍ້ມູນ!'
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

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AnimationWrapper>
        <div className="py-4 px-[5vw] md:px-[7vw]">
          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <span className="flex justify-center font-bold text-center py-4 md:text-3xl text-xl">ຕາຕະລາງຂໍ້ມູນໂຮງແຮມ</span>
            <Link to="/hotelsdata" className="btn-dark ml-3">ອັບໂຫລດຂໍ້ມູນ</Link>
            <table className="text-sm text-left rtl:text-right text-gray-500 mt-8">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {["No", "Action","Rating", "Pictures",  "Manager", "Hotel", "Category", "Price", "Open", "Close", "Connect", "Website", "Location", "Convenience", "Address", "Description", "Time-post", "Code"].map(header => (
                    <th key={header} scope="col" className="px-6 py-3 truncate">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hotels.map((item, index) => (
                  <tr key={item.ht_id} className="bg-white border-b hover:bg-gray-300">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <Link to={`/edithotel/${item.ht_id}`} className="p-3 font-medium text-blue-600 hover:underline">
                        <i className="fi fi-ss-edit text-2xl"></i>
                      </Link>
                      <Link to="#" onClick={() => handleRemove(item.ht_id)} className="p-3 font-medium text-blue-600 hover:underline">
                        <i className="fi fi-sr-delete text-2xl text-red"></i>
                      </Link>
                    </td>
                    <td className="md:px-6 md:py-3 px-2 py-1 font-medium "><i className="fi fi-ss-star text-xl text-yellow-600" ></i> {Number(item.avg_score).toFixed(1)}</td>
                    <td className="px-6 py-4">
                      <img className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20" src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.img_image}`} alt={item.ht_name} />
                    </td>
                   
                    <td className="px-6 py-4 truncate">{item.mg_name}</td>
                    <td className="px-6 py-4 truncate">{item.ht_name}</td>
                    <td className="px-6 py-4 truncate">{item.category_name}</td>
                    <td className="px-6 py-4 truncate">{item.ht_price}</td>
                    <td className="px-6 py-4 truncate">{item.ht_open}</td>
                    <td className="px-6 py-4 truncate">{item.ht_close}</td>
                    <td className="px-6 py-4 truncate">{item.ht_connection}</td>
                    <td className="px-6 py-4 truncate">{item.ht_website}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{item.ht_location}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{item.ht_convenience}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{item.ht_address}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{item.ht_description}</td>
                    <td className="px-6 py-4 truncate">{getDay(item.time_created)}</td>
                    <td className="px-6 py-4 truncate">{item.mg_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimationWrapper>
    </ThemeProvider>
  );
}

export default ManageHotel;
