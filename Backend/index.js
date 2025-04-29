const express = require("express");
const ConnectionToMongodb = require("./mongodb");
const router = require("./routes/auth");


ConnectionToMongodb()

const app = express();
const port =3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",router)

app.listen(port,()=>{
    console.log(`server Started At port:${port}`)
})
