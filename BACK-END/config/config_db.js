const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"Website-LPB",
    password:"001",
    port:"5432"
});

// Function to check the database connection status กอบทังหมดไปว่างไวไฟที่ต้องกาน test
// function testDatabaseConnection() {
//     pool.connect((err, client, release) => {
//         if (err) {
//             console.error('Error connecting to the database:', err);
//             return;
//         }
//         console.log('Connected to the database!');
//         release();
//     });
// }

// // Call the function to test the database connection
// testDatabaseConnection();

module.exports = pool ;