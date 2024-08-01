

const GetData = "select * from tb_image ORDER BY img_id DESC";

const getAllItems = "SELECT ht_name as Names FROM tb_hotels UNION SELECT rest_name as Names FROM tb_restaurants UNION SELECT pl_name as Names FROM tb_places UNION SELECT ac_name as Names FROM tb_activitys";



const ReadData_ById = "SELECT * FROM tb_image WHERE img_id = $1";

const removeimage = "DELETE FROM tb_image WHERE img_id = $1";
const postimage = "INSERT INTO tb_image (img_name,user_id , img_image) VALUES ($1,$2,$3)";
const checknamecate = "SELECT * FROM tb_image s WHERE s.img_image = $1";
const updateimage =
  "UPDATE tb_image SET img_name = $1, img_image = $2 WHERE img_id = $3";

const getimgByIdUser = "SELECT * FROM tb_image WHERE user_id = $1 ORDER BY img_id DESC LIMIT(8)";
const getHotelAndRestauByUserId = "SELECT ht_name AS names FROM tb_hotels UNION SELECT rest_name AS name FROM tb_restaurants WHERE user_id = $1";

module.exports = {
 GetData,
  postimage,
  updateimage,
  removeimage,
  ReadData_ById,
  getimgByIdUser,
  getHotelAndRestauByUserId,
  getAllItems,
  
};
