const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const multer = require('multer');
// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {uploadFile, getData} = require('./chart.controller');

router.get('/', asyncHandler(getData))
router.post('/upload', upload.single('excelFile'), asyncHandler(uploadFile))

module.exports = router;