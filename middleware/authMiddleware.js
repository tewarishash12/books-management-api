const jwt = require("jsonwebtoken");
require('dotenv').config();

function authLogin(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token)
        return res.status(401).json({message: "Token doesn't exist"})

    jwt.verify(token, process.env.ACCESS_TOKEN, (err,data)=>{
        if(err) return res.status(403).json({ message: "Forbidden", error: err.message });

        req.user = data.user;
        next();
    })
} 

function authAdmin(req,res,next){
    if(!(req.user.role==='admin'))
        res.status(400).json({message:"Unauthorized to access"});
    next();
}

module.exports = {authLogin,authAdmin}