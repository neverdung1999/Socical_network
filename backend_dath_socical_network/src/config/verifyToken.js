const jwt = require('jsonwebtoken')
// const {S_TOKEN} = require('../constants/index')

const verifyToken = (req,res,next) => {
    const token = req.header("Authorization");
    console.log(token)
    // const token = "Bearer " + req.cookies.token;
    if(!token){
        return res.status(401).json("Access Denied");
    }else{
        const bearerToken = token.split(" ")[1];
        try {
          var decoded = jwt.verify(bearerToken, "Shhhhh");
          req.user = decoded;
          console.log(decoded);
          next();
        } catch (err) {
          console.log(err);
        }
    }
}

module.exports = verifyToken;