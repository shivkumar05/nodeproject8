const mongoose = require("mongoose");

const drillSchema = new mongoose.Schema({
    drills:{
        type: String,
        required: true
    },
    date:{
        type : String, 
        required:true
    },
    time:{
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("drill", drillSchema)