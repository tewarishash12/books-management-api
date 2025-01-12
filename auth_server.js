const express = require('express');
const dotenv = require('dotenv');
const {} = require('./database');
const app = express();

app.use(express.json());
const userRoutes = require('./auth_routes/authUserRoutes')

app.use("/users", userRoutes);


app.listen(process.env.AUTH_PORT, ()=>{
    console.log("Connected to authentication server", `http://localhost:${process.env.AUTH_PORT}/`);
})