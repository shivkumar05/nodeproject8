const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tag_id:{
        type: Number,
        required: true
    },
    tag:{
        type : String, 
        required:true
    },
    category_id:{
        type: Number,
        required: true
    },
    category_name:{
        type : String, 
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model("tag", tagSchema)