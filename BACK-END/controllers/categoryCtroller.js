const categories = require("../Query/categoriesQuery");
const pool = require("../config/config_db");

// TODO: getCategory All items
exports.Read = async (req, res) => {
  try {
    const results = await pool.query(categories.getcategory);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    return res.json({ error: "getcategory error" });
  }
};
exports.ReadById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(categories.readcategoryById, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};

// TODO: insert items  to categories
exports.Insert = async (req, res) => {
  try {
    const { category_name } = req.body;
    const results = await pool.query(categories.checknamecate, [category_name]); //
    if (results.rows.length) {
      return res.json("ຂໍ້ມູນມີຢູ່ໃນລະບົບແລ້ວ");
    }
    //   add categories to db
    await pool.query(categories.postcategory, [category_name]);
    return res.status(201).send("insert successful");
  } catch (error) {
    console.log(error);
    return res.json("insert error");
  }
};

// TODO: Update categories where id
exports.Update = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { category_name } = req.body;
  
      // Check if the category exists
      const results = await pool.query(categories.readcategoryById, [id]);
      if (!results.rowCount) {
        return res.status(404).json({ error: "Category does not exist in the database" });
      }
  
      // Update the category
      await pool.query(categories.updatecategory, [category_name, id]);
      
      // Send success response
      return res.status(200).send("Update successful");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Update error: " + error.message });
    }
  };
  
// categoryController.js
exports.Remove = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const results = await pool.query(categories.removecategory, [id]);
  
      // Check if no rows were affected (i.e., category does not exist)
      if (!results.rowCount) {
        return res.status(404).json({ error: "Category does not exist in the database and could not be removed." });
      }
  
      // If rows were affected, category was successfully deleted
      return res.json({ message: 'Delete successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while trying to delete the category." });
    }
  };
  
  
