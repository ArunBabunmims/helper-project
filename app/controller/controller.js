const axios = require('axios');
const { fetchDynamicData } = require('../model/model');

const postgresAPI = {
  course: 'https://portal.svkm.ac.in/sap-master/api/subject-bulk',
  program: 'https://portal.svkm.ac.in/sap-master/api/program-master-bulk',
  event: 'https://portal.svkm.ac.in/sap-master/api/event-master-bulk',
};

// Controller function to fetch MySQL data and pass it to PostgreSQL
async function transferDynamicData(req, res, tableName) {
  try {
    const { fromDate, toDate } = req.query;
      console.log('tableName',tableName);
        console.log('fromDate',fromDate);
        console.log('fromDate',fromDate);
    if (!fromDate || !toDate) {
      return res.status(400).send({
        message: 'Please provide both fromDate and toDate.',
      });
    }
      

    const data = await fetchDynamicData(tableName, fromDate, toDate);
    const transformedData = data.map((item) => item.input_json);

    console.log(`Controller Data for ${tableName}:`, JSON.stringify(transformedData));

    const url = postgresAPI[tableName];
    if (!url) {
      return res.status(400).send({
        message: `No URL configured for table: ${tableName}`,
      });
    }

    const response = await axios.post(url, JSON.stringify(transformedData), {
      headers: { 'Content-Type': 'application/json' },
    });

    res.status(200).send({
      message: `${tableName} data transferred successfully!`,
      response: response.data,
    });
  } catch (error) {
    console.error(`Error transferring data for ${tableName}:`, error.message);
    res.status(500).send({
      message: `Error transferring data for ${tableName}`,
      error: error.message,
    });
  }
}



module.exports = {
  transferDynamicData,
};
