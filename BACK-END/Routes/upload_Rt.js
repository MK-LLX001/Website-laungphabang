// routes.js
const { upload } = require("../Middleware/upload")
const { Router } = require('express');
const router = Router();
const  { Read,ReadDefault, ReadById, Insert, Update, Remove,LikePost, Readtrending,ReadByIdByUser ,ReadByIdToUpload ,Notifications ,GetDataByIdUser, UpdateState} = require("../controllers/upload_ller"); 
 

// TODO: Category 
router.get("/Uploading", Read); // แก้ไขตรงนี้

router.get("/Uploading-default", ReadDefault); // แก้ไขตรงนี้
router.get("/Uploadtrending", Readtrending); // แก้ไขตรงนี้
router.get('/Uploading-Update/:id', ReadByIdToUpload); //
router.get('/Uploading/:id', ReadById)

router.get('/UploadingUser/:id', ReadByIdByUser);


router.post("/Uploading",upload, Insert);
router.put("/Uploading/:id",upload,Update);
router.post("/like", LikePost);
router.delete("/Uploading/:id",upload,Remove);

router.get('/notificatioon/:id',Notifications)

router.post('/UploadingUser', GetDataByIdUser);

router.put("/upload/:id/state", UpdateState);


module.exports = router;
