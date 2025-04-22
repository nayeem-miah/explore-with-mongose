const jwt = require("jsonwebtoken");

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;
    // console.log(authorization, "authentication data");
    try {
        const token = authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JSON_SECRET_TOKEN);
        const { email, userID } = decode;
        req.email = email;
        req.userID = userID;
        next()
    } catch (error) {
        // console.log(error);
        next("authentication failed ")
    }
} 
module.exports = verifyLogin;