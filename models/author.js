const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name: {type: String, required:true},
    dob: {type: Date},
    nationality: {type: String},
    books: {type: [mongoose.Schema.Types.ObjectId], ref:"Books", default:[]}
})

module.exports = mongoose.model("Author",AuthorSchema);