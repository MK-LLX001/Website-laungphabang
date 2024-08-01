

const GetData = "select * from getDatarestaurentsWithAvg_score ";
const GetDataWithAvg_score = "select * from getDatarestaurentsWithAvg_score ";

const GetDatatrending = " select * from ";
const PostData = `INSERT INTO tb_restaurants (rest_name,rest_menu, mg_id, category_id, rest_open, rest_close, rest_address,rest_location , rest_website, rest_connect, rest_description,user_id,rest_price, rest_image)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12,$13,$14)`;

const UpdateData = `
  UPDATE tb_restaurants
  SET 
    rest_name = $1,
    rest_menu = $2,
    mg_id = $3,
    category_id = $4,
    rest_open = $5,
    rest_close = $6,
    rest_address = $7,
    rest_location = $8,
    rest_website = $9,
    rest_connect = $10,
    rest_description = $11,
    rest_price = $12,
    rest_image = $13
  WHERE rest_id = $14`;




const RemoveData = "DELETE FROM tb_restaurants WHERE rest_id = $1";

const ReadData_ById = `select * from getDatarestaurentsWithAvg_score WHERE rest_id = $1`;
const GetRestaurantByUserId_Qry = `select * from getDatarestaurentsWithAvg_score WHERE user_id = $1`;


const getRestaurantAllByIdUser = `select * from getDatarestaurentsWithAvg_score WHERE user_id = $1`;

const Checkname = "";
const Like =
  "";

module.exports = {
  GetData,
  PostData,
  UpdateData,
  RemoveData,
  ReadData_ById,
  Checkname,
  Like,
  GetDatatrending,
  GetDataWithAvg_score,
  GetRestaurantByUserId_Qry,
  getRestaurantAllByIdUser,
};
