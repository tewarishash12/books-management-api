const User = require("../models/user");
const BorrowedBooks = require("../models/borrowedBooks");

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
        const result = await User.findOneAndUpdate({_id:id}, {$addToSet: {borrowed: borrowed }}, {new:true})

        res.json(result);
    } catch (err){
        res.status(500).json({message:err.message});
    }
}

exports.returnBorrowedBook = async(req,res)=>{
    try{
        const id = req.params.id
        const result = await User.findByIdAndDelete(id);
        res.json(result);
    } catch (err){
        res.json({message:err.message});
    }
}