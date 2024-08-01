import axios from "axios";

// export const uploadImage = async (img) => {
//     let imgUrl  = null;
// //    await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "get-upload-url")
// await axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/get-upload-url")
//     .then( async ( {data: { uploadURL}}) =>{
//         axios({
//             method: 'put',
//             url: uploadURL,
//             headers:{ 'Conten-Type':'multipart/form-data'},
//             data: img

//         })
//         .then(() =>{
//             // console.log(uploadURL)
//             imgUrl = uploadURL.split("?")[0]
//         })
//     })

// }

export const uploadImage = async (img) => {
    try {
        const response = await axios.post("http://localhost:4000/api/get-upload-url");
        console.log(import.meta.env.VITE_SERVER_DOMAIN);
        const uploadURL = response.data.uploadURL;

        const putResponse = await axios.put(uploadURL, img, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return putResponse.data; // คืนค่าจากการ put image
    } catch (error) {
        // console.error("Error uploading image:", error);
        throw new Error("Error uploading image");
    }
};
