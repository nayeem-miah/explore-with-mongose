const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require('./routeHandler/todoHandler')
const port = 3000;



// express with init
const app = express();
app.use(express.json())

// database connect with mongoose
// const uri = "mongodb://localhost:27017";
const uri = "mongodb://localhost/todo"
mongoose.connect(uri,
    // { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err))
    

// application routes
    app.use("/todo",todoHandler)

app.get('/', async (req, res) => {
    console.log("server is running in mongoose")
})

//  default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).json({error: err})
}






app.listen(port, () => {
    console.log(`Server is running on port 3000`);
})

