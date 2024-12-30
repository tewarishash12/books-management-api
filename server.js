const express = require('express');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes')
const {} = require('./database');
const app = express();

dotenv.config();
app.use(express.json());
app.use("/books", bookRoutes);

app.get("/", (req,res)=>{
    res.json({message: "Hello there"});
})

app.listen(process.env.PORT, ()=>{
    console.log("Connected to server", "http://localhost:3999/")
})