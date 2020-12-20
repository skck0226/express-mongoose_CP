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
	goal.id = req.body.id;
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
router.put('/:goal_id',(req,res)=>{
	Goal.findById(req.params.goal_id, (err,goal)=>{
		if(err)	return res.status(500).json({ error: 'database failure' });
		if(!goal) return res.status(404).json({ error: 'goal not found' });
		
		goal.name = req.body.name;
		goal.content = req.body.content;
		
		goal.save(err=>{
			if(err) res.status(500).json({error: 'failed to update'});
			res.json(goal);
		});
	})
})
router.get('/:goal_id',(req,res)=>{
	Goal.findById(req.params.goal_id, (err,goal)=>{
		if(err)	return res.status(500).json({ error: 'database failure' });
		if(!goal) return res.status(404).json({ error: 'goal not found' });
		res.json(goal);
	})
})
router.delete('/:goal_id',(req,res)=>{
	Goal.remove({_id:req.params.goal_id},(err)=>{
		if(err) res.status(500).json({error: 'database failure'});
        res.json({ message: "book deleted" });
	});
})
module.exports = router;