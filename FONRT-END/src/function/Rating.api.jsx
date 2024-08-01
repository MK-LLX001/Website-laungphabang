import axios from "axios";

// TODO: Api category 
export const ReloadRating = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/rating");
  };
export const ReloadDetailRating = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/detail_rating");
  };

export const Rlod_detail_rating_places = async (id) =>
  axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/detail_rating/${id}`);

export const Rlod_detail_rating_hotels = async (id) =>
  axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/detail_rating_hotels/${id}`);

export const Rlod_detail_rating_activitys = async (id) =>
  axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/detail_rating_activitys/${id}`);

export const Rlod_detail_rating_restaurants = async (id) =>
  axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/detail_rating_restaurants/${id}`);

// todo Avg_rating  starts 

export const  LoadAvg_rating= async (id) =>
  axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/avg_rating_place/${id}`);

export const   LoadAvg_ratingHotels= async (id) =>
  axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/avg_rating_hotels/${id}`);

export const   LoadAvg_ratingActivitys= async (id) =>
  axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/avg_rating_activitys/${id}`);

export const   LoadAvg_ratingRestaurants= async (id) =>
  axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/avg_rating_Restaurants/${id}`);

// todo Avg_rating  ends

export const Insert = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/detail_rating",data);

export const Inserthotels = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/detail_rating_hotels",data);

export const Insertactivitys = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/detail_rating_activitys",data);

export const InsertRestaurants = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/detail_rating_restaurants",data);

export const Remove = async (id) => {
  return axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/detail_rating/${id}`);
};
  
export const Read = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/detail_rating/${id}`);
  };


  export const GetRatingById = async (user_id) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/GetRatingById`, { user_id });
  };
  export const GetRatingHotelsById = async (user_id) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/GetRatingHotelsById`, { user_id });
  };

  export const  GetRatingRestaurantsById = async (user_id) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/GetRatingRestaurantsById`, { user_id });
  };

  
 export const GetRatingActivityById = async (datas) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/GetRatingActivityById`, datas);
  };
  

export const Update = async (id,data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/detail_rating/${id}`,data);
  };
  
  // TODO: This is Api images IMG

 

 