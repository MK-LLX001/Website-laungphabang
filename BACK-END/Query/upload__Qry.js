const GetData =
  `SELECT * 
FROM getdata_view_uploads 
WHERE status = 'ຜ່ານ'`;
const GetDataDefault =
  `SELECT * 
FROM getdata_view_uploads 
WHERE status = 'pending'`;

const GetDatatrending =" select * from getdatatrending"
const PostData =
  "INSERT INTO tb_uploads (up_name, up_description, user_id, category_id, img_image) VALUES ($1,$2,$3,$4,$5)";
const UpdateData =
  "UPDATE tb_uploads SET up_name = $1, up_description = $2, user_id = $3, category_id = $4, img_image = $5 WHERE up_id = $6";
  const ReadData_ById_toUpdate = "SELECT * FROM tb_uploads WHERE up_id = $1";

const Check_id = "SELECT * FROM tb_uploads WHERE up_id = $1";

const RemoveDataUpload = "DELETE FROM tb_uploads WHERE up_id = $1";

const ReadData_ById = "SELECT * FROM getdata_view_Uploads WHERE up_id = $1";
const ReadData_ById_User = "SELECT * FROM tb_uploads WHERE user_id = $1 ORDER BY time_created";
const Checkname = "SELECT * FROM tb_uploads s WHERE s.up_name = $1";
const Like =
  "INSERT INTO tb_likes (up_id, user_id, category_id, lk_score) VALUES ($1, $2, $3, $4)";

const countUser_UploadsByid = "SELECT * FROM getdata_view_Uploads WHERE user_id = $1";

const getDataByIduser = "SELECT * FROM getdata_view_Uploads WHERE user_id = $1";


const CheckIdIntb_Likes = "SELECT lk_id FROM tb_likes WHERE up_id = $1"
const RemoveIdIntb_Likes = "DELETE FROM tb_likes WHERE lk_id = $1"

const Notification_Qry ='SELECT * FROM notificationLike WHERE upload_user_id = $1 ORDER BY lk_time DESC';


module.exports = {
  GetData,
  PostData,
  UpdateData,
  RemoveDataUpload,
  ReadData_ById,
  Checkname,
  Check_id,
  Like,
  GetDatatrending,
  ReadData_ById_User,
  countUser_UploadsByid,
  ReadData_ById_toUpdate,
  CheckIdIntb_Likes,
  RemoveIdIntb_Likes,
  Notification_Qry,
  getDataByIduser,
  GetDataDefault,
};
