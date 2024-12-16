const { sapMasterInc } = require('../config/dbConfig');
const mysql = require('mysql2/promise');
const { countInLMS } = require('./attendenceModel');

const fetchDynamicData = async (tableName, fromDate, toDate) => {
  try {
    const query = `
      SELECT input_json 
      FROM ${tableName} 
      WHERE DATE(created_on) BETWEEN '${fromDate}' AND '${toDate}' ;
    `;
    const result = await sapMasterInc.query(query);

    console.log(`Model Data from ${tableName}:`, result);
      
      return result[0];
      
  } catch (error) {
    console.error('Error fetching data from MySQL:', error.message);
    throw error;
  }
};

module.exports = {
  fetchDynamicData,
};



