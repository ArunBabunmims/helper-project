const express = require('express');
const { transferDynamicData } = require('../controller/controller');

const router = express.Router();

// Route to transfer subject data
 
router.get('/get-subject-data', (req, res) => transferDynamicData(req, res, 'course'));
router.get('/get-program-data', (req, res) => transferDynamicData(req, res, 'program_master'));
router.get('/get-permanent-faculty-data', (req, res) => transferDynamicData(req, res, 'permanent_faculty'));
router.get('/get-event-data', (req, res) => transferDynamicData(req, res, 'event'));
router.get('/get-student-event-data', (req, res) => transferDynamicData(req, res, 'student_event'));
router.get('/get-vendor-data', (req, res) => transferDynamicData(req, res, 'vendor'));
router.get('/get-organization-data', (req, res) => transferDynamicData(req, res, 'organization'));  
router.get('/get-campus-data', (req, res) => transferDynamicData(req, res, 'campus'));

module.exports = router;
