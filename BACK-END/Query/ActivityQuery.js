const GetData = `select * from getactivitieswithavg_score  ORDER BY ac_id DESC`;
const GetDatatrending = " select * from ";
const PostData = `INSERT INTO tb_activitys (ac_name, category_id, pl_id, ac_opendate, ac_closedate, ac_address, ac_price, ac_description, ac_image)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;


const UpdateData = `UPDATE tb_activitys
SET ac_name = $1,
    category_id = $2,
    pl_id = $3,
    ac_opendate = $4,
    ac_closedate = $5,
    ac_address = $6,
    ac_price = $7,
    ac_description = $8,
    ac_image = $9
WHERE ac_id = $10`;


const RemoveData = "DELETE FROM tb_activitys WHERE ac_id = $1";

const ReadData_ById = `select * from tb_activitys WHERE ac_id = $1`;

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
};
