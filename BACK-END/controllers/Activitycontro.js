const Activity = require("../Query/ActivityQuery");
const pool = require("../config/config_db");
const fs = require("fs");
const path = require("path"); // เพิ่มบรรทัดนี้เพื่อนำเข้าโมดูล path
const multer = require("multer");
//  TODO: function save images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "Activity-" + uniqueSuffix + file.originalname);
  },
});

exports.uploadfile = multer({ storage: storage }).single("ac_image");

// Function to handle common error scenarios and send appropriate responses
const handleError = (res, error, message = "An error occurred") => {
  console.error(error);
  res.status(500).json({ error: message });
};

// TODO: get all Activitys items from db
exports.Read = async (req, res) => {
  try {
    const results = await pool.query(Activity.GetData);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
};
// TODO: get all Activitys items from db
exports.ReadActivity = async (req, res) => {
  try {
    const results = await pool.query(Activity.ReadActivity);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
};

exports.ReadById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Activity.ReadData_ById, [id]);
    if (!results.rows.length) {
      return res.status(404).json({ error: "Hotel with that ID not found" });
    }
    res.send(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};

// TODO: insert items  to Activity
exports.Insert = async (req, res) => {
  try {
    console.log(req.body);
        const {
          ac_name,
          category_id,
          pl_id,
          ac_opendate,
          ac_closedate,
          ac_address,
          ac_price,
          ac_description,
        } = req.body; 

    // function insert table
  const insertActivityData = async (image,res)=> {
      try {
            await pool.query(Activity.PostData, [
              ac_name,
              category_id,
              pl_id,
              ac_opendate,
              ac_closedate,
              ac_address,
              ac_price,
              ac_description,
              image,
              
            ]);
            return res.status(200).json({ message: "Update successful" });
      } catch (error) {
        console.error(error);
        return handleError(res, error, "Update error:");
      }
    }
    // Get the filename from multer
    const ac_image = req.file.filename;
    // insert databases 
    await insertActivityData(ac_image,res);
  
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
};

// TODO: Update Activity where id
exports.Update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(req.body);
    const {
      ac_name,
      category_id,
      pl_id,
      ac_opendate,
      ac_closedate,
      ac_address,
      ac_price,
      ac_description,
    } = req.body;
    var newData = req.body;

    const updateActivityData = async (image, id, res) => {
      try {
        await pool.query(Activity.UpdateData, [
          ac_name,
          category_id,
          pl_id,
          ac_opendate,
          ac_closedate,
          ac_address,
          ac_price,
          ac_description,
          image,
          id,
        ]);
        return res.status(200).json({ message: "Update successful" });
      } catch (error) {
        console.error(error);
        return handleError(res, error, "Update error:");
      }
    }

    if (typeof req.file !== "undefined") {
      const newImage = req.file.filename;
      const oldImage = newData.fileold;
      console.log("fileOld: " + oldImage);
      console.log("fileNew: " + newImage);
      const filePath = path.join(__dirname, "../Images-uploads", oldImage);

      fs.unlink(filePath, async (err) => {
        if (err) {
          // TODO: have name file in db  but note have file in images-upload , so error , we should update new file to update  
          await updateActivityData(newImage, id, res);
        } else {
          // TODO: have newfile and name file in db so we remove oldimage after remove , update use newfile 
          await updateActivityData(newImage, id, res);
        }
      });
    } else {
      // TODO: have file oldimage but not have newfile , so we update use oldImage  
      const oldImage = newData.fileold;
      await updateActivityData(oldImage, id, res);
    }
  } catch (error) {
    console.error(error);
    return handleError(res, error, "Update error:");
  }
};

// categoryController.js
exports.Remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);




    // Check if the activity exists
    const existsQuery = await pool.query(Activity.ReadData_ById, [id]);
    if (!existsQuery.rows.length) {
      return res.status(404).json({ error: "Activity not found" });
    }

    const filename = existsQuery.rows[0].ac_image;
    const filePath = path.join(__dirname, '../Images-uploads', filename);

    // Check if the file exists
    let fileExists = false;
    try {
      await fs.promises.stat(filePath);
      fileExists = true;
    } catch (err) {
      // File does not exist, proceed with activity removal from the database
    }

    // Remove the activity from the database
    const removeQuery = await pool.query(Activity.RemoveData, [id]);
    if (!removeQuery.rowCount) {
      return res.status(500).json({ error: "Failed to remove activity from the database" });
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
    return res.status(200).json({ message: "Activity removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while removing the activity" });
  }
};


