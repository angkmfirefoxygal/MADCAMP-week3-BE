const express = require('express');
const mongoose = require('./config/db'); // db.js 가져오기
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const routineRoutes = require("./routes/routine");




// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// Route for handling workout routines
app.use("/api", routineRoutes); // Prefix `/api` is added before the route

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// 간단한 API
app.get('/', (req, res) => {
  res.send('Server is running!');
});


app.listen(port, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:3000');
});

