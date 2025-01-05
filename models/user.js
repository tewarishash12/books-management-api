const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {type: String },
    email :{type:String, required:true, unique:true},
    borrowedBooks: {type: [mongoose.Schema.Types.ObjectId], ref:"BorrowedBookSchema", default:[]}
})

module.exports = mongoose.model("User", UserSchema)