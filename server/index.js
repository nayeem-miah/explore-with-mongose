const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require('./routeHandler/todoHandler')
const port = 5000;



// express with init
const app = express();
app.use(express.json())

// database connect with mongoose
const uri = "mongodb://localhost:27017/todos";
mongoose.connect(uri)
    .then(()=>console.log("database connect"))
    .catch(err=> console.log(err))





// application routes
    app.use("/todo",todoHandler)


//  default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).json({error: err})
}


app.get("/", async (req, res) => {
    res.send("server is running......")
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})


