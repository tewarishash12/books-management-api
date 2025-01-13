const BorrowedBooks = require("../models/borrowedBooks");

exports.viewBorrowedBooks = async(req,res)=>{
    try {
        const results = await BorrowedBooks.find().populate('book_id', 'title author genre price -_id');
        res.status(200).json(results);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
}