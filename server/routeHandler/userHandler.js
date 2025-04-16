const express = require("express")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = require("../schmas/userSchma");
const router = express.Router();
const User =new mongoose.model("user", userSchema)

// sign up
router.post("/signup", async (req, res) => {
    try {
        const hashedPassword =await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name : req.body.name,
            username : req.body.username,
            email: req.body.email,
            password : hashedPassword
        });
        const result = await newUser.save();
        console.log(result);
        res.status(200).json({
             message : "sign up success",
             data : result
    })
   } catch (error) {
       console.error(error)
       res.status(500).json({
           message : "sign up failed !!!"
       })
   }
})


// export
module.exports = router