// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
     
//       cb(null, './upload')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null,'LPB'+ uniqueSuffix +file.originalname )
//     }
//   })
  

// exports.upload = multer({ storage}).single('file');