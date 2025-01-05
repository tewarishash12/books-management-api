const mongoose = require("mongoose");
const Author = require("./author");

const BookSchema = new mongoose.Schema({
    title : {type: String, required: true},
    author : {type: String, required: true},
    publishedDate : {type: Date},   
    genre : {type: String},
    price : {type: Number, required: true, min:0},
    assignedTo: {type: [mongoose.Schema.Types.ObjectId], ref: "User"}
})

BookSchema.post('save', async function(book){
    try{
        const Author = mongoose.model("Author");
        let author = await Author.findOne({name: book.author});
        if(!author){
            author = new Author({ name: book.author, books:book._id })
            await author.save();
        } else {
            await Author.findOneAndUpdate({name: book.author}, {$addToSet: {books: book._id}}, {new:true})
        }
        console.log("Book is added to author", book);
    } catch(err) {
        console.error("Error here", err.message)
    }
})

module.exports = mongoose.model("Books", BookSchema);