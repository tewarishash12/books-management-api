const mongoose = require("mongoose");

const BorrowedBookSchema = new mongoose.Schema({
    book_id: {type: mongoose.Schema.Types.ObjectId, ref:"Books", required:true},
    dateIssued: {type: Date },
    dueDate: {type: Date},
    returnDate: {type: Date},
})


// BorrowedBookSchema.pre('save', function(next){
//     if(this.availability===true){
//         this.dateIssued = '';
//         this.dueDate = '';
//         this.returnDate = '';
//     } else{
//         this.dateIssued = new Date(Date.now()).toISOString().split('T')[0];
//         this.dueDate = new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0];
//     }
//     next();
// })

module.exports = mongoose.model("BorrowedBooks", BorrowedBookSchema);