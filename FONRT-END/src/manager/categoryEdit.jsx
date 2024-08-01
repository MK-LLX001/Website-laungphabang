import React, { useEffect, useState } from "react"; // Import useEffect from react
import { useParams, useNavigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import { Read,Update } from "../function/categoryFunction";
import { theme } from "../itemsMui/thomeMui";

const EditProducts = () => {
  const params = useParams(); // Get the ID parameter from the URL
  // console.log(params.id);
  const navigate = useNavigate()

  const [isdata, setData] = useState({
    category_name: '',
  }); // get values categories from the responsive url databases

  useEffect(() => {
    loadDataCategory(params.id);
  }, []);
  // TODO: reloade Data category
  const loadDataCategory = async (id) => {
    Read(id)
      .then((res) => {
        setData( {...isdata, category_name: res.data[0].category_name});
      })
      .catch((err) => {});
  };
  // console.log(isdata);

    // TODO: get values form defaultValue
    const handleChange = (e) => {
      setData({ ...isdata, [e.target.name]: e.target.value });
    };

    // TODO: post insert data category to databases
    const handleUpate = async (e) => {
      e.preventDefault();
     
      if(!isdata.category_name) {
        toast.error("ກະຮຸນາປ້ອນຂໍ້ມູນກ່ອນ");
        return;
      }
      // console.log(isdata); // TODO: get id values form defaultValue กุเกือบตายย้อนลืมอันนีและ
      Update(params.id, isdata)
        .then((res) => {
          console.log(res.data);
         toast.success("ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ");
          navigate("/admin/Datas-category");
        })
        .catch((err) => {
          console.log(err)
          toast.error("ຂໍອະໄພເກີດຂໍ້ຜີດຜາດ");
        });

    };
    
  
  return (
  <ThemeProvider theme={theme}>
    <AnimationWrapper>
      <Toaster />
      <div className="category py-4 px-[5vw] md:px-[2vw]">
        <div className=" Class-cateory">
          <div className="py-4 px-[5vw] md:px-[2vw]">
            <div className="mx-auto max-w-[900px] w-full h-full">
              <div className="flex w-full flex-col mt-5 font-bold">
                <h2 className=" text-center"> ແກ້ໄຂຂໍ້ມູນປະເພດໝວດໝູ່</h2>
                <form action="" onSubmit={handleUpate}>
                  <div className="flex w-full flex-col mt-4 gap-4 font-bold">
                    {isdata && (
                      <TextField
                        id="filled-multiline-flexible"
                        label="ຂໍ້ມູນໝວດໝູ່"
                        multiline
                        maxRows={7}
                        variant="filled"
                        name="category_name"
                        value={isdata.category_name}
                        onChange={(e) => handleChange(e)}
                      />
                    )}
                  </div>
                  <div className="flex justify-center w-full mt-4">
                    <button
                      type="submit"
                      className="w-full md:w-1/3 text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="w-full md:w-1/3 text-white bg-deep-orange-400 hover:bg-deep-orange-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      Refresh
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  </ThemeProvider>
);
};

export default EditProducts;
