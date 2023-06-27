import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Axios from 'axios';
import * as Yup from 'yup';
import FormikControl from './FormikControl';

function TaskListsAdd(props) {
  const params = useParams();
  const [taskList, setTaskList] = useState([]);
  const [currentTask, setCurrentTask] = useState([]);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    Axios.get(`http://localhost:3001/tasklist/get/${params.id}`).then(
      (response) => {
        setTaskList(response.data);
      }
    );
  }, [params.id]);

  useEffect(() => {
    Axios.get(
      `http://localhost:3001/tasklist/get/currentTask/${params.id}`
    ).then((response) => {
      setCurrentTask(response.data);
    });
  }, [params.id]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/tasklist/get/userType/${params.id}`).then(
      (response) => {
        setUserType(response.data);
      }
    );
  }, [params.id]);

  const navigate = useNavigate();

  const navigateToTaskList = () => {
    // 👇️ navigate to /tasklist
    navigate(`/dashboard/${params.id}/tasklist`);
  };

  const categoryOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Social Activities', value: 'Social Activities' },
    { key: 'Entertainment', value: 'Entertainment' },
    { key: 'Leisure & Recreation', value: 'Leisure & Recreation' },
    { key: 'Projects', value: 'Projects' },
    { key: 'Exercise', value: 'Exercise' },
    { key: 'Groceries', value: 'Groceries' },
    { key: 'Chores', value: 'Chores' },
    { key: 'Travel', value: 'Travel' },
  ];

  if (userType === 'student') {
    categoryOptions[1] = { key: 'Assignments', value: 'Assignments' };
    categoryOptions[2] = { key: 'Studying', value: 'Studying' };
  } else if (userType === 'professional') {
    categoryOptions[1] = { key: 'Work', value: 'Work' };
    categoryOptions[2] = { key: 'Meetings', value: 'Meetings' };
  }

  const initialValues = {
    task: '',
    description: '',
    category: '',
  };
  const validationSchema = Yup.object({
    task: Yup.string()
      .required('Required')
      .max(30, 'Cannot be more than 30 characters')
      .notOneOf(currentTask, 'This task already exists'),
    description: Yup.string().max(200, 'Cannot be more than 200 characters'),
    category: Yup.string().required('This field is required'),
  });

  const onSubmit = (values) => {
    Axios.post(`http://localhost:3001/tasklist/post/${params.id}`, {
      task: values.task,
      description: values.description,
      category: values.category,
      status: 'To Do',
    });
    navigateToTaskList();
  };

  if (taskList.length === 0) {
    return (
      <div>
        <h3>Welcome to your task manager, {params.id}</h3>
        <hr />
        <br />
        <span>Use this template to track your personal tasks.</span>
        <span>
          Click New Task + to create a new task directly on this board.
        </span>
        <span>Click an existing task to edit or delete content.</span>
        <br />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form style={{ margin: '0', border: '0' }}>
              <FormikControl
                control='input'
                type='text'
                label='Task:'
                name='task'
                placeholder='Enter task...'
              />
              <FormikControl
                control='textarea'
                label='Desciption:'
                name='description'
                placeholder='Details...'
              />
              <FormikControl
                control='select'
                label='Select Category:'
                name='category'
                options={categoryOptions}
              />
              <br />
              <button
                style={{ float: 'right', display: 'inline' }}
                type='submit'
                disabled={!formik.isValid}
              >
                Add Task
              </button>
              <br />
              <br />
              <button
                style={{
                  float: 'left',
                  display: 'inline',
                  marginTop: '-48px',
                  backgroundColor: '#ef4747',
                }}
                onClick={navigateToTaskList}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
        <hr />
        <span>You currently have 0 tasks</span>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Welcome to your task manager, {params.id}</h3>
        <hr />
        <br />
        <span>Use this template to track your personal tasks.</span>
        <span>
          Click New Task + to create a new task directly on this board.
        </span>
        <span>Click an existing task to edit or delete content.</span>
        <br />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form style={{ margin: '0', border: '0' }}>
              <FormikControl
                control='input'
                type='text'
                label='Task:'
                name='task'
                placeholder='Enter task...'
              />
              <FormikControl
                control='textarea'
                label='Desciption:'
                name='description'
                placeholder='Details...'
              />
              <FormikControl
                control='select'
                label='Select Category:'
                name='category'
                options={categoryOptions}
              />
              <br />
              <button
                style={{ float: 'right', display: 'inline' }}
                type='submit'
                disabled={!formik.isValid}
              >
                Add Task
              </button>
              <br />
              <br />
              <button
                style={{
                  float: 'left',
                  display: 'inline',
                  marginTop: '-48px',
                  backgroundColor: '#ef4747',
                }}
                onClick={navigateToTaskList}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>

        <hr />

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
            {taskList.map((task) => (
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
                  <Button variant='warning'>Edit</Button>
                </td>
                <td>
                  <Button variant='danger'>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TaskListsAdd;
