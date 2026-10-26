const jwt = require("jsonwebtoken");

function jwtTokenGenerator(email,firstname,lastname){

    // payload, encryption_key, expire

    const payload = {
        "email":email,
        "firstname":firstname,
        "lastname":lastname
    };
    

    const encryption_key = "Secret_key_@123";

    const token = jwt.sign(payload,encryption_key,{
        expiresIn:'1d'
    });

    return token;
}

module.exports = jwtTokenGenerator;