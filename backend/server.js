const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pos'
})

connection.connect()

connection.query('SELECT * from user', (err, rows, fields) => {
if (err) throw err

console.log('The solution is: ', rows[0].solution)
})

connection.end()

app.use(cors());

app.get("/", function(req, res){
    res.send("hello world")
});
app.post("/user/add", (req,res) => {
    // console.log(req.body)   


    res.send("hello")
})

app.listen(9000, function(){
    console.log("app is listening to port 9000");
});
