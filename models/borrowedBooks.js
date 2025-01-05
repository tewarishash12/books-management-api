const mongoose = require("mongoose");

const BorrowedBookSchema = new mongoose.Schema({
    book_id: {type: mongoose.Schema.Types.ObjectId, ref:"Books", required:true},
    dateIssued: {type: Date, default: new Date(Date.now()).toISOString().split('T')[0] },
    dueDate: {type: Date, default: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]},
    returnDate: {type: Date},
})


module.exports = mongoose.model("BorrowedBookSchema", BorrowedBookSchema);