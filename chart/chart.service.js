const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const getDataService = async () => {
    try {
        const excelFilePath = path.resolve(__dirname, './excelFileChart.xlsx');
        if (fs.existsSync(excelFilePath)) {
            console.log('File exists!');
        } else {
            console.error('File not found:', excelFilePath);
        }

        // Read the Excel file
        const workbook = XLSX.readFile(excelFilePath);

        // Assume the data is in the first sheet (you can modify as needed)
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Rename the "Primary product" column to "primaryProduct"
        const renamedData = jsonData.map((row) => {
            // Assuming "Primary product" is a key in each row
            if (row['Primary product']) {
            row['primaryProduct'] = row['Primary product'];
            delete row['Primary product'];
            }
            if (row['Secondary product']) {
                row['secondaryProduct'] = row['Secondary product'];
                delete row['Secondary product'];
            }
            return row;
        });
        return {
            status: 200,
            message: 'All Data',
            data: renamedData,
            error: '',
          };
    } catch (error) {
        return {
            status: 500,
            message: '',
            data: "",
            error: error,
          };
    }
    
}

module.exports = {
    getDataService
}