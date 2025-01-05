const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title : {type: String, required: true},
    author : {type: String, required: true},
    publishedDate : {type: Date},
    genre : {type: String},
    price : {type: Number, required: true, min:0},
    assignedTo: {type: [mongoose.Schema.Types.ObjectId], ref: "User"}
})

module.exports = mongoose.model("Books", BookSchema);