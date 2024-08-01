import axios from "axios";

export const loadActivity = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/activity");
  };

  export const Insert = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/activity/", data);

  export const Remove = async (id) =>
  axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/activity/${id}`);
  
export const ReadById = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/activity/${id}`);
  };
export const Update = async (id,data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/activity/${id}`,data);
  };
