const mongoose = require("mongoose");

const gripSchema = new mongoose.Schema({
    num_reps:{
        type:Number,
        require:true
    },
    num_sets:{
        type:Number,
        require:true
    },
    video: {
        type: String,
        require: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Grip", gripSchema)