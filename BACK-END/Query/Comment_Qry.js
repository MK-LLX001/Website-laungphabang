
const Insert =`INSERT INTO tb_comments (comments, user_id, up_id, parent_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`;


const InsertReply = `insert into tb_comments (comments,user_id,up_id,parent_id) values ($1,$2,$3,$4)`;

const GetComments = `
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
      WHERE c.parent_id IS NULL AND c.up_id = $1
      ORDER BY c.time ASC;
`;

const  GetReplies = `
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
  WHERE c.parent_id  = $1
ORDER BY c.time ASC ;
`;

const GetRepliesAll = `
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
WHERE c.parent_id IS NOT NULL AND c.up_id = $1 `
          

module.exports = { Insert , InsertReply ,GetComments , GetReplies,GetRepliesAll};