const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const mongoose = require('mongoose');

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);
    if(token == null) {
        console.log('token is null')
        return res.status(401).json({status:false});
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) {
            console.log('token is invalid');
            return res.status(403).json({msg:'token is not valid',status:false});
        }

        req.user = user;
        next();
    })
}


module.exports = authenticateToken;


