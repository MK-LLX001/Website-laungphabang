
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_DOMAIN + "/contact-us/";



export const Insert = async (data) => {
    return await axios.post(BASE_URL, data);
};

export const  LoadContact = async () => {
    return await axios.get(BASE_URL);
};

// export const Getcomments = async (id) => {
//     return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/commentByid`, { id });
//   };


// export const GetReplycomments = async (cm_id) => {
//     return await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/commentReplying`, { cm_id });
//   };