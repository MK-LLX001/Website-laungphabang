import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_DOMAIN + "/employees/";

export const ReloadEm = async () => {
    return await axios.get(BASE_URL);
};

export const ReadById = async (id) => {
    return await axios.get(`${BASE_URL}${id}`);
};

// export const ReadByName = async (id) => {
//   return await axios.get(`${BASE_URL}/${id}`);
// };

export const Insert = async (data) => {
    return await axios.post(BASE_URL, data);
};

export const Update = async (id, data) => {
    return await axios.put(`${BASE_URL}${id}`, data);
};

export const Remove = async (id) => {
    return await axios.delete(`${BASE_URL}${id}`);
};
