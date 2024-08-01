
const Contact = require("../Query/contact_Qry");
const pool = require("../config/config_db");

exports.Insert = async(req,res) =>{
    try {
        console.log(req.body);
        const {name, phone,email,adress} = req.body;
        await pool.query(Contact.Insert,[name, phone,email,adress])
        .then((response) => {
           
            console.log("success", response.rows);
            return res.status(200).json({ message: "Insert successful" });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: "Failed to comment" });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
}


exports.GetData = async (req, res) => {
    try {
      const results = await pool.query(Contact.Getdata);
      res.json(results.rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Get contacts error' });
    }
  };


