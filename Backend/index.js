const express = require("express");
const ConnectionToMongodb = require("./mongodb");
const authrouter = require("./routes/auth");
const noderouter = require("./routes/note");
const cors = require("cors")


ConnectionToMongodb()

const app = express();
const port =5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user",authrouter);
app.use("/note",noderouter);

app.listen(port,()=>{
    console.log(`server Started At port:${port}`)
})
