import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { ReadById, Update } from "../function/manager.Api";
import { Link } from "react-router-dom";
import { theme } from "../itemsMui/thomeMui";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/loader.component";

const Edit_Entrepreneur = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [isData, setData] = useState({
      
        mg_id: "",
        mg_code: "",
        mg_name: "",
        mg_email: "",
        mg_phone: "",
        mg_province: "",
        mg_village: "",
        mg_city: "",
        mg_surname: "",
        mg_birthday:"",
  
    })

    const handleChange = (e) => {
        setData({ ...isData, [e.target.name]: e.target.value });
    };

    const formatDate = (dateString) => {
      if (!dateString || !dateString.trim()) {
          return ''; // Return empty string for invalid dates
        }
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };


    const [getData, setgetData] = useState([]);

    useEffect(() => {
        loadData(params.id);
    }, []);

    const loadData = async () => {
        try {
            const manager = await ReadById(params.id);
            setData(manager.data[0]);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    const handleUpate = async (e) => {
        e.preventDefault();

        try {
            const res = await Update(params.id, isData);
            console.log(res.data);
            toast.success("ລົງທະບຽນສຳເລັດແລ້ວ");
            navigate("/manager");
        } catch (err) {
            console.log(err);
            toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Toaster />
            <AnimationWrapper>
                <div className=" py-4 px-[5vw] md:px-[7vw] lg:px-[10vw]">
                <form action="" onSubmit={handleUpate}>
                 

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm md:text-xl font-medium text-gray-700">ຊື່</label>
                <input
                  type="text"
                  name="mg_name"
                  className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Emma"
                  required
                  defaultValue={isData.mg_name || ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label className="block text-sm md:text-xl font-medium text-gray-700">ນາມສະກຸນ</label>
                <input
                  type="text"
                  name="mg_surname"
                  className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Roberts"
                  required
                  defaultValue={isData.mg_surname || ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block text-sm md:text-xl font-medium text-gray-700">ວັນເດືອນປີເກີດ</label>
                <input

                  type="date"
                  name="mg_birthday"
                  className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="ໂພນພະເພົາ"
                  value={formatDate(isData.mg_birthday)}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label className="block text-sm md:text-xl font-medium text-gray-700">ບ້ານ</label>
                <input
                  type="text"
                  name="mg_village"
                  className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="ໂພນພະເພົາ"
                  defaultValue={isData.mg_village || ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label className="block text-sm md:text-xl font-medium text-gray-700">ເມືອງ</label>
                <input
                  type="text"
                  name="mg_city"
                  className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="ໄຊເສດຖາ"
                  defaultValue={isData.mg_city || ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label className="block text-sm md:text-xl font-medium text-gray-700">ແຂວງ</label>
                <input
                  type="text"
                  name="mg_province"
                  className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="ນະຄອນຫຼວງວຽງຈັນ"
                  defaultValue={isData.mg_province || ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label className="block text-sm md:text-xl font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="mg_email"
                  className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Roberts@gmail.com"
                  required
                  defaultValue={isData.mg_email || ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label className="block text-sm md:text-xl font-medium text-gray-700">ເລກໂທລະສັບ</label>
                <input
                  type="tel"
                  name="mg_phone"
                  className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="+123 0123 456 789"
                  required
                  defaultValue={isData.mg_phone || ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              </div>

<div className="mt-6">
  
  <button
    type="submit"
    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm md:text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    ລົງທະບຽນ
  </button>

  <button
   type="reset"
    className="w-full inline-flex mt-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm md:text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    ຍົກເລີກ
  </button>
  </div>


</form>
                </div>
                
            </AnimationWrapper>
        </ThemeProvider>
    );
};

export default Edit_Entrepreneur;
