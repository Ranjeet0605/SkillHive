 const app = require("./app")
const connectionDb = require("./config/db");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" })

connectionDb();
app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
