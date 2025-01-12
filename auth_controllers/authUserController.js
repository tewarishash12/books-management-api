const User = require("../models/user");
const BorrowedBooks = require("../models/borrowedBooks")
const Books = require("../models/books")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let refresh_tokens = new Set();

exports.register = async(req,res)=> {
    try{
        const { name,email,role,password,borrowed } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = new User({ name,email,role,password:hashedPassword,borrowed });
        const result = await user.save();
        
        res.json({message: "User has been created successfully"});
    } catch (err){
        res.json({message:err.message});
    }
}

exports.token = (req, res) => {
    const refresh_token = req.body.token;
    if (!refresh_token) return res.status(401).json({ message: "Unauthorized" });
    if (!refresh_tokens.has(refresh_token)) return res.status(403).json({ message: "Forbidden" });

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, data) => {
        if (err) return res.status(403).json({ message: "Forbidden", error: err.message });
        const token = generateAccessToken({ user: data.user });
        res.json({ token });
    });
}

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email});

        if(!user)
            return res.status(400).json({message: "User with this mail is not present"});
        
        const passwordCheck = bcrypt.compare(password,user.password)
        
        if(!passwordCheck)
            return res.status(400).json({message: "User entered wrong password"});

        const data = {user};
        const token = generateAccessToken(data);

        const refresh_token = jwt.sign(data, process.env.REFRESH_TOKEN);
        refresh_tokens.add(refresh_token);

        return res.json({token:token, refresh_token:refresh_token})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

function generateAccessToken(info){
    return jwt.sign(info, process.env.ACCESS_TOKEN)
}