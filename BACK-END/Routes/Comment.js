

const { Router } = require('express');
const router = Router();
// const { upload } = require("../Middleware/upload")
const  { Insert,postReply,GetCommentByUp,GetCommentReply,GetCommentsWithReplies } = require("../controllers/Comment_controler"); 

// TODO: Category 

router.post("/commentByid",GetCommentByUp); // แก้ไขตรงนี้

router.post("/commentReplying",GetCommentReply); // แก้ไขตรงนี้
// router.get('/comment/:id',ReadById)
router.post("/comment",Insert);
router.post("/comment-reply",postReply);
// router.put("/comment/:id",Update);
// router.delete("/comment/:id",Remove);



module.exports = router;