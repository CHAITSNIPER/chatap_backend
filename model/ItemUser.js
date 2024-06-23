const mongoose = require('mongoose');

const itemUserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required : true
    }
});

module.exports = mongoose.model("UserItem",itemUserSchema);