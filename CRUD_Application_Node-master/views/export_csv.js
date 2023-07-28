
// // Import required modules
// const express = require('express');
// const axios = require('axios');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// // Create an instance of the Express app
// const app = express();

// // Define a route for the home page
// app.get('/', (req, res) => {
//     // Make a get request to /api/users
//     axios.get('http://localhost:3000/api/users')
//         .then(function (response) {
//             // Assuming response.data is an array of user objects
//             const users = response.data;

//             // Export the data to a CSV file
//             const csvWriter = createCsvWriter({
//                 path: 'users.csv',
//                 header: [
//                     { id: 'id', title: 'ID' },
//                     { id: 'name', title: 'Name' },
//                     { id: 'email', title: 'Email' },
//                     // Add more columns as needed based on your user data structure
//                 ]
//             });

//             csvWriter.writeRecords(users)
//                 .then(() => {
//                     console.log('CSV file has been created successfully!');
//                 })
//                 .catch((error) => {
//                     console.error('Error writing CSV:', error);
//                 });

//             res.render('index', { users: users });
//         })
//         .catch(err => {
//             res.send(err);
//         });
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


// *8***********************************8*


// Import required modules
const express = require('express');
const axios = require('axios');
const { Parser } = require('json2csv');

// Create an instance of the Express app
const app = express();

// Define a route for the home page
app.get('/', (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function (response) {
            // Assuming response.data is an array of user objects
            const users = response.data;

            // Define the fields for CSV formatting
            const fields = ['id', 'name', 'email'];
            const json2csvParser = new Parser({ fields });
            const csvData = json2csvParser.parse(users);

            // Set the response headers for CSV download
            res.setHeader('Content-disposition', 'attachment; filename=users.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        })
        .catch(err => {
            res.send(err);
        });
});

// Start the server
// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
