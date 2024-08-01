import axios from "axios";

export const Reload = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/Uploading");
  };

export const ReadDefault = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/Uploading-default");
  };



export const Reloadtrending = async () => {
    return await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/Uploadtrending");
  };
  export const Insert = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/Uploading/", data);

  export const Remove = async (id) =>
  axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/Uploading/${id}`);
  
export const ReadById = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/Uploading/${id}`);
  };

export const ReadByIdToUpdate = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/Uploading-Update/${id}`);
  };

export const ReadByIdUserUpload = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/UploadingUser/${id}`);
};


export const Update = async (id,data) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/Uploading/${id}`,data);
  };

  export const InsertLike = async (data) =>
  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/like/", data);


  export const NotificationApi = async (id) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/notificatioon/${id}`);
  };

  export const GetUploadByIdUser = async (user_id) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/UploadingUser`, { user_id });
};


export const UpdateState = async (id, status) => {
  return await axios.put(`${import.meta.env.VITE_SERVER_DOMAIN}/upload/${id}/state`, { status });
};
