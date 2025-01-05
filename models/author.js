const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name: {type: String, required:true},
    dob: {type: Date, required:true},
    nationality: {type: String, required:true},
    Books: {type: [mongoose.Schema.Types.ObjectId], ref:"Books", default:[], required:true}
})

module.exports = mongoose.model("Author",AuthorSchema);

// author has a name, date of birth, nationality, and a list of books they have