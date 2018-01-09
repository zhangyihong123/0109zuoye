const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const body = require("body-parser")
const pool = mysql.createPool({
	host:"localhost",
	user:'root',
	password:"123456",
	database:"list",
	port:3306
})


router.use("/landing",function(req,res){
	var user = req.body.user
	var pass = req.body.pass
	pool.getConnection(function(err,connection){
		if(err) throw err;
		connection.query(`SELECT * FROM list WHERE user = ${user}  AND pass = "${pass}"`,function(err,rows){
			if(err) throw err;
			if(rows.length == 1){
				res.send("登陆成功")
			}else{
				res.send("登录失败")
			}
			connection.release();
		})
	})
})





router.use("/registered",function(req,res){
	var user = req.body.user
	var pass = req.body.pass
	pool.getConnection(function(err,connection){
		if(err) throw err;
		connection.query(`SELECT * FROM list WHERE user = "${user}"`,function(err,rows){
			if(err) throw err;
			if(rows.length == 1){
				res.send("账号存在")
			}else{
				connection.query(`INSERT INTO list (user,pass) VALUES (${user},${pass})`,function(err,rows){
					if(err) throw err;
					res.send("注册成功")	 
				})
			}
			connection.release()
		})
			
	})	
})










module.exports = router
