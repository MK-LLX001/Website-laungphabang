import axios from "axios";

// TODO: Api category 
export const Reload = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/categories");
  };

export const Insert = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/categories", data);

export const Remove = async (id) =>
  axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/categories/${id}`);
  
export const Read = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/categories/${id}`);
  };
export const Update = async (id,data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/categories/${id}`,data);
  };
  
  // TODO: This is Api images IMG

 

 