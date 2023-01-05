const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
var mysql = require('mysql');
const mysql_params = require('./private/mysql.js');

var mysqlConnection = mysql.createConnection({
  host: mysql_params.host,
  port: mysql_params.port,
  user: mysql_params.user,
  password: mysql_params.password,
  database: mysql_params.database,
  multipleStatements: true
});

mysqlConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
app.set('views', path.join(__dirname,'/public/views'));
app.set('view engine', 'ejs');

app.get('/' , async (req, res) => {
  await mysqlConnection.query('SELECT * FROM race_events', (err, rows, fields) => {
  if (!err){
    res.render('index_sx', {rows});
  } else
  console.log(err);
  })
  });
//TODO: Fix!!!
// app.get('/season/:year' , async (req, res) => {
//   await mysqlConnection.query('SELECT * FROM race_events WHERE YEAR(eventDate)= ? ' ,[year], (err, rows, fields) => {
//   if (!err){
//     res.render('season/index_season', {rows});
//   } else
//   console.log(err);
//   })
//   });

app.get('/race_events' , (req, res) => {
  mysqlConnection.query('SELECT * FROM race_events', (err, rows, fields) => {
  if (!err)
  res.send(rows);
  else
  console.log(err);
  })
  } );

  app.get('/race_events/:id' , async (req, res) => {
    const {id} = req.params
    await mysqlConnection.query('SELECT * FROM race_events WHERE eventID = ?',[id], (err, rows, fields) => {
    if (!err){
      console.log(fields);
      res.render('event/details', { rows, fields });
    } else
    console.log(err);
    })
    });


app.get('/race_events/city/:eventCity' , (req, res) => {
  mysqlConnection.query('SELECT * FROM race_events WHERE eventCity = ?',[req.params.eventCity], (err, rows, fields) => {
  if (!err)
  res.send(rows);
  else
  console.log(err);
  })
  });

app.listen(process.env.PORT || 3000,() =>{
  console.log('APP IS LISTENING ON PORT 3000!')
})