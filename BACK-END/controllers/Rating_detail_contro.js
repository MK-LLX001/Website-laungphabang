const Rating = require("../Query/Rating_detail_Qry");
const pool = require("../config/config_db");

// TODO: getCategory All items
exports.ReadRating = async (req, res) => {
    try {
      const results = await pool.query(Rating.getrating);
      res.json(results.rows);
    } catch (error) {
      console.log(error);
      return res.json({ error: "getcategory error" });
    }
  };

exports.ReadDetail_rating = async (req, res) => {
  try {
    const results = await pool.query(Rating.getdeail_rating);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    return res.json({ error: "getcategory error" });
  }
};
// todo hotels
exports.ReadByIdHotels = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Rating.readratingByIdHotels, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};
// todo palces 
exports.ReadByIdPlaces = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Rating.readratingByIdPlaces, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};
// todo activity
exports.ReadByIdActivitys = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Rating.readratingByIdActivitys, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};
exports.ReadByIdRestaurants = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Rating.readratingByIdRestaurants, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};




exports.Read_Avg_rating = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Rating.readAvg_ratingByid_place, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};
exports.Read_Avg_ratingHotels = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Rating.readAvg_ratingByid_hotel, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};
exports.Read_Avg_ratingActivitys = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Rating.readAvg_ratingByid_Activitys, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};
exports. Read_Avg_ratingRestaurants = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(Rating.readAvg_ratingByid_Restaurants, [id]);
    return res.send(results.rows); // Send Datacagetory.rows instead of Datacagetory
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" }); // Adjusted status to 500 for server errors
  }
};

// TODO: insert items  to Rating
exports.Insertplace = async (req, res) => {
  try {
    const { pl_id,user_id,score,comment } = req.body;
    console.log(req.body);
    if(score === '' && comment !=='') {
      const newscore = 0;
      await pool.query(Rating.insertplace, [pl_id,user_id,newscore,comment]);
      return res.status(200).send("insert successful");
    }if (score !== '' && comment === '') {
      await pool.query(Rating.insertplace, [pl_id,user_id,score,comment]);
      return res.status(200).send("insert successful");
    } else {
      await pool.query(Rating.insertplace, [pl_id,user_id,score,comment]);
      return res.status(200).send("insert successful");
    }
    
  } catch (error) {
    console.log(error);
    return res.json("insert error");
  }
};
// TODO: insert items  to Rating activitys
exports.Insertactivitys = async (req, res) => {
  try {
    const { ac_id,user_id,score,comment } = req.body;
    console.log(req.body);
    if(score === '' && comment !=='') {
      const newscore = 0;
      await pool.query(Rating.insertactivity, [ac_id,user_id,newscore,comment]);
      return res.status(200).send("insert successful");
    }if (score !== '' && comment === '') {
      await pool.query(Rating.insertactivity, [ac_id,user_id,score,comment]);
      return res.status(200).send("insert successful");
    } else {
      await pool.query(Rating.insertactivity, [ac_id,user_id,score,comment]);
      return res.status(200).send("insert successful");
    }
    
  } catch (error) {
    console.log(error);
    return res.json("insert error");
  }
};
exports.InsertRestaurants = async (req, res) => {
  try {
    const { rest_id,user_id,score,comment } = req.body;
    console.log(req.body);
    if(score === '' && comment !=='') {
      const newscore = 0;
      await pool.query(Rating.insertrestaurant, [rest_id,user_id,newscore,comment]);
      return res.status(200).send("insert successful");
    }if (score !== '' && comment === '') {
      await pool.query(Rating.insertrestaurant, [rest_id,user_id,score,comment]);
      return res.status(200).send("insert successful");
    } else {
      await pool.query(Rating.insertrestaurant, [rest_id,user_id,score,comment]);
      return res.status(200).send("insert successful");
    }
    
  } catch (error) {
    console.log(error);
    return res.json("insert error");
  }
};
// TODO: insert items  to Rating hotels
exports. Inserthotels = async (req, res) => {
  try {
    const { ht_id,user_id,score,comment } = req.body;
    console.log(req.body);
    if(score === '' && comment !=='') {
      const newscore = 0;
      await pool.query(Rating.inserthotels, [ht_id,user_id,newscore,comment]);
      return res.status(200).send("insert successful");
    }if (score !== '' && comment === '') {
      await pool.query(Rating.inserthotels, [ht_id,user_id,score,comment]);
      return res.status(200).send("insert successful");
    } else {
      await pool.query(Rating.inserthotels, [ht_id,user_id,score,comment]);
      return res.status(200).send("insert successful");
    }
    
  } catch (error) {
    console.log(error);
    return res.json("insert error");
  }
};

// TODO: Update Rating where id
exports.Update = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { category_name } = req.body;
  
      // Check if the category exists
      const results = await pool.query(Rating.readcategoryById, [id]);
      if (!results.rowCount) {
        return res.status(404).json({ error: "Category does not exist in the database" });
      }
  
      // Update the category
      await pool.query(Rating.updatecategory, [category_name, id]);
      
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
    console.log("id detailrating" + id);

    // ลบข้อมูลจากฐานข้อมูลตาม id ที่ได้รับ 
    const results = await pool.query(Rating.removeRating, [id]);

    // ตรวจสอบว่ามีแถวที่ถูกลบหรือไม่
    if (results.rowCount === 0) {
      return res.status(404).json({ error: "Delete Error: Item not found" });
    }

    return res.json({ message: 'Delete successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while trying to delete" });
  }
};


exports.GetRatingById = async (req, res) => {
  try {
    console.log("Received body:", req.body); // ตรวจสอบค่าที่ได้รับจากไคลเอนต์

    const { user_id } = req.body;
    console.log("User Hotels ID:", user_id); // ตรวจสอบค่าของ user_id

    const results = await pool.query(Rating.GetRatingByUserId,[user_id]);
    // console.log(results.rows)
    return res.send(results.rows); // ส่ง results.rows แทน Datacagetory.rows
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" });
  }
};

exports.GetRatingHotelsById = async (req, res) => {
  try {
    console.log("Received body:", req.body); // ตรวจสอบค่าที่ได้รับจากไคลเอนต์

    const { user_id } = req.body;
    console.log("User Hotels ID:", user_id); // ตรวจสอบค่าของ user_id

    const results = await pool.query(Rating.getRatingHotelsById,[user_id]);
    // console.log(results.rows)
    return res.send(results.rows); // ส่ง results.rows แทน Datacagetory.rows
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" });
  }
};

exports.LoadRatingRestauransById = async (req, res) => {
  try {
    console.log("Received body:", req.body); // ตรวจสอบค่าที่ได้รับจากไคลเอนต์

    const { user_id } = req.body;
    console.log("User rest ID:", user_id); // ตรวจสอบค่าของ user_id

    const results = await pool.query(Rating.getRatingRestauransById,[user_id]);
    // console.log(results.rows)
    return res.send(results.rows); // ส่ง results.rows แทน Datacagetory.rows
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "read data error" });
  }
};
exports.GetRatingActivityById = async (req, res) => {
  try {
    console.log("Received body:", req.body); // Debugging

    const { user_id, ac_id } = req.body;
    console.log("User ID:", user_id); // Debugging
    console.log("Activity ID:", ac_id); // Debugging

    // Ensure both user_id and ac_id are integers
    const parsedUserId = parseInt(user_id, 10);
    const parsedAcId = parseInt(ac_id, 10);

    if (isNaN(parsedUserId) || isNaN(parsedAcId)) {
      throw new Error("Invalid input: user_id and ac_id must be integers");
    }

    // Perform your database query
    // const results = await pool.query('SELECT * FROM ratings WHERE user_id = $1 AND ac_id = $2', [parsedUserId, parsedAcId]);
    // console.log(results.rows);
    // return res.send(results.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "read data error" });
  }
};

  
