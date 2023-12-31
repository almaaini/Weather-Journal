// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;
const server = app.listen(port, listening);

function listening() {
  console.log(`Server is running on localhost:${port}`);
}

 
app.get('/get', (req, res) => {
  res.send(projectData);
});

 
app.post('/add', (req, res) => {
  const newData = req.body;
  
  projectData = {
    temperature: newData.temperature,
    date: newData.date,
    userResponse: newData.userResponse,
  };
   
  res.send(projectData);
});
