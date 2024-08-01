import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import AnimationWrapper from "../common/page-animation";
import { ReloadMg, Insert,Remove } from "../function/manager.Api";
import { Link, useNavigate } from "react-router-dom";
import { theme } from "../itemsMui/thomeMui";
import { UserContext } from "../App";

function RegistorEntrepreneur() {

  const {userAuth: { state , user_name }} =useContext(UserContext)
  // Initialize state for form with category_name as an empty string

console.log(state)

  const [isData, setData] = useState({});

  // TODO: function setImageData
  const handleChange = (e) => {
    setData({ ...isData, [e.target.name]: e.target.value });
    // console.log(isData)
  };

  const [getData, setgetData] = useState([]);
const Nvigator = useNavigate();

  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    ReloadMg()
      .then((res) => {
        console.log(res.data); // Add this line to see what res.data contains
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    
      
      e.preventDefault();

    const isDataExists = getData.some(
        (item) => item.mg_name === isData.mg_name
    );
    // If data already exists, show a warning message
    if (isDataExists) {
        toast.error("ຂໍອະໄພຊື່ນີ້ມີຢູ່ໃນລະບົບແລ້ວ");
        return;
    } 
    // console.log(isData)
    
    Insert(isData)
    .then((res) => {
      // console.log(res.data);
      loadData();
      toast.success("ລົງທະບຽນສຳເລັດແລ້ວ");
      if(state === "user"){
       return Nvigator("/risgetor-manager-done");
      }else if(state === "admin"){
        return Nvigator("/admin/datas-managers");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
    });

   
};

const handleRemove = async (id) => {
  // แสดงกล่องข้อความยืนยันโดยใช้ toast
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

const cleanText = () => {
  setData({});
};


  return (
    // Render components within ThemeProvider
    <ThemeProvider theme={theme}>
      {/* Render Toaster component for displaying notifications */}
      <Toaster />
      {/* Render AnimationWrapper component */}
      <AnimationWrapper>
         <section>

  

    <form action="" onSubmit={handleSubmit} className="h-cover mt-10">

    <p className="font-semibold text-2xl w-full flex justify-center items-center"> ລົງທະບຽນຜູ້ປະກອບການ </p>
    
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
<div>
  <label className="block text-sm md:text-xl font-medium text-gray-700">ຊື່</label>
  <input
    type="text"
    name="mg_name"
    className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    placeholder="Emma"
    required
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
    onClick={cleanText}
  className="flex mt-4 justify-center items-center gap-2 p-2 w-full bg-gradient-to-t from-red to-red/75 rounded-lg text-xl text-white font-bold hover:opacity-80"
>
  Clear
</button>

  </div>


</form>

{/* <div>
<div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
  <span className="flex justify-center font-bold text-center py-4 md:text-3xl text-xl">ຕາຕະລາງຂໍ້ມູນໂຮງແຮມ</span>
  <Link to="/hotelsdata" className="btn-dark ml-3">ອັບໂຫລດຂໍ້ມູນ</Link>
  <table className="text-sm text-left rtl:text-right text-gray-500 mt-8">
   
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        {["No", "Action", "code", "Name", "Surname", "Village", "City", "Province", "Birthday", "Phone", "Email"].map(header => (
          <th key={header} scope="col" className="px-6 py-3 truncate">{header}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {Array.isArray(isData) && isData.length > 0 && isData.map((item, index) => (
        <tr key={item.mg_id} className="bg-white border-b hover:bg-gray-300">
          <td className="px-6 py-4">{index + 1}</td>
          <td className="px-6 py-4">
            <Link to={`/risgetor-manager-edit/${item.mg_id}`} className="p-3 font-medium text-blue-600 hover:underline">
              <i className="fi fi-ss-edit text-2xl"></i>
            </Link>
            <Link to="#" onClick={() => handleRemove(item.mg_id)} className="p-3 font-medium text-blue-600 hover:underline">
              <i className="fi fi-sr-delete text-2xl text-red"></i>
            </Link>
          </td>
         
          <td className="px-6 py-4 truncate">{item.mg_code}</td>
          <td className="px-6 py-4 truncate">{item.mg_name}</td>
          <td className="px-6 py-4 truncate">{item.mg_surname}</td>
          <td className="px-6 py-4 truncate">{item.mg_village}</td>
          <td className="px-6 py-4 truncate">{item.mg_city}</td>
          <td className="px-6 py-4 truncate">{item.mg_province}</td>
          <td className="px-6 py-4 truncate">{item.mg_birthday}</td>
          <td className="px-6 py-4 truncate">{item.mg_phone}</td>
          <td className="px-6 py-4 truncate">{item.mg_email}</td>
         
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div> */}
         </section>

      </AnimationWrapper>
    </ThemeProvider>
  );
}

export default RegistorEntrepreneur;
