const { Router } = require("express");
const router = Router();
const {
  Read,
  ReadById,
  Insert,
  Update,
  Remove,
  uploadfile,
  GetRestaurantWithAvg_score,
  GetRestaurantByUserId,
  GetRestaurantAllByIdUser,
  UpdateState,
} = require("../controllers/Restaurantcontro");

// TODO: Category
router.get("/restaurant", Read); // แก้ไขตรงนี้
router.get("/restaurant/:id", ReadById);
router.post("/restaurant", uploadfile, Insert);
router.put("/restaurant/:id", uploadfile, Update);
router.delete("/restaurant/:id", Remove);

router.get("/getRestaurantWithAvg_score", GetRestaurantWithAvg_score); // แก้ไขตรงนี้

router.get("/restaurantbyUserId/:id", GetRestaurantByUserId); // แก้ไขตรงนี้

router.post("/restaurantallbyUserId", GetRestaurantAllByIdUser);

router.put("/restaurant/:id/state", UpdateState);

module.exports = router;
