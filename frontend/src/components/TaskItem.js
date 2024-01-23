import React, { useContext } from 'react'
import taskContext from "../context/task/taskContext"
const TaskItem = (props) => {
    const context = useContext(taskContext);
    const {deleteTask}=context;
    const {task,updateTask}=props;

    const c = new Date();
    const d = new Date(task.deadline.substring(0,10));
    let result;
    if(task.status==='Completed'){
        result="Ontime"; 
    }else if(c<d ){
        result="Ontime"; 
    }
    else{
        result="Overdue";
    }

    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body" id="card1">
                    <h5 className="card-title"> {task.title}</h5>
                    <p className="card-text"> {task.description} </p>
                    <p className="card-text"> {task.employee} </p>
                    <p className="card-text">Project Start:    {task.projectStart.substring(0,10)} </p>
                    <p className="card-text">Project Deadline: {task.deadline.substring(0,10)} </p>
                    <p className="card-text">Status: {task.status} </p>
                    <p className="card-text"><b>Time Status: {result} </b></p>

                    <i className="fa-solid fa-trash-can mx-2 " onClick={() => {
                        deleteTask(task._id);
                        props.showAlert('Task Deleted successfuly', 'success');
                    }} ></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
                        updateTask(task);
                        props.showAlert('Task Updated successfuly', 'success');
                    }}></i>
                </div>
            </div>
        </div>
    )
}

export default TaskItem
