const GetData = "  select * from gethotelsceswithavg_score ORDER BY  ht_id DESC";
const GetDatatrending = " ";
const PostData = `INSERT INTO tb_hotels 
  (mg_id, category_id, ht_name, ht_price, ht_open, ht_close, ht_address, ht_location, ht_website, ht_connection,ht_convenience, ht_description,user_id, img_image) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13,$14)`;

const UpdateData = ` UPDATE tb_hotels
SET mg_id = $1, category_id = $2, ht_name = $3, ht_price = $4, ht_open = $5,
    ht_close = $6, ht_address = $7,ht_location = $8,ht_website = $9 , ht_connection = $10, ht_convenience = $11 , ht_description = $12, img_image = $13
WHERE ht_id = $14
`;



const RemoveData = "DELETE FROM tb_hotels WHERE ht_id = $1";

const ReadData_ById = `
select * from gethotelsceswithavg_score WHERE ht_id=$1 `;

const GetHotelsByUserId_Qry = `
 select * from gethotelsceswithavg_score WHERE user_id= $1 ORDER BY ht_id DESC`;




const Checkname = "SELECT * FROM tb_hotels s WHERE s.up_name = $1";

  const getHotelWithAvg_Score = "select * from getHotelscesWithAvg_Score";


const CheckIdIntb_Avg_rating = "SELECT avd_id FROM tb_avg_rating WHERE ht_id = $1"

const RemoveIdIntb_Avg_rating = "DELETE FROM tb_avg_rating WHERE avd_id = $1"

const CheckIdIntb_detail_rating = "SELECT detail_id FROM tb_detail_rating WHERE ht_id = $1"

const RemoveIdIntb_detail_rating = "DELETE FROM tb_detail_rating WHERE detail_id = $1"

module.exports = {
  GetData,
  PostData,
  UpdateData,
  RemoveData,
  ReadData_ById,
  Checkname,
  GetDatatrending,
  getHotelWithAvg_Score,
  CheckIdIntb_Avg_rating,
  RemoveIdIntb_Avg_rating,
  CheckIdIntb_detail_rating,
  RemoveIdIntb_detail_rating,
  GetHotelsByUserId_Qry,
};
