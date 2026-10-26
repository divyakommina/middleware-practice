const connection = require("../db");
const jwtTokenGenerator = require("../Middleware/jwt");

const tokenGenerator = require("../Middleware/tokenGenerator");


const registerUser = (req,res)=>{
    const {firstname,middlename,lastname,phone,email,dob,gender} = req.body;

    if(firstname == undefined,lastname == undefined,phone==undefined,email== undefined,dob == undefined,gender==undefined){
        return res.send("Enter valid details...");
    }
    
    const query =  `Insert into users (firstname,middlename,lastname,phone,email, dob,gender) values(?,?,?,?,?,?,?)`;

    
    connection.query(query,[firstname,middlename,lastname,phone,email, dob,gender], (err,result)=>{

        if(err){
           return res.status(401).send("Error in inserting user details")
        }
        res.json({
            message:"User details inserted successfully",
            user: result[0]
        });
    });
}

const login = (req,res)=>{

    const {email,password} = req.body;

    // if(!email || !password){
    //    return res.send("please enter required credentials");
    // }
    
    const query = `select  *from users where email =?`;

    // connection.query(query,[email],(err,result)=>{
    //     if(err){
    //         return res.send("Invalid error");
    //     }

    //     const dbPassword = result[0].password;

    //     if(password !== dbPassword){
    //          return res.status(401).send("Invalid email or password");
    //     }
    //     return res.json({
    //         message: "Login  successful"
    //     });
    // });
    

    connection.query(query,[email],(err,result)=>{
        if(err){
          return  res.send("error occured in login...")
        }
        const user = result[0];
        console.log(user.password);


        if(!user){
            return res.send("User with email not found");
        }
        if(password != user.password){
            return res.send("Login Unsucessfull"); 
        }

        // after login api key should be generated.... before sending actual data in response to user


        const token = tokenGenerator();
        console.log("token: ",token);

        // passing generated key(token) to a api-keys table

        const q1 = `Insert into apikeys(email,apikey) values(?,?)`;

       connection.query(q1, [email, token], (err, result) => {
    if (err) {
        console.log("MySQL Insert Error:", err);
        return res.status(500).json({
            message: "Error while inserting API key",
            error: err.message
        });
    }

    return res.json({
        message: "Login successful",
        token: token
    });
});
    })

}


const getDetailsByEmail = (req,res)=>{
    const email = req.body.email;
    const key = req.headers["key"];

    if(!key){  
        return res.send("please enter key");
    }

    if(key!== "secret123"){
        return res.send("please check your key")
    }

    if(!email){
        return res.send("Email is required")
    }

    const query = `select *from users where email =?`;

    connection.query(query,[email],(err,result)=>{
        if(err){
            return res.send("Error in getting details", err.message);
        }

        if(result.length == 0){
            return res.send("user does not exists");
        }

        return res.json({
            "message": "retrieved successfully",
            "user" : result
        });
    });

}

const getDetailsbyEmailId = (req,res)=>{
    const email = req.body.email;
    const key  = req.headers["key"];

    if(!key){
        res.send("key should present");
        return;
    }
    const q1 = "select * from apikeys where email = ?";
      connection.query(q1,[email],(error, result)=>{
        if(error){
            res.send("error came ");
            return
        }

        //user not exists
    if(result.length == 0 ){
    return res.send("user not exists");
    }

        const apikey = result[0]?.apikey ;
        
        if(key !== apikey ){
        res.send("key sent was not correct");
        return;
    }

    const query = "select * from users where email = ?"
    connection.query(query,[email],(error, result)=>{
            if(error){
                res.status(400).send("error occured during selecting user", error.message);
                return;
            }
            res.status(200).json(result);
            
    });

    });
}


// login user using jwt

const loginUser = (req,res)=>{
    const {email,password} = req.body;

    const query = `Select *from users where email = ?`;
    connection.query(query,[email],(err,result)=>{
        if(err){
        return res.send("Error Occured in Login");    
        }

        const user = result[0];
        console.log(user.password);

        if(!user){
           return res.send("User with email not found"); 
        }

        //api should be generated before sending response

        const token = jwtTokenGenerator(user.email,user.firstname,user.lastname);

        if(!token){
           return res.send("Token generation failed, login again");
        }

        res.send({
            "message":"Login Success",
            "Token": token
        });
    });
}
module.exports = {registerUser,getDetailsByEmail,login,getDetailsbyEmailId,loginUser};