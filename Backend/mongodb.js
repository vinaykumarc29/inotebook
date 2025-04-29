const mongoose = require("mongoose");

const mongooseUrl = "mongodb://127.0.0.1:27017/iNotebook"

const ConnectionToMongodb = ()=> {

    mongoose.connect(mongooseUrl).then(()=>console.log("mongodb connected"));

}


module.exports= ConnectionToMongodb ;