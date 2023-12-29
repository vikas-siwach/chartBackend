const dotenv = require('dotenv');
dotenv.config();

const {getDataService} = require('./chart.service')

const getData = async(req, res) => {

    let jsonData = await getDataService()

    // Log the JSON data
    console.log(jsonData);
    res.status(jsonData.status).json(jsonData)
}

const uploadFile = async (req, res) => {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Read Excel file from memory buffer
      const buffer = req.file.buffer;
      const workbook = xlsx.read(buffer, { type: 'buffer' });
  
      // Assuming there is only one sheet in the Excel file
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      // Parse sheet data to JSON
      const jsonData = xlsx.utils.sheet_to_json(sheet);

    //   let response = await uploadDate(jsonData);
  
      // Respond with the parsed data
      res.json({ data: jsonData });
    } catch (error) {
      console.error('Error processing the uploaded file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    uploadFile,
    getData
}