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
// instance method
todosSchema.methods = {
    findActive: function () {
        return mongoose.model("Todo").find({ status: "active" });
    },
    // ❌ Old way (invalid in Mongoose v7+)
    findACallback: function (cb) { 
        return mongoose.model("Todo").find({status : "active"}, cb);
    }
}

// static method
todosSchema.statics = {
    findByJS: function () {
        return this.find({title : /css/i , description : /css/i, status : "inactive" })
    }
}
 


module.exports = todosSchema;