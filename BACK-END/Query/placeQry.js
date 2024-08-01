const GetData =`select * from getplacesWithAvg_Score ORDER BY pl_id DESC`

const GetDataReports ="select * from combined_avg_scores"
const GetDataWhereWatanatham = "select * from getdataplaceswhere WHERE Category_name = '' "

const Readplace =
  "select pl_id,pl_name from tb_places "
const GetDatatrending =" select * from getdatatrending "

const PostData =
  " INSERT INTO tb_places (pl_name, pl_startime, pl_endtime, pl_address, pl_price, category_id, pl_description,pl_warning,sesion,user_id,pl_img_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10,$11)";
const UpdateData =
" UPDATE tb_places SET pl_name = $1, pl_startime = $2, pl_endtime = $3, pl_address = $4, pl_price= $5, category_id = $6,  pl_description = $7, pl_warning = $8, sesion = $9, pl_img_image = $10 WHERE pl_id = $11 ";


const RemoveData = "DELETE FROM tb_places WHERE pl_id = $1";
const ReadData_ById = "SELECT * FROM tb_places WHERE pl_id = $1";
const Checkname = "SELECT * FROM tb_uploads s WHERE s.up_name = $1";
const Like =
  "INSERT INTO tb_likes (up_id, user_id, category_id, lk_score) VALUES ($1, $2, $3, $4)";

const getplacesWithAvg_Score = "select * from getplacesWithAvg_Score";

const getplaceAvg_Score5_4 = "select * from getdataplanceang_5_4";
const Getdatdata_allpales = "select * from getdatdata_allpales";


module.exports = {
  GetData,
  PostData,
  UpdateData,
  Readplace,
  RemoveData,
  ReadData_ById,
  Checkname,
  Like,
  GetDatatrending,
  getplacesWithAvg_Score,
  getplaceAvg_Score5_4,
  GetDataWhereWatanatham,
  Getdatdata_allpales,
  GetDataReports
};
