const xlsx = require('xlsx');
const { countInLMS } = require('../model/attendenceModel.js');
const path = require('path');
const fs = require('fs');

async function readExcelFile(req, res, next) {
    try {
        const filePath = path.join(__dirname, '../files/lectureTimetable.xlsx');
        const workbook = xlsx.readFile(filePath);
        
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        const resultsArray = [];

        for (const row of jsonData) {
            const eventId = row.eventId;
            const programId = row.programId;
            const facultyId = row.facultyId;
            const totalLectureCount = row.total_lecture_count;
            const courseId = `${eventId}${programId}`;

            if (courseId && facultyId) {
                const additionalData = await countInLMS(courseId, facultyId);
                const mergedRow = {
                    ...row,
                    ...additionalData
                };
                console.log("Merged row : ",mergedRow);
                
                resultsArray.push(mergedRow);
            }
        }

        // Create a new workbook and worksheet with the results
        const newWorkbook = xlsx.utils.book_new();
        const newWorksheet = xlsx.utils.json_to_sheet(resultsArray);
        xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Results');

        // Define the output directory and file path
        const outputDir = path.join(__dirname, '../files');
        const outputFilePath = path.join(outputDir, 'AttendenceReport.xlsx');

        // Ensure the directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write the Excel file
        xlsx.writeFile(newWorkbook, outputFilePath);

        res.status(200).json({ message: 'Excel file processed and saved successfully', file: outputFilePath });
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).json({ message: 'Error reading Excel file', error });
    }
}

module.exports = { readExcelFile };
