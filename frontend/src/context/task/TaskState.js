import React, { useState } from "react";
import TaskContext from "./taskContext";


const TaskState = (props) => {
    const taskInitial = []
    const [work, setWork] = useState(taskInitial);


    const getTask = async () => {

        //API CALL
        try {

            const response = await fetch(`${window.location.origin}/api/task/fetchalltask`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = await response.json();
            // console.log(json)

            setWork(json)
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }




    const addTask = async (title, description, employee, projectStart, deadline, status) => {
        try {
            const response = await fetch(`${window.location.origin}/api/task/addtask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, employee, projectStart, deadline, status }),
            });
            const task = await response.json();
            setWork(work.concat(task));
        } catch (error) {
            console.error('Error adding task:', error);
        }

    }

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${window.location.origin}/api/task/deletetask/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = response.json();
            const newTask = work.filter((task) => { return task._id !== id });
            setWork(newTask);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    const editTask = async (id, title, description, employee, projectStart, deadline, status) => {
        try {
            const response = await fetch(`${window.location.origin}/api/task/updatetask/${id}`, {
                
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('token')
                    },
                    body: JSON.stringify({ title, description, employee, projectStart, deadline, status }),

                });
                const json = await response.json();

                for (let index = 0; index < work.length; index++) {
                    const element = work[index];
                    if (element._id === id) {
                        work[index].title = title;
                        work[index].description = description;
                        work[index].employee = employee;
                        work[index].projectStart = projectStart;
                        work[index].deadline = deadline;
                        work[index].status = status;
                    }
                    break;
                  }
                  setWork(work);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    return (
        // we can send method also
        <TaskContext.Provider value={{ work, addTask, getTask,editTask,deleteTask }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;


