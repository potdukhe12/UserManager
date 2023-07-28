const axios = require('axios');
const { parseAsync } = require('json2csv');
const fs = require('fs');

function export_csv_2() {

const apiUrl = 'http://localhost:3000/api/users';
const csvFilePath = 'users.csv';

axios.get(apiUrl)
  .then(response => {
    const jsonData = response.data;

    // Assuming the JSON data is an array of objects with uniform keys
    if (jsonData.length > 0) {
      // Extract the keys from the first object to use as CSV headers
      const csvHeaders = Object.keys(jsonData[0]);

      // Convert JSON to CSV
      parseAsync(jsonData, { fields: csvHeaders })
        .then(csv => {
          // Save CSV data to a file
          fs.writeFile(csvFilePath, csv, err => {
            if (err) {
              console.error('Error writing CSV file:', err);
            } else {
              console.log(`CSV file saved as ${csvFilePath}`);
            }
          });
        })
        .catch(err => {
          console.error('Error converting JSON to CSV:', err);
        });
    } else {
      console.error('No data retrieved from the API.');
    }
  })
  .catch(error => {
    console.error('Error fetching data from the API:', error);
  });
}

module.exports = { export_csv_2 };