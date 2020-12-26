const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs  = require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


require('./config/passport')(passport);

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
mongoose.connect('mongodb://localhost/login');

//static file
//app.use(express.static('src'));
//handlebars
app.engine('handlebars', exphbs({ 
	defaultLayout: 'main' ,
	// layoutsDir: __dirname + '/views/layouts/',
	// partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
//session
app.use(session({
	secret:'Secret Key',
	resave:true,
	saveUninitialized:true
}))
//passport
app.use(passport.initialize());
app.use(passport.session());
//router
const goalsRoute = require('./routes/goals');
const usersRoute = require('./routes/users');
app.use('/goals',goalsRoute);
app.use('/users',usersRoute);

app.get('/', (req, res) => {
    const title = "welcome!";
    res.render('index', {
        title: title,
    });
})
app.get('/about', (req, res) => { 
    res.render("about");
})
app.listen(3000,(req,res)=>{
	console.log(`server 5000`);
});