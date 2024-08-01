// routes.js

const { Router } = require('express');
const router = Router();
const  { Read,ReadById, Insert, Update, Remove, } = require("../controllers/categoryCtroller"); 
 

// TODO: Category 
router.get("/categories", Read); // แก้ไขตรงนี้
router.get('/categories/:id', ReadById)
router.post("/categories", Insert);
router.put("/categories/:id", Update);
router.delete("/categories/:id", Remove);


module.exports = router;
