const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}


// ****************************************


const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const axios = require('axios');

exports.export_csv = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function (response2) {
            // Assuming response.data is an array of user objects
            const users = response2.data;

            // Export the data to a CSV file
            const csvWriter = createCsvWriter({
                path: 'users.csv',
                header: [
                    // { id: '_id', title: 'ID' },
                    { id: 'name', title: 'Name' },
                    { id: 'email', title: 'Email' },
                    { id: 'gender', title: 'Gender' },
                    { id: 'status', title: 'Status' },
                    // Add more columns as needed based on your user data structure
                ]
            });

            csvWriter.writeRecords(users)
                .then(() => {
                    console.log('CSV file has been created successfully!');
                })
                .catch((error) => {
                    console.error('Error writing CSV:', error);
                });

            res.render('index', { users: users });
        })
        .catch(err => {
            res.send(err);
        });
}
