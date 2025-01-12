const Books = require("../models/books")

exports.addBook = async(req,res)=>{
    try {
        const book = new Books(req.body)
        const result = await book.save();
        res.json(result)
    } catch(err) {
        console.error(err.message);
        res.json({message: err.message})
    }
}

exports.viewBooks = async(req,res)=>{
    try{
        const results = await Books.find().populate('assignedTo', 'name email -_id');
        res.json(results);
    } catch(err) {
        res.json({message: err.message});
    }
}

exports.viewBookById = async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await Books.find({_id: id});
        res.json(result);
    } catch(err) {
        res.json({message: err.message});
    }
}

exports.editByTitle = async(req,res)=>{
    try {
        const { title, author, published, genre, price} = req.body
        const results = await Books.findOneAndUpdate({title: req.params.title}, {title: title, author, published, genre, price }, {required:true})
        res.json(results);
    } catch(err) {
        res.json({message: err.message});
    }
}

exports.deleteByTitle = async(req,res)=>{
    try{
        const results = await Books.findOneAndDelete({title: req.params.title});
        res.json(results);
    } catch(err) {
        res.json({message: err.message});
    }
}

exports.searchByGenre = async(req,res)=>{
    try{
        const results = await Books.find({genre: req.params.genre});
        res.json(results);
    } catch(err) {
        res.json({message: err.message});
    }
}