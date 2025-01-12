const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    role: {type:String, enum:['admin','user'], default:'user', required:true},
    password:{type:String, required:true},
    borrowed: { type: [mongoose.Schema.Types.ObjectId], ref: "BorrowedBooks", default: [] }
})

UserSchema.post('save', async function (user) {
    try {
        const BorrowedBooks = mongoose.model("BorrowedBooks");
        const Book = mongoose.model("Books");
        const records = user.borrowed;

        for (let i = 0; i < records.length; i++) {
            const book = await BorrowedBooks.findOne({ book_id: records[i] });

            if (book) {
                console.error("The book is already taken")
                continue;
            };

            const borrowedBook = new BorrowedBooks({
                book_id: records[i],
                dateIssued: new Date(Date.now()).toISOString().split('T')[0],
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            })
            await borrowedBook.save();
            const updateBook = await Book.findOneAndUpdate({_id:records[i]}, {$addToSet :{assignedTo: user._id}});
        }
    } catch (err) {
        console.error(err);
    }
})

module.exports = mongoose.model("User", UserSchema)