const express = require('express');
const dotenv = require('dotenv');
const {} = require('./database');
const app = express();

const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require('./routes/userRoutes')
const borrowedBooksRoutes = require('./routes/borrowedBooksRoutes')
const authorRoutes = require('./routes/authorRoutes')
dotenv.config();

//middlewares
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/user", userRoutes);
app.use("/borrowed", borrowedBooksRoutes); 
app.use("/authors", authorRoutes);

app.get("/", (req,res)=>{
    res.json({message: "Hello there"});
})

app.listen(process.env.PORT, ()=>{
    console.log("Connected to server", "http://localhost:3999/")
})