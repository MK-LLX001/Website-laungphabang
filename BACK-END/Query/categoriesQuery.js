const getcategory = "select * from tb_category";
const readcategoryById = "SELECT * FROM tb_category WHERE category_id = $1";
const removecategory = "DELETE FROM tb_category WHERE category_id = $1";
const checknamecate = "SELECT * FROM tb_category s WHERE s.category_name = $1";
const postcategory = "INSERT INTO tb_category (category_name) VALUES ($1)";
const updatecategory =
  "UPDATE tb_category SET category_name = $1 WHERE category_id = $2";

module.exports = {
  getcategory,
  postcategory,
  updatecategory,
  removecategory,
  readcategoryById,
  checknamecate,
};
