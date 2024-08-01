const Get = "SELECT * FROM tb_employees";
const GetByid = "SELECT * FROM tb_employees WHERE em_id = $1";
const GetByName = "SELECT * FROM tb_employees WHERE em_name = $1";
const Remove = "DELETE FROM tb_employees WHERE em_id = $1";
const Insert = `
  INSERT INTO tb_employees (
    em_name, em_lastname, em_birthday, em_village, em_district, em_province, em_email, em_phone, em_belong, em_skill,image
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
  )
`;
const Checkcode = "SELECT * FROM tb_employees WHERE em_email = $1 OR em_phone = $2";
const Update = `
  UPDATE tb_employees SET
    em_name = $1,
    em_lastname = $2,
    em_birthday = $3,
    em_village = $4,
    em_district = $5,
    em_province = $6,
    em_email = $7,
    em_phone = $8,
    em_belong = $9,
    em_skill = $10,
    image = $11
  WHERE em_id = $12
`;

module.exports = {
  Get,
  Insert,
  Update,
  Remove,
  GetByid,
  GetByName,
  Checkcode,
};
