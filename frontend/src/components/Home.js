import React, { useContext, useEffect, useRef, useState } from 'react'
import TaskItem from './TaskItem'
import taskContext from '../context/task/taskContext'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  let navigate = useNavigate();
  const [projectStatus, setProjectStatus] = useState('Not Started');
  const context = useContext(taskContext);
  const { work, getTask, editTask } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getTask();
    }
    else {
      navigate("/login");
    }
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [task, setTask] = useState({ id: "", etitle: "", edescription: "", eemployee: "", eprojectStart: "", edeadline: "", status: "" });

  const updateTask = (currentTask) => {
    ref.current.click();
    setTask({ id: currentTask._id, etitle: currentTask.title, edescription: currentTask.description, eemployee: currentTask.employee, eprojectStart: currentTask.projectStart, edeadline: currentTask.deadline, status: currentTask.status });
  }

  const handleClick = (e) => {
    editTask(task.id, task.etitle, task.edescription, task.eemployee, task.eprojectStart, task.edeadline, task.status);
    refClose.current.click();
    e.preventDefault();
    props.showAlert('Note updated successfuly', 'success');
    navigate('/');
  }

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  const updateStatus = (e) => {
    const selectedStatus = e.target.value;
    setProjectStatus(selectedStatus);
  };


  return (
    <div>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={task.etitle} onChange={onChange} minLength={5} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={task.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="eemployee" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="eemployee" name="eemployee" value={task.eemployee} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="eprojectStart" className="form-label">Tag</label>
                  <input type="date" className="form-control" id="eprojectStart" name="eprojectStart" value={task.eprojectStart} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edeadline" className="form-label">Tag</label>
                  <input type="date" className="form-control" id="edeadline" name="edeadline" value={task.edeadline} onChange={onChange} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="status">Project Status:</label>
                  <select id="status" className="form-select" aria-label="Default select example" name="status" value={projectStatus} onChange={updateStatus}>
                    <option value="Not Started" >Not Started</option>
                    <option value="In Progress" >In Progress</option>
                    <option value="Completed" >Completed</option>
                  </select>
                  {work.estatus = projectStatus}
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={task.etitle.length < 5 || task.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className='row Task-3'>
        <h2>Yours Task</h2>
        <div className='container mx-2'>
          {work.length === 0 && "No Task to display"}
        </div>
        {work &&
          work.map((task) => {
            return <TaskItem key={task._id} task={task} showAlert={props.showAlert} updateTask={updateTask} />
          })}
      </div>
    </div>
  )
}

export default Home
