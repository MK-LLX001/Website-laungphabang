import axios from "axios";

export const loadHotel = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/hotel");
  };
  export const Insert = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/hotel/", data);

  export const Remove = async (id) =>
  axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/hotel/${id}`);
  
export const ReadById = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/hotel/${id}`);
  };

export const Update = async (id,data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/hotel/${id}`,data);
  };


  export const Reload_hotelWithAvg_Score = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/hotelwithavg_score`);
  }; 


  export const GetHotelsByUserId = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/hotelsbyUserId/${id}`);
  };

  
  export const GetHotelsAllByIdUser = async (user_id) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/gethotelallbyUserId`, { user_id });
  };
