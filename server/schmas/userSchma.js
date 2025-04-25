const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required : true
    }, 
    username: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    password: {
        type: String, 
        required : true
    },
    status: {
        type: String,
        enum : ["active", "isActive"]
    },
    todos: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Todo"
        }
    ]
})
module.exports = userSchema;