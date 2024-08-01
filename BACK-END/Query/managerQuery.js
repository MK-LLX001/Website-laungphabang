const Get = "select * from tb_managers";
const GetByid = "SELECT * FROM tb_managers WHERE mg_id = $1";
const GetByName = "SELECT * FROM tb_managers WHERE mg_name = $1";
const CheckSurname = "SELECT * FROM tb_managers WHERE mg_surname = $1";
const Remove = "DELETE FROM tb_managers WHERE mg_id = $1";
const Insert =
  "INSERT INTO tb_managers (mg_name,mg_surname,mg_birthday,mg_village,mg_city,mg_province,mg_email,mg_phone) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";
const Checkcode = "SELECT * FROM tb_managers  s WHERE s.mg_code = $1";
const Update = `
  UPDATE tb_managers 
  SET 
    mg_name = $1, 
    mg_surname = $2, 
    mg_birthday = $3, 
    mg_village = $4, 
    mg_city = $5, 
    mg_province = $6, 
    mg_email = $7, 
    mg_phone = $8 
  WHERE mg_id = $9
`;

module.exports = {
  Get,
  Insert,
  Update,
  Remove,
  GetByid,
  GetByName,
  Checkcode,
  CheckSurname,
};
