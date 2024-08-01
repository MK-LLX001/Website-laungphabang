const getusers = "select * from tb_users";
const getusersByid = "SELECT * FROM tb_users WHERE user_id =$1";
const postusers =  `INSERT INTO tb_users (user_name, user_lastname, user_email, user_password, user_profile_img, state)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING user_id, user_name, user_lastname, user_email, state, user_profile_img`;
const queryWithGoogle = 'INSERT INTO tb_users (user_name, user_lastname, user_email, user_profile_img,state) VALUES ($1, $2, $3, $4,$5)';

const checkemailuser = "SELECT * FROM tb_users WHERE user_email = $1";
const checkIdUser =
  "SELECT user_id, user_name FROM tb_users WHERE user_id = $1";
// img
const putimg = `INSERT INTO tb_image ( image) VALUES($1)`;
const sqlgetimg = "select * from tb_image";
const changeUserPassword =
  "UPDATE tb_users SET user_password = $1 WHERE user_id = $2"; // Ensure the column name is correct
const changeProfileImage =
  "UPDATE tb_users SET user_profile_img = $1 WHERE user_id = $2"; // Ensure the column name is correct

const updateUser =
  "UPDATE tb_users SET user_name = $1, user_lastname = $2, user_email = $3 WHERE user_id = $4 "; // Ensure the column name is correct

const RemoveUser = "DELETE FROM tb_users WHERE user_id = $1"; // Ensure the column name is correct

module.exports = {
  getusers,
  postusers,
  checkemailuser,
  checkIdUser,
  putimg,
  sqlgetimg,
  getusersByid,
  changeUserPassword,
  changeProfileImage,
  updateUser,
  RemoveUser,
  queryWithGoogle,
};
