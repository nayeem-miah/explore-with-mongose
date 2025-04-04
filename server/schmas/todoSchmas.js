const mongoose = require("mongoose")

// creating schema
const todosSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
    }, 
    description: String,
    status: {
        type: String,
        enum : ['active', 'inactive'],
    },
    date: {
        type: Date,
        default : Date.now()
    }
})


module.exports = todosSchema;