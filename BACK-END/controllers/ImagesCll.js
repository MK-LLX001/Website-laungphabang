const { error } = require("console");
const images = require("../Query/ImagesQry");
const pool = require("../config/config_db");
const fs = require("fs");
const path = require("path"); // เพิ่มบรรทัดนี้เพื่อนำเข้าโมดูล path
const multer = require('multer');
// TODO: function save image 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, 'images-' + uniqueSuffix + file.originalname)
    }
  })
  
  exports.Images = multer({ storage: storage }).single('img_image')

// Function to handle common error scenarios and send appropriate responses
const handleError = (res, error, message = "An error occurred") => {
  console.error(error);
  res.status(500).json({ error: message });
};

/// Get all hotel items (consider pagination for large datasets)
exports.Read = async (req, res) => {
  try {
    const results = await pool.query(images.GetData);
    res.json(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};

exports.GetAllItems = async (req, res) => {
  try {
    const results = await pool.query(images.getAllItems);
    res.json(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};

exports.GetimgByIdUser = async (req, res) => {
  try {
    console.log("Received body:", req.body); // ตรวจสอบค่าที่ได้รับจากไคลเอนต์
    const { user_id } = req.body;
    console.log("User Images ID:", user_id); // ตรวจสอบค่าของ user_id
    const results = await pool.query(images.getimgByIdUser,[user_id]);
    res.json(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};

exports.GetHotelAndRestauByUserId = async (req, res) => {
  try {
    console.log("Received body:", req.body); // ตรวจสอบค่าที่ได้รับจากไคลเอนต์
    const { user_id } = req.body;
    console.log("User Images ID:", user_id); // ตรวจสอบค่าของ user_id
    const results = await pool.query(images.getHotelAndRestauByUserId,[user_id]);
    res.json(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};


exports.ReadById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(images.ReadData_ById, [id]);
    if (!results.rows.length) {
      return res.status(404).json({ error: "image with that ID not found" });
    }
    res.send(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};

// TODO: insert items  to categories
exports.Insert = async (req, res) => {
  try {
    const { img_name,user_id } = req.body;
    console.log("nammm"+img_name)
    console.log("idddd"+user_id)
   const img_image = req.file.filename; // Get filename from multer
// nsert data into database
    await pool.query(images.postimage, [img_name,user_id, img_image]);

    return res.status(201).send("Insert successful");
  } catch (error) {
    console.log(error);
    handleError(res, error, "Insert error");
  }
};

// TODO: Update categories where id
exports.Update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { img_name } = req.body;
    var newData = req.body;
   
    // Check if a new image file has been uploaded
    if (typeof req.file !== 'undefined') {
      let img_img = req.file.filename;
      let imageOld = newData.fileold;

      // Delete the old image file
      const filePath = path.join(__dirname, "../Images-uploads", imageOld);
     
    //  check results befor update data 
    fs.stat(filePath, async (err, stats) => {
      if (err) { 
        await pool.query(images.updateimage, [img_name, img_img,id,]);
        return res.status(200).json({ message: "Update successful" });
      }
      // File exists, proceed with deletion
      await fs.promises.unlink(filePath);
      // Update the image record in the database
      await pool.query(images.updateimage, [img_name, img_img, id]);
      return res.status(200).json({ message: "Update successful" });
    });
    } else {
      // If no new image file is uploaded, update only the image name
      const img_image = newData.img_image;
      const updateQuery = await pool.query(images.updateimage, [img_name,img_image, id]);
      
      if (updateQuery.rowCount === 0) {
        return res.status(404).json({ error: "Image not found" });
      }

      return res.status(200).json({ message: "Update successful" });
    }
  } catch (error) {
    console.error(error);
    return handleError(res, error, "Update error:");
  }
};



exports.Remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Query to check if the image exists
    const existsQuery = await pool.query(images.ReadData_ById, [id]);

    // Get the image filename from the database (assuming a filename field)
    let filename = existsQuery.rows[0].img_image;

    // Construct the complete file path
    const filePath = path.join(__dirname, "../Images-uploads", filename); // Adjust path if needed

    fs.stat(filePath, async (err, stats)=>{

      if (err) {
        // File does not exist, proceed with deletion
        await pool.query(images.removeimage, [id]);
        return res.status(200).json({ message: "Delete successful" });
      }
          // Attempt file deletion (handle potential errors gracefully)
    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      console.error(`Error deleting file: ${err.message}`);
      return res.status(500).json({ error: "Failed to remove image file" });
    }

    // Remove image record from database
    const removeQuery = await pool.query(images.removeimage, [id]);
    if (!removeQuery.rowCount) {
      return res
        .status(500)
        .json({ error: "Failed to remove image from database" });
    }

    res.status(200).json({ message: "Image removed successfully" }); 

    })

  } catch (error) {
    console.error(error);
    handleError(res, error, "An error occurred while trying to remove:");
  }
};
