
const { Router } = require('express');
const router = Router();
// const { upload } = require("../Middleware/upload")
const  { Read,ReadById, Insert, Update, Remove,uploadfile } = require("../controllers/Activitycontro"); 

// TODO: Category 
router.get("/activity", Read); // แก้ไขตรงนี้
router.get('/activity/:id',ReadById)
router.post("/activity",uploadfile, Insert);
router.put("/activity/:id",uploadfile, Update);
router.delete("/activity/:id", Remove);


module.exports = router;
