const getrating = "select * from tb_rating";

const getdeail_rating = "select * from detail_rating";


const readratingById = "SELECT * FROM tb_detail_rating WHERE rat_id = $1";
const readratingByIdPlaces = "SELECT * FROM detail_rating WHERE pl_id = $1";
const readratingByIdHotels = "SELECT * FROM detail_rating WHERE ht_id = $1";
const readratingByIdActivitys = "SELECT * FROM detail_rating WHERE ac_id = $1";
const readratingByIdRestaurants = "SELECT * FROM detail_rating WHERE rest_id = $1";

const readAvg_ratingByid_place = "SELECT * FROM tb_avg_rating WHERE pl_id = $1 ORDER BY time DESC LIMIT 1";
const readAvg_ratingByid_hotel = "SELECT * FROM tb_avg_rating WHERE ht_id = $1 ORDER BY time DESC LIMIT 1";
const readAvg_ratingByid_Activitys = "SELECT * FROM tb_avg_rating WHERE ac_id = $1 ORDER BY time DESC LIMIT 1";
const readAvg_ratingByid_Restaurants = "SELECT * FROM tb_avg_rating WHERE rest_id = $1 ORDER BY time DESC LIMIT 1";

const removerating = "DELETE FROM tb_detail_rating WHERE rat_id = $1";
const checknamecate = "SELECT * FROM tb_detail_rating s WHERE s.scors = $1";

const insertplace = "INSERT INTO tb_detail_rating (pl_id,user_id,score,commented) VALUES ($1,$2,$3,$4)";
const insertactivity = "INSERT INTO tb_detail_rating (ac_id,user_id,score,commented) VALUES ($1,$2,$3,$4)";
const inserthotels = "INSERT INTO tb_detail_rating (ht_id,user_id,score,commented) VALUES ($1,$2,$3,$4)";
const insertrestaurant = "INSERT INTO tb_detail_rating (rest_id,user_id,score,commented) VALUES ($1,$2,$3,$4)";

const updaterating ="UPDATE tb_detail_rating SET score = $1 WHERE rat_id = $2";

const insertcomentplace = "INSERT INTO tb_comments (pl_id,user_id,commented) VALUES ($1,$2,$3)";
const insertcomentactivity = "INSERT INTO tb_comments (ac_id,user_id,commented) VALUES ($1,$2,$3)";

const removeRating = "DELETE FROM tb_detail_rating WHERE detail_id = $1";

const GetRatingByUserId = "SELECT * FROM detail_rating WHERE user_id = $1 AND pl_id IS NOT NULL ";
const getRatingHotelsById = "SELECT * FROM detail_rating WHERE user_id = $1 AND ht_id IS NOT NULL ";
const getRatingRestauransById = "SELECT * FROM detail_rating WHERE user_id = $1 AND rest_id IS NOT NULL ";
const getRatingActivityById = "SELECT * FROM detail_rating WHERE user_id = $1 AND ac_id IS NOT NULL ";

module.exports = {
  getrating,
  getdeail_rating,

  insertplace,
  insertactivity,
  inserthotels,
  insertrestaurant,
  
  updaterating,
  removerating,
  readratingById,
  checknamecate,

  readratingByIdPlaces,
  readratingByIdHotels,
  readratingByIdActivitys,
  readratingByIdRestaurants,

  readAvg_ratingByid_place,
  readAvg_ratingByid_hotel,
  readAvg_ratingByid_Activitys,
  readAvg_ratingByid_Restaurants,

  insertcomentplace,

  removeRating,
  GetRatingByUserId,
  getRatingHotelsById,
  getRatingRestauransById,
  getRatingActivityById,
};
