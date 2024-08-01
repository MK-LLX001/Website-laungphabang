import axios from "axios";

// TODO: Api category 
export const ReloadRating = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/user");
  };

export const GetUser = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/user");
  };

export const signup = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/signup",data);

export const signin = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/signin",data);

// export const signupwhitGoogle = async (credential) =>
//   await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/signupwhitGoogle",credential);



export const Remove = async (id) =>
  axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/detai_rating/${id}`);
  


export const ReadById = async (id) => {
  return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/userByid/${id}`);
};

export const Update = async (id,data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/detai_rating/${id}`,data);
  };

 

  export const UpdatePassword = async (id, data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/change-password/${id}`, data);
  };

  export const UpdateProfileImg = async (user_id, data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/change-profileImg/${user_id}`, data);
  };

  export const UpdateUser = async (user_id, data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/change-user/${user_id}`, data);
  };
  


  
  

    
  export const UpdateUserState = async (userId, state) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/users/${userId}/status`, { state });
  };
  


  export const RemoveUser = async (userId) => {
    return await axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/users/${userId}`);
  };
  
  
  // TODO: This is Api images IMG

 

 