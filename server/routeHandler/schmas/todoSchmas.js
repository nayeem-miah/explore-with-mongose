const mongoose = require("mongoose")

const todosSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
    }, 
    description: {
        type : String
    },
    status: {
        type: String,
        enum : ["active", "inactive"],
    },
    date: {
        type: Date,
        default : Date.now()
    }
})


module.exports = todosSchema;