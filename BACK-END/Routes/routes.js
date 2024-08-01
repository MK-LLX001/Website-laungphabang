// routes.js

const { Router } = require("express");
const router = Router();

const {
  getUsers,
  getUsersByid,
  postUsers,
  compreUsers,
  getimg,
  changePassword,
  uploadfile,
  UpdateProfileImg,
  UpdateUser,
  UpdateUserState,
  RemoveUser,
  signupWithGoogle,
  signinWithGoogle
} = require("../controllers/User_controller");

// TODO: User
router.get("/user", getUsers);
router.get("/userByid/:id", getUsersByid);
router.post("/signup", postUsers);
router.post("/signin", compreUsers);
router.post("/signupWithGoogle", signupWithGoogle); 
router.post("/signinWithGoogle", signinWithGoogle); 

// router.post("/signupWithGoogle", signupwhitGoogle); 
// router.post("/upload", upload,userController.postimg);
router.get("/getImage", getimg);

router.put("/change-password/:id", changePassword);
router.put("/change-profileImg/:user_id", uploadfile, UpdateProfileImg);
router.put("/change-user/:user_id", UpdateUser);

router.put("/users/:userId/status", UpdateUserState);


router.delete('/users/:userId',RemoveUser)

module.exports = router;
