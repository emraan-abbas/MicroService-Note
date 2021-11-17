const jwt = require("jsonwebtoken");

function verifyToken (req, res, next){
  const bearerHeader = req.headers['x-access-token'];  //authorization
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else{
    res.sendStatus(403);
  }
} 
module.exports = verifyToken;

// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const token =
//     req.body.token || req.query.token || req.headers.token || req.params.token || req.headers["x-access-token"]; // authorization  x-access-token

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, '!ACCESS^TOKEN*SECRET');
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token !"+token);
//   }
//   return next();
// };

// module.exports = verifyToken;




// const jwt = require('jsonwebtoken')

// const authenticate = (req, res, next) =>{
//     try{

//         const token = req.header.authorization.split(' ')[1]
//         const decode = jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET)
//         if(decode)
//         {
//             next()
//         }
//         //throw exception if not verified token 
//     }
//     catch(error){
//         res.json({
//             message:'Authentication Failed !'
//         })

//     }
// }

// module.exports = authenticate

