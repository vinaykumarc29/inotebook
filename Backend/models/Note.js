const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
    Title:{
        type:String,
    },
    Description:{
        type:String,
    },
    Tag:{
        type:String,
        default:"General"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Date:{
        type:Date,
        default:Date.now
    }

});

const Note = mongoose.model("Note",noteSchema);

module.exports = Note