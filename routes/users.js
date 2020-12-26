const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.get('/login',(req,res)=>{
	res.render('users/login');
})
router.post('/login',(req,res,next)=>{
	passport.authenticate('local',{
		successRedirect:'../goals',
		failureRedirect:'./login'
	})(req,res,next);
})
router.get('/register',(req,res)=>{
	res.render('users/register');
})
router.post('/register',(req,res)=>{
	User.findOne({email:req.body.email})
		.then(user=>{
			if(user) res.redirect('./register');
			else{
				const newU = new User({
					name:req.body.name,
					email:req.body.email,
					password:req.body.password
				});
				bcrypt.hash(newU.password, 10, (err,hash)=>{
					newU.password = hash;
					newU.save()
						.then((user)=>{
							res.redirect('./login');
						})
				})
			}
	})
})
router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('users/login');
})
module.exports = router;