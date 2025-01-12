const User = require("../models/user");
const BorrowedBooks = require("../models/borrowedBooks");
const Book = require("../models/books")

exports.viewAllUsers = async(req,res)=>{
    try{
        const result = await User.find().populate('borrowed', 'dateIssued dueDate returnDate');
        res.json(result);
    } catch (err){
        res.json({message:err.message});
    }
}

exports.addBooksBorrowed = async(req,res)=>{
    try{
        const id = req.params.id;
        const {borrowed} = req.body;
        const user = await User.findById({_id:id});
        if(!user)
            return res.status(400).json({message: "Requested user doesn't exist"})
        const borrowedBooks = await BorrowedBooks.find();
        for(let i=0;i<borrowed.length;i++){
            const checkBorrowed = await BorrowedBooks.findOne({book_id: borrowed[i]})
            if(!!checkBorrowed){
                return res.status(400).json({message:"Requested book has already been issued to another user"})
            }
            const borrowUpdate = await User.findOneAndUpdate({_id:id}, {$addToSet: {borrowed: borrowed[i] }}, {new:true})
            const assignedToUpdate = await Book.findOneAndUpdate({_id:borrowed[i]}, {assignedTo: id }, {new:true})
        }
        res.json(result);
    } catch (err){
        res.status(500).json({message:err.message});
    }
}

exports.borrowedBookReturn = async(req,res) =>{
    try{
        const id = req.params.id;
        const {returned} = req.body;
        const user = await User.findById({_id:id});
        if(!user)
            return res.status(400).json({message: "Requested user doesn't exist"})
        const borrowedBooks = await BorrowedBooks.find();
        for(let i=0;i<returned.length;i++){
            const checkBorrowed = await BorrowedBooks.findOne({book_id: returned[i]})
            if(!checkBorrowed){
                return res.status(400).json({message:"Requested book hasn't been issued to user"})
            }
            const borrowUpdate = await User.findOneAndDelete({_id:id}, {$addToSet: {borrowed: returned[i] }}, {new:true})
            const assignedToUpdate = await Book.findOneAndDelete({_id:returned[i]}, {assignedTo: id }, {new:true})
        }
        res.json(result);
    } catch (err){
        res.status(500).json({message:err.message});
    }
}

exports.deleteUser = async(req,res)=>{
    try{
        const id = req.params.id
        const result = await User.findByIdAndDelete(id);
        res.json(result);
    } catch (err){
        res.json({message:err.message});
    }
}