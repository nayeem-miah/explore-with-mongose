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
    }, 
    user: {
        type: mongoose.Types.ObjectId,
        ref : "User" 
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
 
// query helpers
todosSchema.query = {
    byLanguage: function (language) { // ()=> {} ❌ not using arrow function because this method could't found 
        return this.find({title : new RegExp(language, "i")})  //new RegExp()
    }
}


module.exports = todosSchema;