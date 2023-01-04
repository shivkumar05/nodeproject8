const mongoose = require("mongoose");

const uploadDeviceSchema = new mongoose.Schema({
    video: {
        type: String,
        require: true
    },
    thumbnail:{
        type:String,
        require: true
    },
    videoLength:{
        type:String
    },
    title:{
        type: String,
        required: true
    },
    category:{
        type : Number,
        required:true
    },
    tag:{
        type : Number, 
        required:true
    }
    
}, { timestamps: true });

module.exports = mongoose.model("uploadDevice", uploadDeviceSchema)