

const Place = require("../Query/placeQry");
const pool = require("../config/config_db");
const fs = require("fs");
const path = require("path"); // เพิ่มบรรทัดนี้เพื่อนำเข้าโมดูล path
const multer = require('multer');
//  TODO: function save images 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, 'place-' + uniqueSuffix + file.originalname)
    }
  })
  
exports.uploadfile = multer({ storage: storage }).single('img_image')


// Function to handle common error scenarios and send appropriate responses
const handleError = (res, error, message = "An error occurred") => {
  console.error(error);
  res.status(500).json({ error: message });
};


// TODO: get all places items from db 
exports.Read = async (req, res) => {
  try {
    const results = await pool.query(Place.GetData);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
     handleError(res, error);
  }
};

exports.Reports = async (req, res) => {
  try {
    const results = await pool.query(Place.GetDataReports);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
     handleError(res, error);
  }
};
// TODO: get all places items from db 
exports.ReadplacesWithAvg_Score = async (req, res) => {
  try {
    const results = await pool.query(Place.getplacesWithAvg_Score);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
     handleError(res, error);
  }
};

exports.GetplaceAvg_Score5_4 = async (req, res) => {
  try {
    const results = await pool.query(Place.getplaceAvg_Score5_4);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
     handleError(res, error);
  }
};
exports.getdatdata_allpales = async (req, res) => {
  try {
    const results = await pool.query(Place.Getdatdata_allpales);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
     handleError(res, error);
  }
};

// TODO: get all places items from db 
exports.Readplace = async (req, res) => {
  try {
    const results = await pool.query(Place.Readplace);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
     handleError(res, error);
  }
};

exports.ReadById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Place.ReadData_ById, [id]);
    if (!results.rows.length) {
      return res.status(404).json({ error: "Hotel with that ID not found" });
    }
    res.send(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};

// TODO: insert items  to Place
exports.Insert = async (req, res) => {
  // console.log(req.body);
 
  try {
   
    const { pl_name, pl_startime, pl_endtime, pl_address, pl_price, category_id, pl_description,pl_warning,sesion,user_id } =
      req.body;
      console.log("userid"+user_id)
      console.log(req.body);
      console.log(req.file);
      // ส้างตวแป มาเกับค่า ชือไฟ filename multer
      let img_image = "";
      img_image = req.file.filename; // Get filename from multer
       console.log(img_image);
               // add Place to db
    await pool.query(Place.PostData, [ pl_name, pl_startime, pl_endtime, pl_address, pl_price, category_id, pl_description,pl_warning,sesion,user_id,img_image])
    .then((result) => {
      console.log(result);
      return res.status(201).send("insert successful");
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).send("insert error");
    });
     
  } catch (error) {
    console.log(error);
    return res.status(404).send("insert error");
  }
};

// TODO: Update Place where id
exports.Update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { pl_name, pl_startime, pl_endtime, pl_address, pl_price, category_id, pl_description,pl_warning,sesion } = req.body;
    var newData = req.body;
    let img_image = newData.pl_img_image;
    console.log(req.body)
    console.log("fileimsgr" + img_image);


    // Check if a new image file has been uploaded 
    if (typeof req.file !== 'undefined') {
      let img_img = req.file.filename;
      let imageOld = newData.fileold;

      // Delete the old image file
      const filePath = path.join(__dirname, "../Images-uploads", imageOld);
      fs.stat(filePath, async (err, stats) => {
        if (err) {
            
          await pool.query(Place.UpdateData, [pl_name, pl_startime, pl_endtime, pl_address, pl_price, category_id, pl_description,pl_warning,sesion, img_img, id]);
          return res.status(200).json({ message: "Update successful" });

        }
        // File exists, proceed with deletion
        await fs.promises.unlink(filePath);
        // Update the image record in the database
        await pool.query(Place.UpdateData, [pl_name, pl_startime, pl_endtime, pl_address, pl_price, category_id, pl_description,pl_warning,sesion, img_img, id]);
        return res.status(200).json({ message: "Update successful" });
        
      });
    
    } else {
      // If no new image file is uploaded, update only the image name
      const updateQuery = await pool.query(Place.UpdateData, [pl_name, pl_startime, pl_endtime, pl_address, pl_price, category_id, pl_description,pl_warning,sesion,img_image, id]);
      if (updateQuery.rowCount === 0) {
        return res.status(404).json({ error: "Image not found" });
      }

      return res.status(200).json({ message: "Update successful" });
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

    // Check image existence (assuming a `Place.ExistsData_ById` query)
    const existsQuery = await pool.query(Place.ReadData_ById, [id]);
    if (!existsQuery.rows.length) {
      return res.status(404).json({ error: "Image not found" });
    }

    const filename = existsQuery.rows[0].pl_img_image;
    console.log(filename);

    // Construct file path (assuming `Images-uploads` directory)
    const filePath = path.join(__dirname, '../Images-uploads', filename);

    fs.stat(filePath, async (err, stats)=>{

      if (err) {
        // File does not exist, proceed with deletion
        await pool.query(Place.RemoveData, [id]);
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
    const removeQuery = await pool.query(Place.RemoveData, [id]);
    if (!removeQuery.rowCount) {
      return res
        .status(500)
        .json({ error: "Failed to remove image from database" });
    }

    res.status(200).json({ message: "Image removed successfully" }); 
    })
  
  } catch (error) {
    console.error(error);
    handleError(res, error,"Remove error try agine failed");
  }
};




