const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');

const User = require('../models/user');

module.exports = (passport)=>{
	passport.use(new localStrategy({usernameField:'email'},(email,password,done)=>{
		User.findOne({email:email})
			.then(user=>{
				if(!user) return done(null,false);
				bcrypt.compare(password,user.password,(err,isMatch)=>{
					if(isMatch) return done(null,user);
					return done(null,false);
				})	
			})
	}))
	passport.serializeUser(function(user,done){
		done(null,user.id);
	})
	passport.deserializeUser(function(id,done){
		User.findById(id,(err,user)=>{
			done(err,user)
		})
	})
}
