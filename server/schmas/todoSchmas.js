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
todosSchema.methods = {
    findActive: function () {
        return mongoose.model("Todo").find({ status: "active" });
    },
    // ❌ Old way (invalid in Mongoose v7+)
    findACallback: function (cb) { 
        return mongoose.model("Todo").find({status : "active"}, cb);
    }
}


module.exports = todosSchema;