const Comment = require("../Query/Comment_Qry");

const pool = require("../config/config_db");

exports.Insert = async (req, res) => {
  try {
    // console.log(req.body);
    const { comment, user_id, up_id, parent_id = null } = req.body;
    console.log("comment:" + comment + " user:" + user_id + " up:" + up_id + " parent:" + parent_id);

    await pool
      .query(Comment.Insert, [comment, user_id, up_id, parent_id])
      .then((result) => {
        // console.log(result); // return the result of the query.
        return res.json({ message: "Comment  successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.json({ error: "Failed to comment" });
      });
  } catch (error) {
    console.log(error);
  }
};

exports.postReply = async (req,res) => {
  try {
    // console.log(req.body);
    const { comment, user_id, up_id,parent_id } = req.body;
    console.log("comment:" + comment+"user"+user_id+" up"+ up_id + " parent"+parent_id);
    await pool
      .query(Comment.InsertReply, [comment, user_id, up_id, parent_id])
      .then((result) => {
        console.log(result); // return the result of the query.
        return res.json({ message: "Comment  successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.json({ error: "Failed to comment" });
      });
  } catch (error) {
    console.error('Error posting reply:', error);
  }
};

exports.GetCommentByUp = async (req, res) => {

  try {
   
      const { id } = req.body;
    console.log("up_id:" + id);
    await pool.query(Comment.GetComments,[id])
    .then((comments) => {
      res.json(comments.rows);
    })
    .catch((error) => {
      console.log(error);
      return res.json({ error: "server  error ດືງຂໍ້ມູນຜິດຜາດ" });
    });

  } catch (error) {
    console.log(error);
    return res.json({ error: "server  error ມີຂໍ້ຜິດຜາດ" });
  }

};




exports.GetCommentReply = async (req, res) => {

  try {
   
      const { cm_id } = req.body;
    console.log("parent_id:" + cm_id);
    await pool.query(Comment.GetReplies,[cm_id])
    .then((comments) => {
      res.json(comments.rows);
    })
    .catch((error) => {
      console.log(error);
      return res.json({ error: "server  error ດືງຂໍ້ມູນຜິດຜາດ" });
    });

  } catch (error) {
    console.log(error);
    return res.json({ error: "server  error ມີຂໍ້ຜິດຜາດ" });
  }



};

// Get root comments and their direct replies
exports.GetCommentByUp = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("up_id:" + id);

    const rootComments = await pool.query(`
      SELECT 
        c.cm_id,
        c.comments,
        c.user_id,
        c.up_id,
        c.time,
        u.user_name,
        u.user_lastname,
        u.user_profile_img
      FROM tb_comments c
      JOIN tb_users u ON c.user_id = u.user_id
      WHERE c.up_id = $1 AND c.parent_id IS NULL
      ORDER BY c.time ASC;
    `, [id]);

    res.json(rootComments.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.GetCommentReply = async (req, res) => {
  try {
    const { cm_id } = req.body;
    console.log("parent_id root--comment :" + cm_id);

    const replies = await pool.query(`
      SELECT 
        c.cm_id,
        c.comments,
        c.user_id,
        c.up_id,
        c.time,
        c.parent_id,
        u.user_name,
        u.user_lastname,
        u.user_profile_img
      FROM tb_comments c
      JOIN tb_users u ON c.user_id = u.user_id
      WHERE c.parent_id = $1
      ORDER BY c.time ASC;
    `, [cm_id]);

    res.json(replies.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


