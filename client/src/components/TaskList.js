import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function TaskLists() {
  const params = useParams();
  const [taskList, setTaskList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const filtered =
    selectedStatus !== ''
      ? taskList.filter((m) => m.status === selectedStatus)
      : taskList;

  useEffect(() => {
    Axios.get(`http://localhost:3001/tasklist/get/${params.id}`).then(
      (response) => {
        setTaskList(response.data);
      }
    );
  });

  const navigate = useNavigate();

  const navigateToTaskListAdd = () => {
    navigate(`/dashboard/${params.id}/tasklist/add`);
  };

  const navigateToTaskListUpdate = (task, description, category, status) => {
    navigate(
      `/dashboard/${params.id}/tasklist/update/${task}/${description}/${category}/${status}`
    );
  };

  const navigateToTaskListDelete = (task) => {
    navigate(`/dashboard/${params.id}/tasklist/delete/${task}`);
  };

  if (taskList.length === 0) {
    return (
      <div>
        <h3>✔️ Welcome to your task manager, {params.id}</h3>
        <hr />
        <br />
        <span>Use this template to track your personal tasks.</span>
        <span>
          Click New Task + to create a new task directly on this board.
        </span>
        <span>Click an existing task to edit or delete content.</span>
        <br />
        <Button onClick={navigateToTaskListAdd} variant='secondary'>
          New Task +
        </Button>
        <br />
        <hr />
        <span>You currently have 0 tasks</span>
      </div>
    );
  } else {
    return (
      <div>
        <h3>✔️ Welcome to your task manager, {params.id}</h3>
        <hr />
        <br />
        <span>Use this template to track your personal tasks.</span>
        <span>
          Click New Task + to create a new task directly on this board.
        </span>
        <span>Click an existing task to edit or delete content.</span>
        <br />
        <Button onClick={navigateToTaskListAdd} variant='secondary'>
          New Task +
        </Button>
        <br />
        <hr />

        <div className='row'>
          <div style={{ borderRight: '1px solid grey' }} className='col-2'>
            <b>Filter by Status:</b>
            <ListGroup>
              <ListGroup.Item
                action
                active={selectedStatus === '' ? true : false}
                onClick={() => {
                  setSelectedStatus('');
                }}
              >
                All Tasks
              </ListGroup.Item>
              <ListGroup.Item
                action
                active={selectedStatus === 'To Do' ? true : false}
                onClick={() => {
                  setSelectedStatus('To Do');
                }}
              >
                To Do
              </ListGroup.Item>
              <ListGroup.Item
                action
                active={selectedStatus === 'In Progress' ? true : false}
                onClick={() => {
                  setSelectedStatus('In Progress');
                }}
              >
                In Progress
              </ListGroup.Item>
              <ListGroup.Item
                action
                active={selectedStatus === 'Completed' ? true : false}
                onClick={() => {
                  setSelectedStatus('Completed');
                }}
              >
                Completed
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className='col'>
            <Table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>Task</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>Status</th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((task) => (
                  <tr>
                    <th scope='row'>{task.task}</th>
                    <td>{task.description}</td>
                    <td>{task.category}</td>
                    <td>
                      <Badge
                        pill
                        bg={
                          task.status === 'In Progress'
                            ? 'warning'
                            : task.status === 'Completed'
                            ? 'success'
                            : 'secondary'
                        }
                        text={task.status === 'In Progress' ? 'dark' : 'light'}
                      >
                        {task.status}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          navigateToTaskListUpdate(
                            task.task,
                            task.description,
                            task.category,
                            task.status
                          );
                        }}
                        variant='warning'
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          navigateToTaskListDelete(task.task);
                        }}
                        variant='danger'
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskLists;
