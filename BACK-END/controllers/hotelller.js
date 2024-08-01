const Hotel = require("../Query/hotelQry");
const Manager = require("../Query/managerQuery");
const pool = require("../config/config_db");
const fs = require("fs");
const path = require("path"); // เพิ่มบรรทัดนี้เพื่อนำเข้าโมดูล path
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, 'hotel-' + uniqueSuffix + file.originalname)
    }
  })
  
  exports.uploadfile = multer({ storage: storage }).single('img_image')


// Function to handle common error scenarios and send appropriate responses
const handleError = (res, error, message = "An error occurred") => {
  console.error(error);
  res.status(500).json({ error: message });
};

// Get all hotel items (consider pagination for large datasets)
exports.Read = async (req, res) => {
  try {
    const results = await pool.query(Hotel.GetData);
    res.json(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};

exports.ReadById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Hotel.ReadData_ById, [id]);
    if (!results.rows.length) {
      return res.status(404).json({ error: "Hotel with that ID not found" });
    }
    res.send(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};
exports.GetHotelsByUserId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Hotel.GetHotelsByUserId_Qry,[id]);
    if (!results.rows.length) {
      return res.status(404).json({ error: "Hotel with that ID not found" });
    }
    res.send(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};


exports.GetHotelAllByUserId = async (req, res) => {
  try {
    console.log("Received body:", req.body); // ตรวจสอบค่าที่ได้รับจากไคลเอนต์

    const { user_id } = req.body;
    console.log("User Hotels ID:", user_id); // ตรวจสอบค่าของ user_id

    const results = await pool.query(Hotel.GetHotelsByUserId_Qry, [user_id]);
    // console.log(results.rows)
    return res.send(results.rows); // ส่ง results.rows แทน Datacagetory.rows
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" });
  }
};






// Insert a new hotel item
exports.Insert = async (req, res) => {
  try {

    console.log(req.body);
    const {
      mg_code,
      category_id,
      ht_name,
      ht_price,
      ht_open,
      ht_close,
      ht_address,
      ht_location,
      ht_website,
      ht_connection,
      ht_convenience,
      ht_description,
      user_id,
    } = req.body;
   

    // Check if manager code exists
    const managerQuery = await pool.query(Manager.Checkcode, [mg_code]);
    if (!managerQuery.rows.length) {
      return res.status(400).json({ error: "Manager code does not exist" });
    }

    const mg_id = managerQuery.rows[0].mg_id;

    // Extract image filename (assuming using multer for file upload)
    const img_image = req.file ? req.file.filename : "";

    await pool.query(Hotel.PostData, [
      mg_id,
      category_id,
      ht_name,
      ht_price,
      ht_open,
      ht_close,
      ht_address,
      ht_location,
      ht_website,
      ht_connection,
      ht_convenience,
      ht_description,
      user_id,
      img_image,
    ]);

    res.status(201).send("Insert successful");
  } catch (error) {
    handleError(res, error, "Insert error");
  }
};

// TODO: Update Hotel where id
exports.Update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(req.body);
    const {
      mg_code,
      category_id,
      ht_name,
      ht_price,
      ht_open,
      ht_close,
      ht_address,
      ht_location,
      ht_website,
      ht_connection,
      ht_convenience,
      ht_description,
    } = req.body;
    const newData = req.body;

    // TODO: ก่อนทีมืงจะเก็บไฟล์ img_image มืงอย่าไปป่งนช่ออื่นถ้ามืงบ่ได้ตั้งช่อ mutel file ลวมทั้ง ui พร้อม ควย กุเมือยนำไฟนนีวะ default be img_image

    // ตรวจสอบว่า mg_code ที่ได้รับมาตรงกับ mg_code ใน tb_manager หรือไม่
    const managerQuery = await pool.query(Manager.Checkcode, [mg_code]);
    if (managerQuery.rows.length > 0) {
      // If the manager code exists, extract the manager ID
      const mg_id = managerQuery.rows[0].mg_id;
      console.log(mg_id);

      // Check if a new image file has been uploaded
      if (typeof req.file !== "undefined") {
        const newImage = req.file.filename;
        const oldImage = newData.fileold;
        // Construct file path
        const filePath = path.join(__dirname, "../Images-uploads", oldImage);
        try {
          // Check if the file exists
          await fs.stat(filePath);
          // File exists, proceed with deletion
          await fs.unlink(filePath);
        } catch (err) {
          // File does not exist, ignore the error
        }

        // Update the image record in the database
        await pool.query(Hotel.UpdateData, [
          mg_id,
          category_id,
          ht_name,
          ht_price,
          ht_open,
          ht_close,
          ht_address,
          ht_location,
          ht_website,
          ht_connection,
          ht_convenience,
          ht_description,
          newImage,
          id,
        ]);
        return res.status(200).json({ message: "Update successful" });
      } else {
        // If no new image file is uploaded, update only the image name
        const img_image = newData.fileold;
        const updateQuery = await pool.query(Hotel.UpdateData, [
          mg_id,
          category_id,
          ht_name,
          ht_price,
          ht_open,
          ht_close,
          ht_address,
          ht_location,
          ht_website,
          ht_connection,
          ht_convenience,
          ht_description,
          img_image,
          id,
        ]);

        if (updateQuery.rowCount === 0) {
          return res.status(404).json({ error: "Image not found" });
        }
        return res.status(200).json({ message: "Update successful" });
      }

      
    } else {
      // If the manager code does not exist, return an error response
      return res.status(400).json({ error: "Manager code does not exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Update error: " + error.message });
  }
};


// categoryController.js
exports.Remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Ensure proper ID conversion
    console.log("idhotel "+id)

   
    // Check image existence (assuming a `Hotel.ExistsData_ById` query)
    const existsQuery = await pool.query(Hotel.ReadData_ById, [id]);
    if (!existsQuery.rows.length) {
      return res.status(404).json({ error: "data is not aready" });
    }

    const filename = existsQuery.rows[0].img_image;
    console.log(filename);

    // Construct file path (assuming `Images-uploads` directory)
    const filePath = path.join(__dirname, "../Images-uploads", filename);
    fs.stat(filePath, async (err, stats)=>{

      if (err) {
        // File does not exist, proceed with deletion
        await pool.query(Hotel.RemoveData, [id]);
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
    const removeQuery = await pool.query(Hotel.RemoveData, [id]);
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




exports.ReadHotelWithAvg_Score = async (req, res) => {
  try {
    const results = await pool.query(Hotel.getHotelWithAvg_Score);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
     handleError(res, error);
  }
};
