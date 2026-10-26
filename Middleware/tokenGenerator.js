const crypto = require("crypto");

function tokenGenerator(){
    const token = crypto.randomBytes(64).toString("hex");

    console.log(token);
    return token;

}

module.exports = tokenGenerator;