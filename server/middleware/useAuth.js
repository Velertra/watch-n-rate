const jwt = require("jsonwebtoken");
require('dotenv').config()

function useToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null) {
        return res.sendStatus(401);
    } 

    try{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            req.user = user;
            next()
        })
    } catch {
        req.user = null;
        next()
    }
    
        
    
}

module.exports = useToken;