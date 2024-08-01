import axios from "axios";


export const ReloadMg = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/manager");
  };

  export const ReadById = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/manager/${id}`);
  };
  // export const ReadByName = async (id) => {
  //   return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/manager/${id}`);
  // };

export const Insert = async (data) =>
await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/manager/",data);

export const Update = async (id,data) => {
  return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/manager/${id}`,data);
};
export const Remove = async (id) =>
axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/manager/${id}`);

export const RegisterNotification = async (id) => {
  return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/notificatioon/${id}`);
};