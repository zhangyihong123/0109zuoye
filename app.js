const express = require('express');
const static = require('express-static');
const user1 = require('./routes/user.js');
const bodyParser = require('body-parser');
const app = express();

app.listen(8000,function(){
	console.log("ok")
})
app.use(bodyParser.urlencoded({}))

app.use("/user",user1)



app.use(static("./public"))