import imgcontact from '../imgs/contact/img-contact.jpg';
import { Insert, LoadContact } from "../function/contactUa-Api";
import React, { useEffect, useState } from "react";

const PageContactUs = () => {
  const [isData, setData] = useState([]);

  const FetchData = async () => {
    try {
      const res = await LoadContact();
      console.log(res.data); // Log the data to see what it contains
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <section>
      <div className="imgs">
        <img src={imgcontact} className="aspect-auto rounded-md" alt="Contact" />
      </div>
      <hr className="mt-7 h-4 w-full" />

      <div>
        <h3>ຕິດຕໍ່ພົວພັນ</h3>
        <hr />
      </div>

      {isData.length > 0 && (
        isData.map((item) => (
          <div key={item.contact_id} className='flex flex-col md:flex-row  '>
            <div className="infos mt-16 items-center p-3 ">
              <p className='text-2xl'>{item.contact_name}</p>
              <hr className='w-1/2 my-4'/>
              <p className='text-2xl'>{item.contact_phone}</p>
          
            </div>
            <div className="container-map w-full md:w-1/2">
              <div className="titlemap flex p-4 justify-center items-center font-bold text-2xl">
                <h1>ແຜນທີ່ນຳທາງ Google map</h1>
              </div>
              <div className="ClassMap relative flex-col justify-center items-center p-1 bg-white border sm:h-[450px] h-[280px] border-gray-200 rounded-lg shadow">
                <iframe
                  src={item.contact_address || ""}
                  className="w-full mx-auto h-full"
                  width="1200"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Responsive googlemap"
                ></iframe>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default PageContactUs;
