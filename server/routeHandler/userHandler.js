const express = require("express")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = require("../schmas/userSchma");
const router = express.Router();
const User =new mongoose.model("user", userSchema)
// const JSON_SECRET_TOKEN = "sfgdgndjkflgriotengdfmkgjtr";
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

// console.log(process.env.JSON_SECRET_TOKEN);

//  login 
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).json({message: "Authentication failed"})
        } else {
            // console.log(req.body.password, "user passwoed");
            const validPassword =await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                // generate token
                const token = jwt.sign({
                    email: user.email,
                    userID : user._id
                }, process.env.JSON_SECRET_TOKEN, {
                    expiresIn : "1h"
                }
                )
                res.status(200).json({
                    "access-token": token,
                    message: "login success", 
                    user: user
                })
            } else {
                res.status(401).json({message: "Authentication failed"})
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "login in failed"})
    }
})


// export
module.exports = router;