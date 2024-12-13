const mysql = require('mysql2/promise');
require('dotenv').config(); 

const sapMasterInc = mysql.createPool({
  host: process.env.SAP_MASTER_INC_HOST,
  port: process.env.SAP_MASTER_INC_PORT,
  user: process.env.SAP_MASTER_INC_USER,
  password: process.env.SAP_MASTER_INC_PASSWORD,
  database: process.env.SAP_MASTER_INC_DB,
});

const timeTableMetadat =mysql.createPool( {
  host: process.env.TIMETABLE_HOST,
  port: process.env.TIMETABLE_PORT, 
  user: process.env.TIMETABLE_USER,
  password: process.env.TIMETABLE_PASSWORD,
  database: process.env.TIMETABLE_DB
})

const asmsco = mysql.createPool({
  host: process.env.ASMSOC_HOST,
  port: process.env.ASMSOC_PORT, 
  user: process.env.ASMSOC_USER,
  password: process.env.ASMSOC_PASSWORD,
  database: process.env.ASMSOC_DB
})

module.exports = {
  sapMasterInc,
  timeTableMetadat,
  asmsco
};
