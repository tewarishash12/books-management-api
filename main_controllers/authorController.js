const Author = require("../models/author");

exports.addAuthor = async(req,res)=>{
    try {
        const { name,dob,nationality,books } = req.body;
        const result = await Author.create({ name,dob:dob.split('T'),nationality,books });
        res.json(result);
    } catch(err) {
        res.json({message: err.message})
    }
}

exports.allAuthors = async(req,res)=>{
    try {
        const result = await Author.find().populate('books', "title publishedDate genre price -_id");
        res.json(result);
    } catch(err) {
        res.json({message: err.message})
    }
}

exports.authorById = async(req,res)=>{
    try {
        const id = req.params.id;
        const result = await Author.find({_id: id}).populate('books', "title publishedDate genre price -_id");
        res.json(result);
    } catch(err) {
        res.json({message: err.message})
    }
}

exports.updateAuthor = async(req,res)=>{
    try {
        const book_id = req.body;
        const result = await Author.findByIdAndUpdate(req.params.id,{ $push: { books: book_id } }, { new: true });
        res.json(result);
    } catch(err) {
        res.json({message: err.message})
    }
}