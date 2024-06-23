const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendMail = require('./sendMail');

module.exports.register = async(req,res,next)=>{
try{
   const {username,email,password}= req.body;
   const userNameCheck = await User.findOne({ username });
   if(userNameCheck){
    return res.json({msg:"username already used",status:false})
   }
   const emailCheck = await User.findOne({ email });
   if(emailCheck){
    return res.json({msg:"Email already used",status:false});
   }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        email,
        username,
        password: hashedPassword,
    });

    const token = jwt.sign({
        id:user._id,
        username: user.username,
        email: user.email,
    },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
     
    return res.json({status: true,token,user});

}catch(error){
    next(error);
}
}

module.exports.login = async(req,res,next)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({ username });
        if(!user)
            return res.json({msg:"user does not exist or wrong password",status:false});
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.json({msg:"user does not exist or wrong password",status:false});
        }

        const token = jwt.sign({
            id:user._id,
            username: user.username,
            email: user.email,

        },process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRES_IN});
        delete user.password;
        console.log(token); 

        return res.json({status:true,token,user});
    }catch(ex){
        next(ex);
    }
}

module.exports.getUserByID = async(req,res,next)=>{
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select('email');
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        return res.status(200).json({ status: true, user });
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUsers = async(req,res,next)=>{
    try{
     const { username } = req.params;
     const user = await User.find({username:{$ne:username}}).select(['username','email']);
     return res.json(user);
    }catch(ex){
        next(ex);
    }
}

module.exports.forgotPasswordComp = async(req,res,next)=>{
    try{
        //get user based on email
        const { email } = req.body;
        const user = await User.findOne({email: email });
        
        //generate the random reset token
        if(!user){
            return res.status(404).json({ msg:'user not found'} );
        }
        //send it to user's email
        const resetToken = user.createPasswordResetToken();

        await user.save({ validateBeforeSave: false });


        const message = `Forgot you password, HAHA!`;

        try{
            await sendMail({
                email: user.email,
                subject: `your password reset`,
                message
            });
    
            return res.status(202).json({msg:'email has been sent'
            });
        }catch(error){
            return res.status(500).json({msg:'not recieved'});
        }
        
    }catch(ex){
        next(ex);
    }
}

module.exports.ValidateAdmin = async(req,res,next)=>{
    try{
      const user = req.params.username;
     // console.log(user,process.env.ADMIN_USER);
      if(user === process.env.ADMIN_USER){
        return res.status(200).json({msg:'yes he is the admin',status:true});
      }
      else{
        return res.status(203).json({msg:'no he is not the admin', status:false});
      }
    }catch(ex){
        next(ex);
    }
}

