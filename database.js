const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const mongodb_uri = process.env.MONGO_URI;

async function mongoConnect(){
    try{
        await mongoose.connect(mongodb_uri);
        console.log("Connected to database");
    } catch(err) {
        console.error(err)
    }
}

mongoConnect();

module.exports = {}