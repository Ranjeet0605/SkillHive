 const app = require("./app")
const connectionDb = require("./config/db");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" })

connectionDb();
app.listen(5000, () => console.log("server is running !"));
