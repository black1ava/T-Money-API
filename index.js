const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

dotenv.config();

const { PORT, URI } = process.env;

mongoose.connect(URI);

mongoose.connection.once("open", function () {
  console.log("Connect to database successfully");
});

routes(app);

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
