const express = require("express");
const Books = require("../models/books")
const router = express.Router();

router.post("/", async(req,res)=>{
    try {
        const result = await Books.insertMany(req.body);
        res.json(result)
    } catch(err) {
        console.error(err.message);
        res.json({message: err.message})
    }
})

router.get("/", async(req,res)=>{
    try{
        const results = await Books.find();
        res.json(results);
    } catch(err) {
        res.json({message: err.message});
    }
})

router.put('/:title', async(req,res)=>{
    try {
        const { title, author, published, genre, price} = req.body
        const results = await Books.findOneAndUpdate({title: req.params.title}, {title: title, author, published, genre, price }, {required:true})
        res.json(results);
    } catch(err) {
        res.json({message: err.message});
    }
})

router.delete("/:title", async(req,res)=>{
    try{
        const results = await Books.findOneAndDelete({title: req.params.title});
        res.json(results);
    } catch(err) {
        res.json({message: err.message});
    }
})

router.get("/genre/:genre", async(req,res)=>{
    try{
        const results = await Books.find({genre: req.params.genre});
        res.json(results);
    } catch(err) {
        res.json({message: err.message});
    }
})

module.exports = router