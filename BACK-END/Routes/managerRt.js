// routes.js

const { Router } = require('express');
const router = Router();
const  { Read,ReadById, Insert, Update, Remove, } = require("../controllers/manager_ller"); 
 

// TODO: Category 
router.get("/manager", Read); // แก้ไขตรงนี้
router.get('/manager/:id', ReadById)
router.post("/manager", Insert);
router.put("/manager/:id", Update);
router.delete("/manager/:id", Remove);


module.exports = router;
