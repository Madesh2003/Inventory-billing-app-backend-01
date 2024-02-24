const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { dbconnect } = require("./db.config");
const cors = require("cors")


const app = express();

require('dotenv').config();


const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use(cors());

dbconnect();


app.use('/api',require('./Controllers/AuthenticationControllers'));
app.use('/api',require('./Controllers/InvoiceControllers'));



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
