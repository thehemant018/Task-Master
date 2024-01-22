const mongoose=require('mongoose');
const {Schema}=mongoose;

const TaskSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    employee:{
        type:String,
        required:true
    },
    projectStart:{
        type:Date,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    status: {
        type: String,
        // enum: ['Not Started', 'In Progress', 'Completed'],
        // default: 'Not Started' 
    },
    date:{
        type:String,
        default:Date.now
    }
});

const Task=mongoose.model('task',TaskSchema);
module.exports=Task;