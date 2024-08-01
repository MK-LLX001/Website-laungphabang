const Insert = `INSERT INTO tb_contact (contact_name, contact_phone, contact_email, contact_address) VALUES ($1, $2, $3, $4)`;
const Getdata = `SELECT * FROM tb_contact`;

module.exports = { Insert, Getdata };
