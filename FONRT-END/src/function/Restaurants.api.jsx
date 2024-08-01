import axios from "axios";


export const loadRastaurant = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/restaurant");
  };



  export const Insert = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/restaurant/", data);

  export const Remove = async (id) =>
  axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/restaurant/${id}`);
  
export const ReadById = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/restaurant/${id}`);
  };
export const Update = async (id,data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/restaurant/${id}`,data);
  };



  export const GetPopuraRestaurant = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/getRestaurantWithAvg_score`);
  };

  export const GetRestaurantByUserId = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/restaurantbyUserId/${id}`);
  };

 
  export const GetRestaurantAllByIdUser = async (user_id) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/restaurantallbyUserId`, { user_id });
  };

  export const UpdateState = async (id, value) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/restaurant/${id}/state`, { value });
  };
