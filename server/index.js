const express = require("express");
const mongoose = require("mongoose");



// express with init
const app = express();
app.use(express.json())

// database connect with mongoose
mongoose.connect()
// application routes


//  default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).json({error: err})
}




app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
