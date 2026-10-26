const jwt = require("jsonwebtoken");

const secret_key = "Secret_key_@123";
const jwt = require("jsonwebtoken");


const decodeToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];
    const decode_values = jwt.verify(token,secret_key);
    req.user = decode_values;

    next();
}

module.exports = decodeToken;