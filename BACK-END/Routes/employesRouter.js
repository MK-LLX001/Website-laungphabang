// routes.js

const { Router } = require('express');
const router = Router();
const  { Read,ReadById, Insert, Update, Remove,uploadfile } = require("../controllers/employeecontro"); 
 

// TODO: Category 
router.get("/employees", Read); // แก้ไขตรงนี้
router.get('/employees/:id', ReadById)
// router.post("/employees",Images, Insert);
router.post("/employees",uploadfile, Insert);
router.put("/employees/:id",uploadfile, Update);
router.delete("/employees/:id", Remove);


module.exports = router;
