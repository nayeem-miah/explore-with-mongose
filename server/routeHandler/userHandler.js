const express = require("express")
const mongoose = require("mongoose");
const userSchema = require("../schmas/userSchma");
const router = express.Router();
const User =new mongoose.model("user", userSchema)

// sign up
router.post("/signup", async (req, res) => {
   try {
        const newUser = new User({

        });
        const result = await newUser.save();
         res.status(200).json({
        data : result
    })
   } catch (error) {
       console.error(error)
       res.status(500).json({
           message : "there was a server site error"
       })
   }
})


// export
module.exports = router