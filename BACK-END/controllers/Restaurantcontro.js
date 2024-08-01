const Restaurant = require("../Query/RastaurantQury");
const Manager = require("../Query/managerQuery");
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
    cb(null, "Restaurant-" + uniqueSuffix + file.originalname);
  },
});

exports.uploadfile = multer({ storage: storage }).single("image");

// Function to handle common error scenarios and send appropriate responses
const handleError = (res, error, message = "An error occurred") => {
  console.error(error);
  res.status(500).json({ error: message });
};

// TODO: get all Restaurants items from db
exports.Read = async (req, res) => {
  try {
    const results = await pool.query(Restaurant.GetData);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
};
exports.GetRestaurantWithAvg_score = async (req, res) => {
  try {
    const results = await pool.query(Restaurant.GetDataWithAvg_score);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
};

exports.GetRestaurantByUserId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Restaurant.GetRestaurantByUserId_Qry,[id]);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
};

exports.GetRestaurantAllByIdUser = async (req, res) => {
  try {
    console.log("Received body:", req.body); // ตรวจสอบค่าที่ได้รับจากไคลเอนต์

    const { user_id } = req.body;
    console.log("User Restaurants ID:", user_id); // ตรวจสอบค่าของ user_id

    const results = await pool.query(Restaurant.getRestaurantAllByIdUser, [user_id]);
    // console.log(results.rows)
    return res.send(results.rows); // ส่ง results.rows แทน Datacagetory.rows
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" });
  }
};




// TODO: get all Restaurants items from db
exports.ReadRestaurant = async (req, res) => {
  try {
    const results = await pool.query(Restaurant.ReadRestaurant);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
};

exports.ReadById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Restaurant.ReadData_ById, [id]);
    if (!results.rows.length) {
      return res.status(404).json({ error: "Hotel with that ID not found" });
    }
    res.send(results.rows);
  } catch (error) {
    handleError(res, error);
  }
};

// TODO: insert items  to Restaurant
exports.Insert = async (req, res) => {
  try {
    console.log(req.body);
    console.log("file image :" + req.file.filename);
   
    const {
      code,
      name,
      menu,
      category,
      open,
      close,
      address,
      location,
      website,
      connect,
      description,
      user_id,
      price,
    } = req.body;

    console.log("code :" + code);

    // Check if manager code exists
    const managerQuery = await pool.query(Manager.Checkcode, [code]);
    if (!managerQuery.rows.length) {
      return res.status(400).json({ error: "Manager code does not exist" });
    }

    const mg_id = managerQuery.rows[0].mg_id;
    const image = req.file ? req.file.filename : "";
    // console.log("id manager: "+mg_id)
    if(typeof req.file !=="undefined"){
      await pool.query(Restaurant.PostData, [
        name,
        menu,
        mg_id,
        category,
        open,
        close,
        address,
        location,
        website,
        connect,
        description,
        user_id,
        price,
        image,
      ]);
      return res.status(201).send("Insert successful");
    }else {
      console.log("image not found pls select")
      return res.status(400).json({ error: "image undefined" });
    }

   
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
};

// TODO: Update Restaurant where id
// TODO: Update Restaurant where id
exports.Update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(req.body);
    console.log(id);

    const {
      name,
      code,
      category,
      open,
      close,
      address,
      connect,
      description,
      website,
      location,
      menu,
      fileold,
      price,
    } = req.body;
    console.log(code);

    // Check if manager code exists
    const managerQuery = await pool.query(Manager.Checkcode, [code]);
    if (!managerQuery.rows.length) {
      return res.status(400).json({ error: "Manager code does not exist" });
    }
    const mg_id = managerQuery.rows[0].mg_id;
    console.log("id manager " + mg_id);
    

    // create function to update 
    const updateRestaurantData = async (image, id, res) => {
      try {
        await pool.query(Restaurant.UpdateData, [
          name,
          menu,
          mg_id,
          category,
          open,
          close,
          address,
          location,
          website,
          connect,
          description,
          price,
          image,
          id,
        ]);
        return res.status(200).json({ message: "Update successful" });
      } catch (error) {
        console.error(error);
        return handleError(res, error, "Update error:");
      }
    };

    if (typeof req.file !== "undefined") {
      const newImage = req.file.filename;
      const oldImage = fileold;
      const filePath = path.join(__dirname, "../Images-uploads", oldImage);

      fs.unlink(filePath, async (err) => {
        if (err) {
          // TODO: have name file in db but not have file in images-upload, so error, we should update new file to update
          await updateRestaurantData(newImage, id, res);
        } else {
          // TODO: have new file and name file in db so we remove old image after remove, update use new file
          await updateRestaurantData(newImage, id, res);
        }
      });
    } else {
      // TODO: have old image but not have new file, so we update using oldImage
      const oldImage = fileold;
      await updateRestaurantData(oldImage, id, res);
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

    // Check if the Restaurant exists
    const existsQuery = await pool.query(Restaurant.ReadData_ById, [id]);
    if (!existsQuery.rows.length) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const filename = existsQuery.rows[0].rest_image;
    const filePath = path.join(__dirname, "../Images-uploads", filename);

    // Check if the file exists
    let fileExists = false;
    try {
      await fs.promises.stat(filePath);
      fileExists = true;
    } catch (err) {
      // File does not exist, proceed with Restaurant removal from the database
    }

    // Remove the Restaurant from the database
    const removeQuery = await pool.query(Restaurant.RemoveData, [id]);
    if (!removeQuery.rowCount) {
      return res
        .status(500)
        .json({ error: "Failed to remove Restaurant from the database" });
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
    return res.status(200).json({ message: "Restaurant removed successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while removing the Restaurant" });
  }
};


exports.UpdateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
 
    console.log("id:"+id)
    console.log("status"+value)

    await pool.query("UPDATE tb_restaurants SET state = $1 WHERE rest_id = $2", [value, id]);
    return res.send({ message: "User state updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Update state error" });
  }
};
