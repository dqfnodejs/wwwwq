var express = require('express')

var bodyparser = require('body-parser')

var mysql = require('mysql')

var app = express()

app.use(bodyparser.urlencoded({}))

var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'kechengbiao',
	port:3306
})

app.get('/',(req,res) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql = 'select * from kecheng'
		connection.query(sql,function(err,data){
			if(err){
				console.log(err)
				return
		    }
			res.send(data)
			connection.end()
		})
	})
})

app.post('/updata',(req,res) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	var json = req.body
    console.log(req.body)
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql = `update kecheng set Monday='${json.Monday}',Tuesday='${json.Tuesday}',Wednesday='${json.Wednesday}',Thursday='${json.Thursday}',Friday='${json.Friday}' where id=${json.o}`
		connection.query(sql,(err,data) => {
			if(err){
				console.log(err)
				return
		    }
			res.send(data)
			connection.end()
		})
	})
})

app.listen(3000,function(){
    console.log('吃饭睡觉打豆豆')
})
