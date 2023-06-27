import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Axios from 'axios';

function TaskListDelete() {
  const params = useParams();

  const navigate = useNavigate();

  const navigateToTaskList = () => {
    navigate(`/dashboard/${params.id}/tasklist`);
  };

  const navigateToTaskListAdd = () => {
    navigate(`/dashboard/${params.id}/tasklist/add`);
  };

  const deleteTask = () => {
    Axios.delete(
      `http://localhost:3001/tasklist/delete/${params.id}/${params.task}`
    );
    navigateToTaskList();
  };

  return (
    <div>
      <h3>Welcome to your task manager, {params.id}</h3>
      <hr />
      <br />
      <span>Use this template to track your personal tasks.</span>
      <span>Click New Task + to create a new task directly on this board.</span>
      <span>Click an existing task to edit or delete content.</span>
      <br />
      <Button onClick={navigateToTaskListAdd} variant='secondary'>
        New Task +
      </Button>
      <br />
      <hr />
      <spam>
        Are you sure you want to remove{' '}
        <b style={{ fontSize: '1em' }}>{params.task}</b> from your list?
      </spam>
      <Button
        style={{ marginLeft: '12px' }}
        onClick={deleteTask}
        variant='danger'
      >
        Yes
      </Button>
      <Button
        style={{ marginLeft: '12px' }}
        onClick={navigateToTaskList}
        variant='secondary'
      >
        No
      </Button>
    </div>
  );
}

export default TaskListDelete;
