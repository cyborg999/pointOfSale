const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userModel = require("./models/userModel");

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
// app.use(morgan('combined'));

app.get("/", async function(req, res){
    res.send("API is Up")
});

app.post("/user/add", async (req,res) => {
    let isAdded =  await userModel.validate(req.body);

    res.send({ added : isAdded})
});

app.post("/user/login", async (req,res) => {
    let allow = await userModel.login(req.body);

    res.send({ allow : allow})
});

app.listen(9000, function(){
    console.log("app is listening to port 9000");
});
