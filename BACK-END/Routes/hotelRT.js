
const { Router } = require('express');
const router = Router();
// const { upload } = require("../Middleware/upload")
const  { Read,ReadById, Insert, Update, Remove,uploadfile,ReadHotelWithAvg_Score,GetHotelsByUserId,GetHotelAllByUserId } = require("../controllers/hotelller"); 

// TODO: Category 
router.get("/hotel", Read); // แก้ไขตรงนี้
router.get('/hotel/:id',ReadById)
router.post("/hotel",uploadfile, Insert);
router.put("/hotel/:id",uploadfile, Update);
router.delete("/hotel/:id", Remove);


router.get('/hotelwithavg_score',ReadHotelWithAvg_Score)
router.get('/hotelsbyUserId/:id',GetHotelsByUserId)

router.post('/gethotelallbyUserId',GetHotelAllByUserId)




module.exports = router;
