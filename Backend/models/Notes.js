const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
    Title:{
        type:String,
    },
    description:{
        type:String,
    },
    tag:{
        type:String,
        default:"General"
    },
    Date:{
        type:Date,
        default:Date.now
    }
});

const Notes = mongoose.model("Notes",noteSchema);

module.exports = Notes