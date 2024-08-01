const Manager = require("../Query/managerQuery");
const pool = require("../config/config_db");

// TODO: getCategory All items
exports.Read = async (req, res) => {
  try {
    const results = await pool.query(Manager.Get);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    return res.json({ error: "getcategory error" });
  }
};
exports.ReadById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const results = await pool.query(Manager.GetByid, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};

// TODO: insert items  to Manager
exports.Insert = async (req, res) => {
  try {
    const {mg_name,mg_surname,mg_birthday,mg_village,mg_city,mg_province,mg_email,mg_phone } = req.body;
console.log(req.body)
   
    // Check if mg_name already exists
    const nameCheckResult = await pool.query(Manager.CheckSurname, [mg_surname]);
    if (nameCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "mg_name already exists" });
    }else{
    // Insert the manager into the database
    await pool.query(Manager.Insert, [mg_name,mg_surname,mg_birthday,mg_village,mg_city,mg_province,mg_email,mg_phone]);
    
    // Send success response
    return res.status(201).json({ message: "Insert successful" });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// TODO: Update Manager where id
exports.Update = async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      // console.log(req.body)
      const { mg_name, mg_surname, mg_birthday, mg_village, mg_city, mg_province, mg_email, mg_phone } = req.body;

      // Check if mg_surname already exists for a different manager
      const surnameCheckResult = await pool.query(Manager.CheckSurname, [mg_surname]);
      if (surnameCheckResult.rows.length > 0) {
          return res.status(400).json({ error: "Surname already exists for another manager" });
      }

      // Update the manager in the database
      await pool.query(Manager.Update, [mg_name, mg_surname, mg_birthday, mg_village, mg_city, mg_province, mg_email, mg_phone, id]);

      // Send success response
      return res.status(200).json({ message: "Update successful" });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Update error: " + error.message });
  }
};

  
// categoryController.js
exports.Remove = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const results = await pool.query(Manager.Remove, [id]);
  
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
  
  
