const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
