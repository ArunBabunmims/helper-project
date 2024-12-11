const mysql = require('mysql2/promise');
const { Pool } = require('pg');

const usermgmt = mysql.createPool({
  host: 'localhost',
  port: '3306', 
  user: 'root',
  password: 'root',
  database: 'sap_master_inc'
});


module.exports = {
  usermgmt
};
