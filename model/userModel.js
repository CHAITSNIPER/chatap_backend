const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min : 3,
        max: 20,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        max: 50
    },
    password:{
        type:String,
        required: true,
        min : 8,
    },
    PasswordChangedAt: {
        type:Date,
    },
    ResetPasswordToken: {
        type: String
    },
    ResetPasswordExpires: {
        type: Date,
    }
});

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.ResetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.ResetPasswordExpires = Date.now() + 20*60*1000;

    return resetToken;
}

module.exports=mongoose.model("User",userSchema);

