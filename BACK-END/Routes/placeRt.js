const { Router } = require("express");
const router = Router();
// const { upload } = require("../Middleware/upload")
const {
  Read,
  Reports,
  ReadById,
  Readplace,
  Insert,
  Update,
  Remove,
  uploadfile,
  ReadplacesWithAvg_Score,
  GetplaceAvg_Score5_4,
  getdatdata_allpales,
} = require("../controllers/placeller");

// TODO: Category
router.get("/place", Read);
router.get("/placeIN", Readplace);
router.get("/place/:id", ReadById);
router.post("/place", uploadfile, Insert);
router.put("/place/:id", uploadfile, Update);
router.delete("/place/:id", Remove);
router.get("/placeWithAvg_Score", ReadplacesWithAvg_Score);
router.get("/placeAvg_ScoreFive_four", GetplaceAvg_Score5_4);

router.get("/getdatdata_allpales", getdatdata_allpales);

router.get("/Reports", Reports);

module.exports = router;
