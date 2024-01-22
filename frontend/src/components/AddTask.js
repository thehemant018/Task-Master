import React, { useContext, useState } from 'react'
import taskContext from "../context/task/taskContext"
import { useNavigate } from 'react-router-dom';

const AddTask = (props) => {
  let navigate=useNavigate();
  const [projectStatus, setProjectStatus] = useState('Not Started');
  const context = useContext(taskContext);
  const { addTask } = context
  const [work, setWork] = useState({ title: "", description: "", employee: "", projectStart: "", deadline: "", status: "" });


  const handleClick = (e) => {
    e.preventDefault();
    addTask(work.title, work.description, work.employee, work.projectStart, work.deadline, work.status);
    setWork({ title: "", description: "", employee: "", projectStart: "", deadline: "", status: "", });
    props.showAlert('Task Added successfuly', 'success');
    navigate('/');

  }
  const onChange = (e) => {
    setWork({ ...work, [e.target.name]: e.target.value });
  }

  const updateStatus = (e) => {
    const selectedStatus = e.target.value;
    setProjectStatus(selectedStatus);
  };

  return (
    <div>
      <div className='container my-1'>
        <h2>Add a Task</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={work.title} name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" value={work.description} name="description" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="employee" className="form-label">Employee</label>
            <input type="text" className="form-control" id="employee" value={work.employee} name="employee" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="projectStart" className="form-label">Project Start</label>
            <input type="date" className="form-control" id="projectStart" value={work.projectStart} name="projectStart" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label">Deadline</label>
            <input type="date" className="form-control" id="deadline" name="deadline" value={work.deadline} onChange={onChange} minLength={5} required />
          </div>

          <div className="mb-3">
            <label htmlFor="status">Project Status:</label>
            <select id="status" className="form-select" aria-label="Default select example" name="status" value={projectStatus} onChange={updateStatus}>
              <option value="Not Started" >Not Started</option>
              <option value="In Progress" >In Progress</option>
              <option value="Completed" >Completed</option>
            </select>
         {work.status=projectStatus}
          </div>
          <button disabled={work.title.length < 5 || work.description.length < 5} type="submit" className="btn btn-primary mt-3" onClick={handleClick}>Add Task</button>
        </form>
      </div>
    </div>
  )
}

export default AddTask
