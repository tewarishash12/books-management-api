const Author = require("../models/author");
const router = require("express").Router();

router.post("/addauthor", async(req,res)=>{
    try {
        const { name,dob,nationality,books } = req.body;
        const result = await Author.create({ name,dob,nationality,books });
        res.json(result);
    } catch(err) {
        res.json({message: err.message})
    }
})

router.get("/allauthors", async(req,res)=>{
    try {
        const result = await Author.find().populate('books', "title publishedDate genre price -_id");
        res.json(result);
    } catch(err) {
        res.json({message: err.message})
    }
})

router.patch("/addbooks/:id", async(req,res)=>{
    try {
        const book_id = req.body;
        const result = await Author.findByIdAndUpdate(req.params.id,{ $push: { books: book_id } }, { new: true });
        res.json(result);
    } catch(err) {
        res.json({message: err.message})
    }
})

module.exports = router;
