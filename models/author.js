const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name: {type: String, required:true},
    dob: {type: Date, required:true},
    nationality: {type: String, required:true},
    books: {type: [mongoose.Schema.Types.ObjectId], ref:"Books", default:[], required:true}
})

module.exports = mongoose.model("Author",AuthorSchema);