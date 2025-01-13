const mongoose = require("mongoose");

const BorrowedBookSchema = new mongoose.Schema({
    book_id: {type: mongoose.Schema.Types.ObjectId, ref:"Books", required:true},
    dateIssued: {type: Date},
    dueDate: {type: Date},
    returnDate: {type: Date},
})

module.exports = mongoose.model("BorrowedBooks", BorrowedBookSchema);