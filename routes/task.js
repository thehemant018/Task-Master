const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
var fetchuser=require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
router.get('/fetchalltask', fetchuser,async(req, res) => {
    try {
        const tasks=await Task.find({user:req.user.id});
        console.log(tasks);
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Iternal server Error')
    }

});
router.post('/addtask',fetchuser,[
    body('title','Enter valid title').isLength({ min: 3 }),
    body('description', 'description must not be atleast 5 characters').isLength({ min: 5 }),
    body('employee','Enter valid employee name').isLength({ min: 3 }),
],async(req,res)=>{
    try {
        const{title,description,employee,projectStart,deadline,status}=req.body;

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const work=new Task({
            title,description,employee,projectStart,deadline,status,user: req.user.id
        })

        const saveTask=await work.save();
        res.send(saveTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Iternal server error')
    }
});
router.put('/updatetask/:id',fetchuser,async (req,res)=>{
    const{title,description,employee,projectStart,deadline,status}=req.body;

    try {
        const newWork={};
        if(title){
            newWork.title=title;
        };
        if(description){
            newWork.description=description;
        };
        if(employee){
            newWork.employee=employee;
        };
        if(projectStart){
            newWork.projectStart=projectStart;
        };
        if(employee){
            newWork.deadline=deadline;
        };
        if(employee){
            newWork.status=status;
        };

        let work=await Task.findById(req.params.id);
        if(!work){
            return res.status(404).send('Not Found');
        }
        if (work.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        work=await Task.findByIdAndUpdate(req.params.id,{$set:newWork},{new:true});
        res.json(work);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Iternal server error');
    }
});

router.delete('/deletetask/:id',fetchuser,async(req,res)=>{
    try {
        let work=await Task.findById(req.params.id);
        if(!work){
            return res.status(400).send('Not Found');
        }

        if(work.user.toString()!==req.user.id){
            return res.status(401).send('Not allowed');
        }
        work=await Task.findByIdAndDelete(req.params.id);
        res.json({"Success":"Task has been deleted",work:work});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Iternal server error');
    }
});

module.exports = router;