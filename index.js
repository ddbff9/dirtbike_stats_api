const express = require('express');
const app = express();
const path = require('path');
var mysql = require('mysql');
const mysql_params = require('./private/mysql.js');

var con = mysql.createConnection({
  host: mysql_params.host,
  port: mysql_params.port,
  user: mysql_params.user,
  password: mysql_params.password,
  database: mysql_params.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname,'/public/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(process.env.PORT || 3000,() =>{
  console.log('APP IS LISTENING ON PORT 3000!')
})