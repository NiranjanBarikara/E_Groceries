const jwt = require("jsonwebtoken");
 const JWT_RANDON_STAR ="hellohello"
 const allverifytoken =(req,res,next) =>{

    const token = req.header('auth')
    if(!token){
        return res.status(400).send({errors:"token not present"})
    }
    try{
        const decoded = jwt.verify(token, JWT_RANDON_STAR)
								// console.log(decoded)
        req.userId= decoded.user.id
        console.log(decoded.user.id)
    }
    catch(errors)
    {
        return res.status(400).send({errors:"please authenticte using valid token"})
        
    }
    
    next()
}
module.exports = allverifytoken