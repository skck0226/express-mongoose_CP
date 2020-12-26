const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

const Goal= require('../models/goal');

router.get('/',ensureAuthenticated,(req,res)=>{
	Goal.find({user:req.user.id})
		.then(goals =>{
			res.render('goals/goalsList',{
				goals:goals
			})
		})
})
router.get('/add', ensureAuthenticated, (req,res)=>{
	res.render('goals/add');
})
router.get('/edit/:goal_id',ensureAuthenticated,(req,res)=>{
	Goal.findeOne({_id:req.params.id})
		.then( goal => {
			res.render('goals/edit',{goal:goal})
		})
})
router.post('/',ensureAuthenticated,(req,res)=>{
	const goal = new Goal({
		title: req.body.title,
		details: req.body.details,
		user: req.user.id
	});
	goal.save()
		.then( (goal)=>{
			res.redirect('/goals');
		})
})
router.put('/:goal_id',ensureAuthenticated,(req,res)=>{
	Goal.findOne({_id:req.params.goal_id})
		.then((goal)=>{
			goal.title = req.body.title;
			goal.detail = req.body.detail;
			goal.save()
				.then(goal=>{
					res.redirect('/');
				})
		})
})
router.delete('/:goal_id',ensureAuthenticated,(req,res)=>{
	Goal.remove({_id:req.params.goal_id})
		.then(goal=>{
			res.redirect('/');
		})
})
module.exports = router;