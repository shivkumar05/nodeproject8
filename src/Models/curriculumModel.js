const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema({
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
    category:{
        type : Number,
        require:true
    },
    tag:{
        type : Number, 
        require:true
    }
    
}, { timestamps: true });

module.exports = mongoose.model("curriculum", curriculumSchema)