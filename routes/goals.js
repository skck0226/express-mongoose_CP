const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const Goal= require('../models/goal');
router.get('/',(req,res)=>{
	Goal.find((err,goals)=>{
		if(err){
			console.error(err);
			return ;	
		}
		res.json(goals);
	})
})
router.post('/',(req,res)=>{
	const goal = new Goal();
	goal.name = req.body.name;
	goal.content = req.body.content;
	goal.save((err)=>{
		if(err){
			console.error(err);
			res.json({result:0});
			return;
		}
		res.json({result:1});
	})
})

module.exports = router;