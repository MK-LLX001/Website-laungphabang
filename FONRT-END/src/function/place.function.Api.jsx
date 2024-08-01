import axios from "axios";

export const Reloadpl = async () => {
  return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/placeIN");
};

export const Reload_placeWithAvg_Score = async () => {
  return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/placeWithAvg_Score");
};

export const loadPlace = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/place");
  };

export const Reports = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/Reports");
  };
  export const Insert = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/place/", data);

  export const Remove = async (id) =>
  axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/place/${id}`);
  
export const ReadById = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/place/${id}`);
  };
export const Update = async (id,data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/place/${id}`,data);
  };


  export const GetplaceAvg_Score5_4 = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/placeAvg_ScoreFive_four");
  };

  export const getdatdata_allpales = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/getdatdata_allpales");
  };


