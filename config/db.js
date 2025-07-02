const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path")
dotenv.config({ path: path.resolve(__dirname,".env")});

const Db = process.env.DB_URL;
console.log({DB_URL:Db});

const connectionDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {})
        console.log("connected to mongodb")
    } catch (error) {
        console.error("Error conntecting to Mongodb:",error.message)
    }
}
module.exports = connectionDb;