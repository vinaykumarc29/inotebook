const jwt = require("jsonwebtoken");
const secretKey = "Vin@y$";


// This function extracts user from jwt token and returns user
const fetchuser = (req,res,next)=>{

    const token = req.header("auth-token");

    if(!token){
        res.status(401).json("Invalid Token");
    }

    const data = jwt.verify(token,secretKey);

    req.user = data;

    next();
}


module.exports = fetchuser ;