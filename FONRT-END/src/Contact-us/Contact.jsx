import AnimationWrapper from "../common/page-animation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Insert ,LoadContact } from "../function/contactUa-Api";

const ContactUs = () => {
  const [isData, setData] = useState({});

  const handleChange = (e) => {
    setData({ ...isData, [e.target.name]: e.target.value });
    // console.log(isData) 
  };

  const FetchData = async () => {

    LoadContact()
    .then((res) => {
      console.log(res.data); // Add this line to see what res.data contains
      setData(res.data);
    })
    .catch((err) => console.log(err));

  };
//   console.log(isData)

  useEffect(() => {
    window.scroll(0, 0);
    FetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    Insert(isData)
    .then((res) => {
      FetchData();
      toast.success("successful");
    })
    .catch((err) => {
      console.log(err);
      toast.error("An error occurred");
    });
  };

  return (
    <section>
        <Toaster/>
      <AnimationWrapper transition={{ duration: 1, delay:  0.3} }>
        <form action="" onSubmit={handleSubmit} className="h-cover mt-10">

        <h3>  ContactUs </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ຊື່
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Emma"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                ເລກໂທລະສັບ
              </label>
              <input
                type="tel"
                name="phone"
                className="mt-1 block w-full px-3 py-2 md:text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="+123 0123 456 789"
                onChange={(e) => handleChange(e)}
              />
            </div>

           
          </div>

          <div className="w-full">
              <label className="block text-sm md:text-xl font-medium text-gray-700">
                Adress
              </label>
              <textarea
               onChange={(e) => handleChange(e)}
               name="adress"
                placeholder="Adress..."
                className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"
              ></textarea>

              
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
      </AnimationWrapper>
    </section>
  );
};

export default ContactUs;
