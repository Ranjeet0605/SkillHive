const express = require("express");
const app = express();
  
const router = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);


// const connectionDb = require("./config/db");
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config/.env" });
// connectionDb();




module.exports = app;
  