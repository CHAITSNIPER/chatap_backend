const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Items",itemSchema);