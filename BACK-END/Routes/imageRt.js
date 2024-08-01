// routes.js

const { Router } = require("express");
const router = Router();
const {
  Read,
  ReadById,
  Insert,
  Update,
  Remove,
  Images,
  GetimgByIdUser,
  GetHotelAndRestauByUserId,
  GetAllItems,
} = require("../controllers/ImagesCll");
// const { upload } = require("../Middleware/upload")
// TODO: Images
router.get("/images", Read); // แก้ไขตรงนี้
router.get("/images/:id", ReadById);
router.post("/images", Images, Insert);

router.put("/images/:id", Images, Update);
router.delete("/images/:id", Remove);

router.post("/imgbyUserId", GetimgByIdUser);
router.post("/GetH_R", GetHotelAndRestauByUserId);

router.get("/GetAllItems", GetAllItems);

module.exports = router;
