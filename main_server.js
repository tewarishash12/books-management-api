const express = require('express');
const dotenv = require('dotenv');
const {} = require('./database');
const app = express();
const {authLogin,authAdmin} = require("./middleware/authMiddleware")
const bookRoutes = require('./main_routes/bookRoutes')
const userRoutes = require('./main_routes/bookUserRoutes')
const borrowedBooksRoutes = require('./main_routes/borrowedBooksRoutes')
const authorRoutes = require('./main_routes/authorRoutes')
dotenv.config();

//middlewares
app.use(express.json());

app.use("/books", authLogin, bookRoutes);
app.use("/users", authLogin, userRoutes);
app.use("/borrowed", authLogin, authAdmin, borrowedBooksRoutes); 
app.use("/authors", authorRoutes);

app.get("/", (req,res)=>{
    res.json({message: "Hello there"});
})

app.listen(process.env.MAIN_PORT, ()=>{
    console.log("Connected to main server", `http://localhost:${process.env.MAIN_PORT}/`);
})