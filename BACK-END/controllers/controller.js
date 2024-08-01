const pool =require('../config/db')
// const queire = require('../Models/queries');

//*****select * ชอกหาทังหมดใน ดาตาเบส */
const getStudents = async (req, res) => {
   pool.query(queire.getstudents,(err,results) =>{
    if(err) throw err;
    res.status(200).json(results.rows);
   })
  };


  
  // select * where คึอกานชอกหาด้วย id
const getStudentById =(req,res)=>{ 
  pool.query(queire.getstudentsById,[id],(err,results) =>{
    if(err) throw err;
    res.status(200).json(results.rows)
   
  })
} 
//*** add insert into table..เราต้อง set column ตามอยุ่ในตาตะล้างกอนว่าจะ insert คอลำใด ก่อน */
const addstudents = (req, res) => {
  const { name, email, age, dob } = req.body;
  // check if email exists
  pool.query(queire.checkEmailExists, [email], (err, rs) => {
    if (rs.rows.length) {
      res.status(400).send("Email already exists.");
      return; // เพิ่ม return เพื่อหยุดการทำงานของฟังก์ชันที่นี่
    }

    // หาก email ไม่ซ้ำ ทำการ insert ข้อมูล
    pool.query(
      queire.addstudent,
      [name, email, age, dob],
      (err, rs) => {
        if (err) {
          res.status(500).send("Query error");
          return; // เพิ่ม return เพื่อหยุดการทำงานของฟังก์ชันที่นี่
        } else {
          res.status(201).send("Student created successfully!");
          return; // เพิ่ม return เพื่อหยุดการทำงานของฟังก์ชันที่นี่
        }
      }
    );
  });
};

const removeStudents = (req, res) => {
  const id = parseInt(req.params.id);

  //ดึงข้อมูลทั้งหมดจาก id 
  pool.query(queire.getstudentsById, [id], (err, rs) => {
    //เอามาเช็กเพื่อดูว่ามีหรือไม่ก่อนจะลบต้องเช็กข้อมูลก่อน
    const noStudentFound = !rs.rows.length;
    if (noStudentFound) {
      res.status(404).send("Student is not exists in the database ");
      return;
    }

    // หากมีนักเรียน ทำการลบข้อมูล
    pool.query(queire.romoveStudent, [id], (err, rs) => {
      if (err) {
        res.status(500).send("Delete Error");
        return;
      } else {
        res.status(200).send("Delete Successful");
        return;
      }
    });
  });
};

// Update
const updateStudents=(req,res)=>{
  const id = parseInt(req.params.id);
  const {name}= req.body;
  pool.query(queire.getstudentsById,[id],(err,rs)=>{
    const noStudentFound = !rs.rows.length;
    if (noStudentFound) {
      res.status(404).send("Student is not exists in the database ");
      return;
    }
    pool.query(queire.updateStudent,[name,id],(err,rs)=>{
      if(err){
        res.status(404).send("update error ")
       return
      }else{
        res.status(200).send("update data successfully")
        return
      }
    });
  });
}



module.exports ={getStudents, getStudentById,addstudents,removeStudents,updateStudents};