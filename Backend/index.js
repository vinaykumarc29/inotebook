const express = require("express");
const ConnectionToMongodb = require("./mongodb");
const authrouter = require("./routes/auth");
const noderouter = require("./routes/note");


ConnectionToMongodb()

const app = express();
const port =3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",authrouter);
app.use("/note",noderouter);

app.listen(port,()=>{
    console.log(`server Started At port:${port}`)
})
