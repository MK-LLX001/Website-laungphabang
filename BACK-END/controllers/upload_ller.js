
const Upload = require("../Query/upload__Qry");
const pool = require("../config/config_db");
const fs = require("fs");
const path = require("path"); // เพิ่มบรรทัดนี้เพื่อนำเข้าโมดูล path
const multer = require('multer');

// TODO: getCategory All items


// TODO Function to handle common error scenarios and send appropriate responses
const handleError = (res, error, message = "An error occurred") => {
  console.error(error);
  res.status(500).json({ error: message });
};

exports.Read = async (req, res) => {
  try {
    const results = await pool.query(Upload.GetData);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    return res.json({ error: "getcategory error" });
  }
};

exports.ReadDefault = async (req, res) => {
  try {
    const results = await pool.query(Upload.GetDataDefault);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    return res.json({ error: "getcategory error" });
  }
};



exports.Readtrending = async (req, res) => {
  try {
    const results = await pool.query(Upload.GetDatatrending);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    return res.json({ error: "getcategory error" });
  }
};
exports.ReadByIdToUpload = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Upload.ReadData_ById_toUpdate, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};
exports.ReadById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Upload.ReadData_ById, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};

exports.ReadByIdByUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    const results = await pool.query(Upload.countUser_UploadsByid, [id]);
    return res.send(results.rows); // ส่ง results.rows แทน Datacagetory.rows
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // เปลี่ยนสถานะเป็น 500 สำหรับข้อผิดพลาดของเซิร์ฟเวอร์
  }
};

// ในฝั่งเซิร์ฟเวอร์
exports.GetDataByIdUser = async (req, res) => {
  try {
    console.log("Received body:", req.body); // ตรวจสอบค่าที่ได้รับจากไคลเอนต์

    const { user_id } = req.body;
    console.log("User ID:", user_id); // ตรวจสอบค่าของ user_id

    const results = await pool.query(Upload.getDataByIduser, [user_id]);
    // console.log(results.rows)
    return res.send(results.rows); // ส่ง results.rows แทน Datacagetory.rows
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" });
  }
};

exports.UpdateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
 
    console.log("id:"+id)
    console.log("status"+status)

    await pool.query("UPDATE tb_uploads SET status = $1 WHERE up_id = $2", [status, id]);
    return res.send({ message: "User state updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Update state error" });
  }
};


// TODO: insert items  to Upload
exports.Insert = async (req, res) => {
 
 
  try {
   
    const { Title, description, user_name, category } =
      req.body;
      console.log(req.body);
      // ส้างตวแป มาเกับค่า ชือไฟ filename multer
      let image = "";
      image = req.file.filename; // Get filename from multer
       console.log(image);
               // add Upload to db
    await pool.query(Upload.PostData, [
      Title,
      description,
      user_name,
      category,
      image,
    ]);
    return res.status(201).send("insert successful");
     
  } catch (error) {
    console.log(error);
    return res.json("insert error");
  }
};

// TODO: Update Upload where id
exports.Update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { up_name, up_description, user_id, category_id } = req.body;
    let img_image;

    if (req.file) {
      img_image = req.file.filename;
    }

    const updateDataUpload = async (img_image) => {
      try {
        await pool.query(Upload.UpdateData, [
          up_name,
          up_description,
          user_id,
          category_id,
          img_image,
          id,
        ]);
      } catch (error) {
        console.error(error);
        throw new Error("Update error: " + error.message);
      }
    };

    if (req.file) {
      const newImage = req.file.filename;
      const oldImage = req.body.fileold;
      const filePath = path.join(__dirname, "../Images-uploads", oldImage);

      fs.unlink(filePath, async (err) => {
        try {
          if (err && err.code !== 'ENOENT') {
            // If the error is not "No such file or directory", rethrow it
            throw err;
          }
          await updateDataUpload(newImage);
          return res.status(200).json({ message: "Update successful" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Update error: " + error.message });
        }
      });
    } else {
      const oldImage = req.body.fileold;
      try {
        await updateDataUpload(oldImage);
        return res.status(200).json({ message: "Update successful" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Update error: " + error.message });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Update error: " + error.message });
  }
};


// categoryController.js
// exports.Remove = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
// console.log(req.body);

//   // Check if there are any records in tb_likes referencing this up_id
//   const likesQuery = await pool.query('SELECT lk_id FROM tb_likes WHERE up_id = $1', [id]);
//   if (likesQuery.rows.length > 0) {
//     // If there are records in tb_likes referencing this up_id, handle them first
//     await Promise.all(likesQuery.rows.map(async (like) => {
//       const deleteLikeQuery = await pool.query('DELETE FROM tb_likes WHERE lk_id = $1', [like.lk_id]);
//       if (deleteLikeQuery.rowCount === 0) {
//         // Handle error if deletion fails
//         throw new Error(`Failed to delete like with id ${like.lk_id}`);
//       }
//     }));
//   }
  //    // Check image existence (assuming a `Place.ExistsData_ById` query)
  //    const existsQuery = await pool.query(Upload.Check_id, [id]);
  //    if (!existsQuery.rows.length) {
  //      return res.status(404).json({ error: "Image not found" });
  //    }

  //  const filename = existsQuery.rows[0].img_image;
  //   console.log(filename);

  //    // Construct file path (assuming `Images-uploads` directory)
  //    const filePath = path.join(__dirname, '../Images-uploads', filename);
     
  //    fs.stat(filePath, async (err, stats)=>{

  //     if (err) {
  //       // File does not exist, proceed with deletion
  //       await pool.query(Upload.RemoveData,[id]);
  //       return res.status(200).json({ message: "Delete successful" });
  //     }
  //         // Attempt file deletion (handle potential errors gracefully)
  //   try {
  //     await fs.promises.unlink(filePath);
  //   } catch (err) {
  //     console.error(`Error deleting file: ${err.message}`);
  //     return res.status(500).json({ error: "Failed to remove image file" });
  //   }

  //   // Remove image record from database
  //   const removeQuery = await pool.query(Upload.RemoveData, [id]);
  //   if (!removeQuery.rowCount) {
  //     return res
  //       .status(500)
  //       .json({ error: "Failed to remove image from database" });
  //   }

  //   res.status(200).json({ message: "Image removed successfully" }); 
  //   })
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: "An error occurred while trying to delete the category.",
//     });
//   }
// };



// const RemoveData = "DELETE FROM tb_uploads WHERE up_id = $1";

exports.Remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Check if the record exists
    const existsQuery = await pool.query(Upload.Check_id, [id]);
    if (!existsQuery.rows.length) {
      return res.status(404).json({ error: "Record not found" });
    }

    const filename = existsQuery.rows[0].img_image;
    const filePath = path.join(__dirname, "../Images-uploads", filename);

    // Check if the file exists before attempting to delete it
    let fileExists = false;
    try {
      await fs.promises.stat(filePath);
      fileExists = true;
    } catch (err) {
      // File does not exist
    }

    // Begin a transaction
    await pool.query("BEGIN");

    // Remove the record from the database
    await pool.query(Upload.RemoveDataUpload, [id]);

    // If the file exists, delete it
    if (fileExists) {
      await fs.promises.unlink(filePath);
    }

    // Commit the transaction
    await pool.query("COMMIT");

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error);
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "An error occurred while trying to remove the record" });
  }
};


// TODO: enpoin like upload 

exports.LikePost = async (req, res) => {
  try {
   
    const { up_id,user_id,category_id,lk_score } = req.body;
      // console.log(req.body);
      // console.log( "up_id : "+up_id)
    await pool.query(Upload.Like, [
    up_id,user_id,category_id,lk_score ])
    .then((results) => {
      console.log("success", results.rows);
      return res.status(201).send("Insert successful");
    });
  
   
     
  } catch (error) {
    console.log(error);
    return res.json("insert error");
  }
};

exports.LikePost = async (req, res) => {
  try {
    const { up_id, user_id, category_id, lk_score } = req.body;
    await pool.query(Upload.Like, [up_id, user_id, category_id, lk_score])
      .then((results) => {
        console.log("success", results.rows);
        return res.status(201).send("Insert successful");
      });
  } catch (error) {
    console.log(error);
    return res.json("insert error");
  }
};


// Other exports (Insert, Update, Remove, etc.) remain the same as in your provided code

exports.Notifications = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    
    console.log(id);
    const results = await pool.query(Upload.Notification_Qry, [id]);
   console.log(results.rows);
    return res.send(results.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "read data error" });
  }
};
