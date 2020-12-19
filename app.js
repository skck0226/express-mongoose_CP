const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//cors
const cors = require('cors');
app.use(cors());
//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongodb connect
const db = 	mongoose.connection;
db.on('error',console.error);
db.once('open',()=>console.log('connected to mongodb server'));
mongoose.connect('mongodb://localhost/mongodb_tutorial');
//db model

const Goal = require('./models/goal');

//router
const goalsRoute = require('./routes/goals');
const usersRoute = require('./routes/users');
app.use('/goals',goalsRoute);
app.use('/users',usersRoute);


app.listen(3000,(req,res)=>{
	console.log(`server 3000`);
});