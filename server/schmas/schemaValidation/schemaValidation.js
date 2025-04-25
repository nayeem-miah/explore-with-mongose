const mongoose = require("mongoose");
const valuationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "product title is required"],
        minlength: [3, "title min length 3"],
        maxlength: [100, "title max length 100"],
        // lowercase : true,
        uppercase: true,
        trim : true //remove unnesserry spacing
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String, 
        enum: ["active", "inactive"],
        message : "{VALUE} is not supported"
    },
    
    price: {
        type: Number,
        required: true,
        min: [20, "min price 20"],
        max: [2000, "max price 2000"]
    }, 
    rating: {
        type: String
    }
})
module.exports = valuationSchema;