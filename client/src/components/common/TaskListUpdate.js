import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Axios from 'axios';
import * as Yup from 'yup';
import FormikControl from './FormikControl';

function TaskListUpdate() {
  const params = useParams();

  const navigate = useNavigate();

  const navigateToTaskList = () => {
    navigate(`/dashboard/${params.id}/tasklist`);
  };

  const navigateToTaskListAdd = () => {
    navigate(`/dashboard/${params.id}/tasklist/add`);
  };

  const statusOptions = [
    { key: `${params.status}`, value: `${params.status}` },
    { key: 'To Do', value: 'To Do' },
    { key: 'In Progress', value: 'In Progress' },
    { key: 'Completed', value: 'Completed' },
  ];

  const initialValues = {
    status: `${params.status}`,
  };
  const validationSchema = Yup.object({
    status: Yup.string().required('This field is required'),
  });

  const onSubmit = (values) => {
    Axios.put(
      `http://localhost:3001/tasklist/update/${params.id}/${params.task}/`,
      {
        status: values.status,
      }
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
      <p>
        Task: <b style={{ fontSize: '1em' }}>{params.task}</b>
      </p>
      <p>
        Description: <b style={{ fontSize: '1em' }}>{params.description}</b>
      </p>
      <p>
        Category: <b style={{ fontSize: '1em' }}>{params.category}</b>
      </p>
      <br />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form
            style={{
              margin: '0',
              marginTop: '-30px',
              marginLeft: '-25px',
              border: '0',
            }}
          >
            <FormikControl
              control='select'
              label='Update Status:'
              name='status'
              options={statusOptions}
            />
            <br />
            <button
              style={{ float: 'right', display: 'inline' }}
              type='submit'
              disabled={!formik.isValid}
            >
              Update
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
    </div>
  );
}

export default TaskListUpdate;
