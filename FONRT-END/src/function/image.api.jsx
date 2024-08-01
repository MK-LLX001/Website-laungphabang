import axios from "axios";

export const Reloadimg = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/images");
  };
//   export const ReloadimgByid = async (name) =>
//   axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/images/${name}`);

  export const Insertimg = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/images/", data);

  export const Removeimg = async (id) =>
  axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/images/${id}`);
  
export const Readimg = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/images/${id}`);
  };
export const Updateimg = async (id,data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/images/${id}`,data);
  };

  export const GetimgByIdUser = async (user_id) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/imgbyUserId`, { user_id });
  };
  export const GetHotelAndRestauByUserId = async (user_id) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/GetH_R`, { user_id });
  };

  export const GetAllItems = async()=> {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/GetAllItems`);
  }
  export const LoadImg= async()=> {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/images`);
  }

  