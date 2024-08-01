const Employee = require("../Query/employessQry");
const pool = require("../config/config_db");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

//  TODO: function save images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "Employees-" + uniqueSuffix + path.extname(file.originalname));
  },
});

exports.uploadfile = multer({ storage: storage }).single("img_image");

// Function to handle common error scenarios and send appropriate responses
const handleError = (res, error, message = "An error occurred") => {
  console.error(error);
  res.status(500).json({ error: message });
};

// Read all employees
exports.Read = async (req, res) => {
  try {
    const results = await pool.query(Employee.Get);
    res.json(results.rows);
  } catch (error) {
    handleError(res, error, "get employees error");
  }
};

// Read employee by ID
exports.ReadById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Employee.GetByid, [id]);
    if (!results.rows.length) {
      return res.status(404).json({ error: "Employee with that ID not found" });
    }
    res.json(results.rows);
  } catch (error) {
    handleError(res, error, "read employee data error");
  }
};

// Insert new employee
exports.Insert = async (req, res) => {
  try {
    const {
      em_name,
      em_lastname,
      em_birthday,
      em_village,
      em_district,
      em_province,
      em_email,
      em_phone,
      em_belong,
      em_skill,
    } = req.body;
    console.log(req.body);
    const image = req.file ? req.file.filename : "";
    console.log(req.file);
    if (image === "") {
      return res.status(400).json({ error: "Image is required" });
    }

    await pool.query(Employee.Insert, [
      em_name,
      em_lastname,
      em_birthday,
      em_village,
      em_district,
      em_province,
      em_email,
      em_phone,
      em_belong,
      em_skill,
      image,
    ]);

    return res.status(201).json({ message: "Insert successful" });
  } catch (error) {
    handleError(res, error, "Internal server error");
  }
};

// Update employee by ID
exports.Update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      name,
      lastname,
      birthday,
      village,
      district,
      province,
      email,
      phone,
      belong,
      skill,
      fileold,
    } = req.body;

    // Additional debugging logs
    console.log("Received data:", {
      name,
      lastname,
      birthday,
      village,
      district,
      province,
      email,
      phone,
      belong,
      skill,
      fileold,
      id,
    });

    if (!Employee.Update) {
      throw new Error("Employee.Update query is not defined");
    }

    const updateEmployees = async (image, id, res) => {
      try {
        // console.log("Executing query with values:", [
        //   name,
        //   lastname,
        //   birthday,
        //   village,
        //   district,
        //   province,
        //   email,
        //   phone,
        //   belong,
        //   skill,
        //   image,
        //   id,
        // ]);
      

        await pool.query(Employee.Update, [
          name,
          lastname,
          birthday,
          village,
          district,
          province,
          email,
          phone,
          belong,
          skill,
          image,
          id,
        ]);

        return res.status(200).json({ message: "Update successful" });
      } catch (error) {
        console.error("Update error:", error);
        return handleError(res, error, "Update error:");
      }
    };

    if (req.file) {
      const newImage = req.file.filename;
      const oldImage = fileold;

      if (oldImage && oldImage !== 'undefined') {
        const filePath = path.join(__dirname, "../Images-uploads", oldImage);

        fs.unlink(filePath, async (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
            // Even if the old image deletion fails, we still proceed with the update
          }
          await updateEmployees(newImage, id, res);
        });
      } else {
        await updateEmployees(newImage, id, res);
      }
    } else {
      const imageToUpdate = fileold && fileold !== 'undefined' ? fileold : 'note image';
      await updateEmployees(imageToUpdate, id, res);
    }
  } catch (error) {
    console.error("Caught error:", error);
    return handleError(res, error, "Update error:");
  }
};

// Remove employee by ID
exports.Remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
console.log(id);
    // Check if the employee exists
    const existsQuery = await pool.query(Employee.GetByid, [id]);
    if (!existsQuery.rows.length) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const filename = existsQuery.rows[0].image;
    const filePath = path.join(__dirname, "../Images-uploads", filename);

    // Check if the file exists
    let fileExists = false;
    try {
      await fs.promises.stat(filePath);
      fileExists = true;
    } catch (err) {
      // File does not exist, proceed with employee removal from the database
    }

    // Remove the employee from the database
    const removeQuery = await pool.query(Employee.Remove, [id]);
    if (!removeQuery.rowCount) {
      return res
        .status(500)
        .json({ error: "Failed to remove employee from the database" });
    }

    if (fileExists) {
      // Remove the file from the file system
      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        console.error(`Error deleting file: ${err.message}`);
        return res.status(500).json({ error: "Failed to remove image file" });
      }
    }

    // Send success response
    return res.status(200).json({ message: "Employee removed successfully" });
  } catch (error) {
    return handleError(
      res,
      error,
      "An error occurred while removing the employee"
    );
  }
};
