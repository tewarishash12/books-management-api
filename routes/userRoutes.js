const User = require("../models/user");
const router = require("express").Router();

router.post("/register", async(req,res)=>{
    try{
        const user = req.body;
        const result = await User.create(user);
        res.json({message: "User has been created successfully"});
    } catch (err){
        res.json({message:err.message});
    }
}) 

router.get("/allusers", async(req,res)=>{
    try{
        const result = await User.find();
        res.json(result);
    } catch (err){
        res.json({message:err.message});
    }
})

router.delete("/deleteuser/:id", async(req,res)=>{
    try{
        const id = req.params.id
        const result = await User.findByIdAndDelete(id);
        res.json(result);
    } catch (err){
        res.json({message:err.message});
    }
})

module.exports = router;