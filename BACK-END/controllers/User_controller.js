const { query } = require("express");
const querire = require("../Query/Queirs_users");
const pool = require("../config/config_db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path"); // เพิ่มบรรทัดนี้เพื่อนำเข้าโมดูล path
const multer = require('multer');
const bodyParser = require('body-parser');
require("dotenv").config();
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
// const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
let profile_imgs_name_list = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gracie",
  "Bear",
  "Bella",
  "Abby",
  "Harley",
  "Cali",
  "Leo",
  "Luna",
  "Jack",
  "Felix",
  "Kiki",
];
let profile_imgs_collections_list = [
  "notionists-neutral",
  "adventurer-neutral",
  "fun-emoji",
];

const profile_img = `https://api.dicebear.com/6.x/${
  profile_imgs_collections_list[
    Math.floor(Math.random() * profile_imgs_collections_list.length)
  ]
}/svg?seed=${
  profile_imgs_name_list[
    Math.floor(Math.random() * profile_imgs_name_list.length)
  ]
}`;

// token
// const formatDatatoSend = (user) => {
//   const access_token = jwt.sign(
//     { user_email: user.email },
//     process.env.SECRET_ACCESS_KEY,
//     {
//       expiresIn: "1h",
//     }
//   );

//   return {

//     access_token,
//     user_id: user.user_id,
//     user_name: user.user_name,
//     user_lastname: user.user_lastname,
//     state : user.state,
//     user_profile_img: user.user_profile_img
//   };
// };

const formatDatatoSend = (user) => {
  const access_token = jwt.sign(
    { user_email: user.user_email },
    process.env.SECRET_ACCESS_KEY,
    {
      expiresIn: "1h",
    }
  );

  return {
    access_token,
    user_id: user.user_id,
    user_name: user.user_name,
    user_lastname: user.user_lastname,
    state: user.state,
    user_profile_img: user.user_profile_img
  };
};

// console.log(process.env.SECRET_ACCESS_KEY);
exports.getUsers = async (req, res) => {
  try {
    // code here
    
    pool.query(querire.getusers, (error, results) => {
      if (error) {
        return res.json({ error: "getUser error: " + error });
      } else {
        return res.json(results.rows);
      }
    });
  } catch (error) {
    // handle errors
    console.log(error);
    res.json({ error: "error getUser: " + error });
  }
};


exports.getUsersByid = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    pool.query(querire.getusersByid, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Error retrieving user data: " + error });
      } else {
        console.log(results.rows);
        return res.status(200).json(results.rows);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error: " + error });
  }
};

// signup
// exports.postUsers = async (req, res) => {
//   try {
//     const { user_name, user_lastname, user_email, user_password } = req.body;
//     console.log(req.body);

//  const state = "user";

//     if (user_name.length < 3) {
//       return res.status(400).json({ warning: "Name must be at least 3 letters long" });
//     }
//     if (user_lastname.length < 3) {
//       return res.status(400).json({ warning: "Last name must be at least 3 letters long" });
//     }
//     if (!user_email) {
//       return res.status(400).json({ warning: "Enter your email" });
//     }
//     if (!emailRegex.test(user_email)) {
//       return res.status(400).json({ warning: "Email is invalid. Example: example@gmail.com" });
//     }
//     if (!user_password) {
//       return res.status(400).json({ warning: "Enter your password" });
//     }

//     // Hash the password and insert the user into the database
//     bcrypt.hash(user_password, 10, async (error, hashedPassword) => {
//       if (error) {
//         return res.status(500).json({ error: "Error hashing password" });
//       }

//       const user_profile_img = profile_img; // Set a default profile image or handle this accordingly

//       try {
//         const result = await pool.query(querire.checkemailuser, [user_email]);
//         if (result.rows.length > 0) {
//           return res.status(409).json({ warning: "Email already exists in the system" });
//         }

//         pool.query(
//           querire.postusers,
//           [user_name, user_lastname, user_email, hashedPassword, user_profile_img, state],
//           (error,) => {
//             if (error) {
//               return res.status(500).json({ error: "ລົງທະບຽນບໍ່ສຳເລັດ " + error });
//             }
           
//             console.log("User added successfully: ", result.rows[0]);

//             const user = { user_name, user_lastname, user_email, state, user_profile_img };
//             const formattoSend = formatDatatoSend(user);
//             console.log("ข้อมุน "+formattoSend)
            
//             return res.status(200).json(formattoSend);
//           }
          
//         );
//       } catch (error) {
//         console.error("Database query error:", error);
//         return res.status(500).json({ error: "Internal server error" });
//       }
//     });
//   } catch (error) {
//     console.error("Server error:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.postUsers = async (req, res) => {
  try {
    const { user_name, user_lastname, user_email, user_password } = req.body;
    console.log(req.body);

    const state = "user";

    if (user_name.length < 3) {
      return res.status(400).json({ warning: "Name must be at least 3 letters long" });
    }
    if (user_lastname.length < 3) {
      return res.status(400).json({ warning: "Last name must be at least 3 letters long" });
    }
    if (!user_email) {
      return res.status(400).json({ warning: "Enter your email" });
    }
    if (!emailRegex.test(user_email)) {
      return res.status(400).json({ warning: "Email is invalid. Example: example@gmail.com" });
    }
    if (!user_password) {
      return res.status(400).json({ warning: "Enter your password" });
    }

    // Hash the password and insert the user into the database
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const user_profile_img = profile_img; // Set a default profile image or handle this accordingly

    const result = await pool.query(querire.checkemailuser, [user_email]);
    if (result.rows.length > 0) {
      return res.status(409).json({ warning: "Email already exists in the system" });
    }

    const insertResult = await pool.query(
      querire.postusers,
      [user_name, user_lastname, user_email, hashedPassword, user_profile_img, state]
    );

    if (insertResult.rowCount > 0) {
      console.log("User added successfully: ", insertResult.rows[0]);
      const user = { 
        user_id: insertResult.rows[0].user_id,
        user_name, 
        user_lastname, 
        user_email, 
        state, 
        user_profile_img 
      };
      const formattoSend = formatDatatoSend(user);
      console.log("ข้อมูล "+formattoSend);
      return res.status(200).json(formattoSend);
    } else {
      return res.status(500).json({ error: "Error inserting user" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.signupWithGoogle = async (req, res) => {
  const { credential } = req.body;
  console.log("datasingup", credential);
  try {
    const decoded = jwt.decode(credential); // Decode the JWT to get user info
    console.log("detail", decoded); // This will contain the user information

    // Save the user data to your database
    const users = {
      name: decoded.given_name,
      last_name: decoded.family_name,
      email: decoded.email,
      user_profile_img: decoded.picture,
      state: 's',
    };
    console.log(users);
    const result = await pool.query(querire.checkemailuser, [users.email]);
    if (result.rows.length > 0) {
      return res.status(409).json({ warning: "ທ່ານໄດ້ລົງທະບຽນໃນລະບົບແລ້ວແລ້ວEmail already exists in the system " });
    }

    pool.query(
      querire.queryWithGoogle,
      [users.name, users.last_name, users.email, users.user_profile_img, users.state],
      (error) => {
        if (error) {
          return res.status(500).json({ error: "ລົງທະບຽນບໍ່ສຳເລັດ " + error });
        }

        const user_name = users.name;
        const user_lastname = users.last_name;
        const user_email = users.email;
        const user_profile_img = users.user_profile_img;
        const state = users.state;

        const user = { user_name, user_lastname, user_email, state, user_profile_img };
        const formattoSend = formatDatatoSend(user);
        console.log("ข้อมุน " + formattoSend)
        return res.status(200).json(formattoSend);
      }
    );

  } catch (error) {
    console.error("ການລົງທະບຽນເກີດຂໍ້ຜິຜາດ:", error);
    res.status(500).send({ message: 'ການລົງທະບຽນເກີດຂໍ້ຜິຜາດ', error: error.message });
  }
};

// Endpoint to handle Google sign-in
exports.signinWithGoogle = async (req, res) => {
  const { credential } = req.body;
  console.log("data", credential);
  try {
    const decoded = jwt.decode(credential); // Decode the JWT to get user info
    console.log("detailSingin", decoded); // This will contain the user information

    // const results = await pool.query(querire.checkemailuser, [decoded.email]);
    // if (results.rows.length == 0) {
    //   return res.status(409).json({ warning: "ທ່ານໄດ້ລົງທະບຽນໃນລະບົບແລ້ວແລ້ວEmail already exists in the system " });
    // }

    const query = 'SELECT * FROM tb_users WHERE user_email = $1';
    const values = [decoded.email];
    console.log("values:" + values);

    


    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'ກະຮຸນາລົງທະບຽນກ່ອນ' });
    }

    const user = result.rows[0];
    console.log(user);

    // const formattoSend = formatDatatoSend(user);
    // console.log("dataUser"+ JSON.stringify(formattoSend))
    // return res.status(200).json({ message: 'ເຂົ້າສູລະບົບສຳເລັດ', user: formattoSend });

    const formattedUser = formatDatatoSend(user); // Make sure this function is defined and working
    console.log("ช้อมุนผุ้ใช้"+JSON.stringify(formattedUser))
     return res.status(200).json(formattedUser);




  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).send({ message: 'Error authenticating user', error: error.message });
  }
};


// signin
exports.compreUsers = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    console.log('Request body:', req.body);

    // Validate request body
    if (!user_email || !user_password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Query to check if the email exists in the database
    pool.query(querire.checkemailuser, [user_email], async (error, result) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal server error ກວດສອບemail ບໍໄດ້' });
      }

      // Check if user is found
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Email not found Email ຂອງທານຍັງບໍໄດ້ລົງທະບຽນ' });
      }

      const user = result.rows[0];
      console.log('User found:', user);

      // Compare passwords
      bcrypt.compare(user_password, user.user_password, (err, passwordMatch) => {
        if (err) {
          console.error('Password comparison error:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Incorrect password ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' });
        }

        // Assuming you have a function to format user data
        const formattedUser = formatDatatoSend(user); // Make sure this function is defined and working
       console.log("ช้อมุนผุ้ใช้"+JSON.stringify(formattedUser))
        return res.status(200).json(formattedUser);
      });
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// post info image 
exports.postimg = async (req, res) => {
  try {
    let data = {}; // กำหนดตัวแปร data เป็นอ็อบเจ็กต์เปล่า

    if (req.file != null) {
      data.file = req.file.filename; // กำหนดค่า file ในอ็อบเจ็กต์ data

      pool.query(querire.putimg, [data], (error) => {
        console.log(data);
        if (error) {
          return res.json({ error: "insert error" + error });
        } else {
          const imageURL = `http://localhost:4000/api/img/${data.file}`;
          return res.json({ results: "insert successful" + imageURL });
        }
      });
    } else {
      return res.send('error');
    }
  } catch (error) {
    console.log(error);
    res.send("server error");
  }
};




exports.getimg = async (req, res) => {
  try {
    pool.query(querire.sqlgetimg, (error, result) => {
      if (error) {
        console.log(error);
        return res.json({ error: "getUser error" });
      } else {
        return res.json(result.rows);
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Server error" });
  }
};



exports.changePassword = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  console.log(id);
  const { currentpassword, newpassword } = req.body;

  if (!currentpassword || !newpassword) {
    return res.status(400).json({ message: 'Old password and new password are required' });
  }

  try {
    // Fetch the user's current password hash from the database
    const userResult = await pool.query(querire.getusersByid, [id]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the old password with the current password hash
    const isMatch = await bcrypt.compare(currentpassword, user.user_password);
    if (!isMatch) {
      console.log("password incorrect", isMatch);
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    console.log("password correct", isMatch);
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    // Update the user's password in the database
    await pool.query(querire.changeUserPassword, [hashedPassword, id]);

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Internal server error:', error); // Added more detailed logging
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


//  TODO: function save images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "profile-" + uniqueSuffix + file.originalname);
  },
});

exports.uploadfile = multer({ storage: storage }).single("img_image");


exports.UpdateProfileImg = async (req, res) => {
  const user_id = req.params.user_id;
  console.log("id form url:"+user_id);
  const newData = req.body;

  try {

    

    if (typeof req.file !== "undefined") {
      const newImage = req.file.filename;
      const oldImage = newData.fileold;
      const filePath = path.join(__dirname, "../Images-uploads", oldImage);

      fs.unlink(filePath, async (err) => {
        if (err) {
          // TODO: have name file in db but not have file in images-upload, so error, we should update new file to update
          await pool.query(querire.changeProfileImage,[newImage,user_id])
          return res.status(200).json({ message: "Update successful" });
         
        } else {
          // TODO: have new file and name file in db so we remove old image after remove, update use new file
          await pool.query(querire.changeProfileImage,[newImage,user_id])
          return res.status(200).json({ message: "Update successful" });
        }
      });
    } else {
      // TODO: have old image but not have new file, so we update using oldImage
      const oldImage = newData.fileold;
      await pool.query(querire.changeProfileImage,[oldImage,user_id])
      return res.status(200).json({ message: "Update successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.UpdateUser = async (req, res) => {
  try {
    console.log("new info", req.body);

    const user_id = req.params.user_id;
    console.log("id from url:", user_id);
    const { user_name, user_lastname, user_email } = req.body;
    console.log("name:", user_name, "lastname:", user_lastname, "email:", user_email);

    // ตรวจสอบข้อมูลที่ส่งมา
    if (!user_name || !user_lastname || !user_email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(querire.checkIdUser, [user_id]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update the user information in the database
    await pool.query(querire.updateUser, [user_name, user_lastname, user_email, user_id]);
    return res.status(200).json({ message: "UpdateUser successful" });

  } catch (error) {
    console.error('Internal server error:', error); // Added more detailed logging
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


exports.UpdateUserState = async (req, res) => {
  try {
    const { userId } = req.params;
    const { state } = req.body;
    console.log(state);
    console.log(userId);
    await pool.query("UPDATE tb_users SET state = $1 WHERE user_id = $2", [state, userId]);
    return res.send({ message: "User state updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Update state error" });
  }
};

exports.RemoveUser = async (req, res) => {
  const userId = req.params.userId; // Corrected from req.params.user
  console.log(userId);
  console.log("info " + req.body);

  try {
    await pool.query(querire.RemoveUser, [userId]);
    return res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Delete user error" });
  }
};



