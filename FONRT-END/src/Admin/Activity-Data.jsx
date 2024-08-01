import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { theme } from "../itemsMui/thomeMui";
import { loadActivity, Remove } from "../function/Activity.function.api";
import { Link } from "react-router-dom";
// ... rest of your code

function ActivityDatas() {
 

  const [isGetData, setGetData] = useState([]);

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
  

  const handleRemove = async (id) => {
    // Display confirmation dialog
    Swal.fire({
      title: 'Are you sure you want to delete this activity?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "Yes" in the confirmation dialog
        // Delete the activity
        Remove(id)
          .then((res) => {
            // Display success message using toast
            toast.success("Activity successfully deleted");
            // Reload activity data
            loadData();
          })
          .catch((err) => {
            // Display error message using toast
            toast.error("Failed to delete activity");
            console.log(err);
          });
      }
    });
  };
  


  return (
    <ThemeProvider theme={theme}>
      <Toaster />

      <AnimationWrapper>
        <div className="mx-auto max-w-[90%] w-full ml-10">
        

          <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className=" text-center py-4">ຕາຕະລາງຂໍ້ມູນສະຖານທີທອງທຽ່ວ</h2>
            <Link to="/acticitydata" className="btn-dark ml-3 my-2">ອັບໂຫລດຂໍ້ມູນ</Link>
            <table className="  text-sm text-left rtl:text-right text-gray-500 mt-6 ">
              <thead className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3 truncate">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                    Pictures
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Place
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Open-Data
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                    Close-Data
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
                    Connection
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 truncate ">
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
                        <td className="px-6 py-4">
                          <Link
                            to={"/editactivity/" + items.ac_id}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-ss-edit text-2xl"></i>
                          </Link>
                          <Link
                            to="#"
                            onClick={() => handleRemove(items.ac_id)}
                            className="p-3 font-medium text-blue-600  hover:underline"
                          >
                            <i className="fi fi-sr-delete text-2xl text-red"></i>
                          </Link>
                        </td>

                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">
                          <img
                            className="w-10 h-10 rounded-full hover:duration-200 hover:w-20 hover:h-20"
                            src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${
                              items.ac_image
                            }`}
                            alt={items.ac_name}
                          />
                        </td>
                        <td className="px-6 py-4 truncate">{items.ac_name}</td>
                        <td className="px-6 py-4 truncate">{items.pl_name}</td>
                        <td className="px-6 py-4 truncate">
                          {items.category_name}
                        </td>

                        <td className="px-6 py-4 truncate">
                          {items.ac_opendate}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.ac_closedate}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.ac_connect}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.ac_address}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {items.ac_description}
                        </td>
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
}

export default  ActivityDatas;
