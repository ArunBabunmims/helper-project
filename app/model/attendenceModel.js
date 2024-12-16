const { sapMasterInc, asmsco } = require('../config/dbConfig');

const countInLMS = async (courseId, username, date) => {
  try {
    const query = `
      SELECT 
        COUNT(DISTINCT CONCAT(sca.startTime, sca.endTime)) AS lecture_taken_count, 
        cc.moduleName, 
        pc.campusName, 
        CONCAT(uu.firstname, ' ', uu.lastname) AS full_name  
      FROM student_course_attendance sca 
      INNER JOIN course cc ON sca.courseId = cc.id
      INNER JOIN users uu ON uu.username = sca.facultyId
      INNER JOIN program_campus pc ON pc.campusId = cc.campusId
      WHERE sca.courseId = ? AND sca.facultyId = ? AND DATE(sca.createdDate) > '2024-08-24'
      GROUP BY cc.moduleName, pc.campusName, uu.firstname, uu.lastname;
    `;
    
    const [result] = await asmsco.query(query, [courseId, username, date]);

    if (result.length === 0) {
      return {
        lecture_taken_count: '',
        moduleName: '',
        campusName: '',
        full_name: ''
      };
    }

    return result[0];
  } catch (error) {
    console.error('Error fetching data from MySQL:', error.message);
    throw error;
  }
};

module.exports = {
    countInLMS,
};
